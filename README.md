# Mindful AI

A Next.js application that analyzes user emotions from text input and provides personalized support including empathy, recommendations, motivational quotes, and curated music suggestions.

## Features

- **Mood Detection**: Uses OpenAI GPT-4o-mini to analyze emotional state from user input
- **Empathetic Responses**: Provides understanding and supportive messages
- **Personalized Recommendations**: Offers helpful advice based on detected mood
- **Motivational Quotes**: Inspiring quotes to uplift the user
- **Music Recommendations**: Curated songs from a database of 30 tracks across 6 mood categories
- **YouTube Integration**: Direct links to music videos via YouTube search
- **History Tracking**: Stores recent mood analyses in local storage
- **Sharing**: Share mood analysis results via Web Share API or clipboard
- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Mood Categories

The app recognizes and provides tailored support for:
- Happy/Joyful
- Sad/Depressed
- Angry/Mad
- Anxious/Worried
- Calm/Relaxed
- Excited/Energetic

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Production-ready with optimized builds

## Live Demo

🚀 **View the live application:** [https://mindful-ai-gamma.vercel.app](https://mindful-ai-gamma.vercel.app)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/afelipfo/Mindful_AI.git
   cd mindful-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Usage

1. Enter your current feelings in the text area
2. Click "Analyze my mood" or press Enter
3. Receive personalized emotional support and music recommendations
4. View recent analyses in the history section
5. Share your results with others

## Project Structure

```
mindful-ai/
├── app/
│   ├── api/analyze-mood/route.ts    # Mood analysis API
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Main application
│   └── not-found.tsx                # 404 page
├── lib/
│   ├── mood-analyzer.ts             # API client
│   ├── music.ts                     # Music database
│   └── types.ts                     # TypeScript types
├── .env.local                       # Environment variables
└── README.md                        # This file
```

## API

### POST /api/analyze-mood

Analyzes user input and returns mood analysis.

**Request Body:**
```json
{
  "text_input": "I'm feeling really stressed about work"
}
```

**Response:**
```json
{
  "mood_detected": "anxious",
  "empathy_response": "I understand that work stress can be overwhelming...",
  "recommendation": "Try taking short breaks and practicing deep breathing...",
  "motivational_quote": "You are stronger than you think...",
  "music_recommendation": {
    "title": "Breathe Me",
    "artist": "Sia",
    "youtube_link": "https://www.youtube.com/results?search_query=Breathe+Me+by+Sia"
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- OpenAI for GPT-4o-mini API
- YouTube for music video platform
- Next.js and Tailwind CSS for the framework
