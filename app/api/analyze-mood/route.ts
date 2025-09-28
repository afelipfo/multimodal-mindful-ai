import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { MoodInput } from '@/lib/types';
import { musicDatabase } from '@/lib/music';
import { MoodBasedRAG } from '@/lib/rag-system';
import { MultiModalAnalyzer } from '@/lib/multimodal-analyzer';

const responseSchema = z.object({
  mood_detected: z.string(),
  empathy_response: z.string(),
  recommendation: z.string(),
  motivational_quote: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body: MoodInput = await request.json();
    const { text_input, voice_data, image_data, analysis_mode = 'text' } = body;

    // Validate input
    if (!text_input || text_input.trim().length === 0) {
      return NextResponse.json({ error: 'Text input is required' }, { status: 400 });
    }

    // Check OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 });
    }

    // Initialize multi-modal analyzer
    const multiModalAnalyzer = new MultiModalAnalyzer();
    let enhancedTextInput = text_input;

    // Perform multi-modal analysis if data is available
    let voiceAnalysis, imageAnalysis;
    
    if (voice_data && (analysis_mode === 'voice' || analysis_mode === 'multimodal')) {
      try {
        voiceAnalysis = await multiModalAnalyzer.analyzeVoice(voice_data);
      } catch (error) {
        console.error('Voice analysis failed:', error);
      }
    }

    if (image_data && (analysis_mode === 'image' || analysis_mode === 'multimodal')) {
      try {
        imageAnalysis = await multiModalAnalyzer.analyzeImage(image_data);
      } catch (error) {
        console.error('Image analysis failed:', error);
      }
    }

    // Enhance text input with multi-modal context
    if (voiceAnalysis || imageAnalysis) {
      enhancedTextInput = multiModalAnalyzer.enhanceTextAnalysis(
        text_input, 
        voiceAnalysis, 
        imageAnalysis
      );
    }

    const model = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      openAIApiKey: process.env.OPENAI_API_KEY,
    }).withStructuredOutput(responseSchema);

    // Build the prompt dynamically
    let promptText = `Analyze the user's emotional state from the following input: "{text_input}"

Analysis mode: {analysis_mode}`;

    if (voiceAnalysis) {
      promptText += `\nVoice analysis detected: ${voiceAnalysis.emotion} (confidence: ${voiceAnalysis.confidence})`;
    }

    if (imageAnalysis) {
      promptText += `\nFacial expression shows: ${imageAnalysis.dominantEmotion} (confidence: ${imageAnalysis.confidence})`;
    }

    promptText += `

Provide a response with the detected mood, an empathetic message, a helpful recommendation, and a motivational quote.
Consider all available input modalities for a comprehensive analysis.

Examples:
- For happy mood: "Happy" by Pharrell Williams
- For sad mood: "Someone Like You" by Adele
- For anxious mood: "Breathe Me" by Sia
- For angry mood: "Break Stuff" by Limp Bizkit
- For calm mood: "Weightless" by Marconi Union
- For excited mood: "Uptown Funk" by Mark Ronson ft. Bruno Mars`;

    const prompt = ChatPromptTemplate.fromTemplate(promptText);

    const chain = prompt.pipe(model);
    const response = await chain.invoke({ 
      text_input: enhancedTextInput,
      analysis_mode 
    });

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

    // Use multi-modal analysis to enhance mood detection for RAG
    let finalMood = response.mood_detected;
    if (voiceAnalysis || imageAnalysis) {
      const combinedAnalysis = multiModalAnalyzer.combineAnalyses(
        response.mood_detected,
        voiceAnalysis,
        imageAnalysis
      );
      finalMood = combinedAnalysis.combinedMood;
    }

    // Initialize RAG system and get book and place recommendations
    const ragSystem = new MoodBasedRAG();
    const ragRecommendations = await ragSystem.getRecommendations(enhancedTextInput, finalMood);
    
    // Add RAG recommendations to response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response as any).book_recommendation = ragRecommendations.book;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response as any).place_recommendation = ragRecommendations.place;

    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error:', error);
    
    // More specific error handling
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      if (error.message.includes('API key')) {
        return NextResponse.json({ error: 'OpenAI API key is missing or invalid' }, { status: 500 });
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
      }
      return NextResponse.json({ error: `Analysis failed: ${error.message}` }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'Failed to analyze mood' }, { status: 500 });
  }
}