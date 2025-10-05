# Multimodal Mindful AI

A Next.js application that analyzes user emotions through multiple input modalities (text, voice, and images) and provides comprehensive personalized support including empathy, recommendations, motivational quotes, curated music, books, and places based on your mood.

**Live Demo:** [https://mindful-ai-gamma.vercel.app](https://mindful-ai-gamma.vercel.app)

## Features

- **Multi-Modal Mood Detection**: Analyzes emotional state from text, voice recordings, and facial images
- **AI-Powered Analysis**: Uses OpenAI GPT-4o-mini with LangChain for intelligent mood detection
- **Empathetic Responses**: Provides understanding and supportive messages
- **Personalized Recommendations**: Offers helpful advice based on detected mood
- **Motivational Quotes**: Inspiring quotes to uplift the user
- **RAG System**: Intelligent recommendations for books and places using Retrieval Augmented Generation
- **Music Recommendations**: Curated database of 30+ songs across 6 mood categories with YouTube links
- **Book Recommendations**: 30+ books categorized by mood with Amazon and Goodreads links
- **Place Recommendations**: 30+ locations with activities based on emotional state
- **History Tracking**: Stores recent mood analyses in local storage
- **Sharing**: Share mood analysis results via Web Share API or clipboard
- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4o-mini with LangChain
- **RAG System**: Curated databases of books and places categorized by mood
- **Multi-Modal**: Voice recording via Web Audio API, image capture via MediaDevices API
- **MCP Server**: Model Context Protocol server for AI assistant integration

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/afelipfo/multimodal-mindful-ai.git
cd multimodal-mindful-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for production
```bash
npm run build
npm start
```

## Usage

1. **Enter your feelings** in the text area or use advanced multi-modal options
2. **Voice Recording**: Click to record your voice (up to 60 seconds)
3. **Image Capture**: Take a photo or upload an image for facial emotion analysis
4. **Click "Analyze Mood"** to receive comprehensive support:
   - Empathetic response
   - Personalized recommendation
   - Motivational quote
   - Music recommendation with YouTube link
   - Book recommendation with purchase links
   - Place recommendation with activities
5. **View recent analyses** in the history section
6. **Share your results** with others

## Project Structure

```
multimodal-mindful-ai/
├── app/
│   ├── api/analyze-mood/route.ts    # Mood analysis API with multi-modal support
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Main application UI
│   └── not-found.tsx                # 404 page
├── components/
│   ├── VoiceRecorder.tsx            # Voice recording component
│   └── ImageCapture.tsx             # Image capture component
├── lib/
│   ├── mood-analyzer.ts             # API client
│   ├── multimodal-analyzer.ts       # Multi-modal analysis logic
│   ├── music.ts                     # Music database (30+ songs)
│   ├── books.ts                     # Books database (30+ books)
│   ├── places.ts                    # Places database (30+ locations)
│   ├── rag-system.ts                # RAG system implementation
│   └── types.ts                     # TypeScript types
├── mcp-server/                      # MCP Server implementation
│   ├── src/
│   │   ├── data/                    # Shared data sources
│   │   ├── index.ts                 # Main server implementation
│   │   └── types.ts                 # Type definitions
│   ├── dist/                        # Compiled server (after build)
│   ├── package.json
│   └── README.md                    # MCP server documentation
└── README.md                        # This file
```

## Mood Categories

The app recognizes and provides tailored support for:
- **Happy/Joyful** - Celebratory content and uplifting activities
- **Sad/Depressed** - Healing resources and contemplative spaces
- **Angry/Frustrated** - Tension release activities and anger management
- **Anxious/Worried** - Calming resources and stress relief
- **Calm/Relaxed** - Peaceful content and serene environments
- **Excited/Energetic** - Dynamic activities and motivational content

## Multi-Modal Analysis

### Voice Analysis
- Records audio up to 60 seconds
- Analyzes tone, energy, and speech patterns
- Combines with text for enhanced mood detection

### Image Analysis
- Captures photos via camera or file upload
- Detects facial expressions
- Integrates with text and voice for comprehensive analysis

### Combined Analysis
- Intelligently weights multiple input sources
- Detects conflicts between different modalities
- Provides confidence scores for accuracy

## RAG System

The Retrieval Augmented Generation system intelligently selects books and places:

- **Keyword Analysis**: Matches user input with themes and genres
- **Mood Categorization**: Maps emotional state to appropriate categories
- **AI Enhancement**: Uses GPT-4o-mini for better contextual matching
- **Scoring System**: Ranks recommendations based on relevance
- **Fallback Mechanism**: Ensures recommendations even if keyword matching fails

## API Documentation

### POST /api/analyze-mood

Analyzes user input and returns comprehensive mood analysis.

**Request Body:**
```json
{
  "text_input": "I'm feeling stressed",
  "voice_data": "base64_encoded_audio",
  "image_data": "base64_encoded_image",
  "analysis_mode": "multimodal"
}
```

**Response:**
```json
{
  "mood_detected": "anxious",
  "empathy_response": "I understand that stress can be overwhelming...",
  "recommendation": "Try taking short breaks throughout your day...",
  "motivational_quote": "You are stronger than you think...",
  "music_recommendation": {
    "title": "Weightless",
    "artist": "Marconi Union",
    "youtube_link": "https://www.youtube.com/watch?v=..."
  },
  "book_recommendation": {
    "title": "The Anxiety and Worry Workbook",
    "author": "David A. Clark & Aaron T. Beck",
    "description": "Cognitive-behavioral techniques...",
    "genre": "Self-help",
    "amazonLink": "https://www.amazon.com/dp/...",
    "goodreadsLink": "https://www.goodreads.com/book/..."
  },
  "place_recommendation": {
    "name": "Spa and Wellness Center",
    "location": "Various locations",
    "description": "Spaces designed for relaxation...",
    "type": "Wellness center",
    "activities": ["Massages", "Sauna", "Jacuzzi"],
    "bestTimeToVisit": "Year-round"
  }
}
```

## MCP Server Integration

This project includes a custom **Model Context Protocol (MCP)** server that exposes mood analysis capabilities to AI assistants like Claude.

### Features

**Tools:**
- `get_music_recommendation` - Get music for specific moods
- `get_book_recommendation` - Get book suggestions based on mood
- `get_place_recommendation` - Get place recommendations
- `detect_mood` - Detect mood from text input
- `add_to_history` - Track mood analysis history

**Resources:**
- `mood://categories` - List supported mood categories
- `mood://history` - View recent analyses
- `music://database` - Browse complete music database
- `books://database` - Browse complete books database
- `places://database` - Browse complete places database

### Setup MCP Server

```bash
cd mcp-server
npm install
npm run build
```

### Configure with Claude Desktop

Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mindful-ai": {
      "command": "node",
      "args": ["/absolute/path/to/multimodal-mindful-ai/mcp-server/dist/index.js"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key_here"
      }
    }
  }
}
```

See `mcp-server/README.md` for detailed documentation.

## License

This project is licensed under the MIT License.

## Acknowledgments

- **OpenAI** for GPT-4o-mini API
- **LangChain** for the AI application framework
- **YouTube** for hosting music content
- **Next.js Team** for the React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for deployment and hosting
- **Amazon** and **Goodreads** for book metadata
