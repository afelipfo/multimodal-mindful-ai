import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { MoodInput } from '@/lib/types';
import { musicDatabase } from '@/lib/music';

const responseSchema = z.object({
  mood_detected: z.string(),
  empathy_response: z.string(),
  recommendation: z.string(),
  motivational_quote: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body: MoodInput = await request.json();
    const { text_input } = body;

    const model = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      openAIApiKey: process.env.OPENAI_API_KEY,
    }).withStructuredOutput(responseSchema);

    const prompt = ChatPromptTemplate.fromTemplate(`
Analyze the user's emotional state from the following text input: "{text_input}"

Provide a response with the detected mood, an empathetic message, a helpful recommendation, and a motivational quote.

Examples:
- For happy mood: "Happy" by Pharrell Williams
- For sad mood: "Someone Like You" by Adele
- For anxious mood: "Breathe Me" by Sia
- For angry mood: "Break Stuff" by Limp Bizkit
- For calm mood: "Weightless" by Marconi Union
- For excited mood: "Uptown Funk" by Mark Ronson ft. Bruno Mars
    `);

    const chain = prompt.pipe(model);
    const response = await chain.invoke({ text_input });

    // Select random music recommendation
    const mood = response.mood_detected.toLowerCase();
    let moodKey = 'happy'; // default
    if (mood.includes('sad') || mood.includes('depress') || mood.includes('blue') || mood.includes('down')) {
      moodKey = 'sad';
    } else if (mood.includes('angry') || mood.includes('mad') || mood.includes('furious') || mood.includes('rage')) {
      moodKey = 'angry';
    } else if (mood.includes('anxious') || mood.includes('worry') || mood.includes('nervous') || mood.includes('stress') || mood.includes('fear')) {
      moodKey = 'anxious';
    } else if (mood.includes('calm') || mood.includes('relax') || mood.includes('peace') || mood.includes('serene')) {
      moodKey = 'calm';
    } else if (mood.includes('excited') || mood.includes('energetic') || mood.includes('thrilled') || mood.includes('pumped')) {
      moodKey = 'excited';
    } else if (mood.includes('happy') || mood.includes('joy') || mood.includes('cheerful') || mood.includes('delighted')) {
      moodKey = 'happy';
    }
    const songs = musicDatabase[moodKey];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response as any).music_recommendation = randomSong;

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to analyze mood' }, { status: 500 });
  }
}