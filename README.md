# Mindful AI

A Next.js application that analyzes user emotions from text input and provides comprehensive personalized support including empathy, recommendations, motivational quotes, curated music, books, and places to visit based on your mood.

## Features

- **Mood Detection**: Uses OpenAI GPT-4o-mini to analyze emotional state from user input
- **Empathetic Responses**: Provides understanding and supportive messages
- **Personalized Recommendations**: Offers helpful advice based on detected mood
- **Motivational Quotes**: Inspiring quotes to uplift the user
- **RAG System (Retrieval Augmented Generation)**: Intelligent recommendations for books and places
- **Book Recommendations**: Curated database of books categorized by mood with Amazon and Goodreads links
- **Place Recommendations**: Suggestions for places to visit based on emotional state
- **Music Recommendations**: Curated songs from a database of 30+ tracks across 6 mood categories
- **YouTube Integration**: Direct links to music videos
- **History Tracking**: Stores recent mood analyses in local storage
- **Sharing**: Share mood analysis results via Web Share API or clipboard
- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Mood Categories

The app recognizes and provides tailored support for:
- **Happy/Joyful** - Celebratory content and uplifting activities
- **Sad/Depressed** - Healing resources and contemplative spaces
- **Angry/Frustrated** - Tension release activities and anger management
- **Anxious/Worried** - Calming resources and stress relief
- **Calm/Relaxed** - Peaceful content and serene environments
- **Excited/Energetic** - Dynamic activities and motivational content

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4o-mini with LangChain
- **RAG System**: Curated databases of books and places categorized by mood
- **Deployment**: Production-ready with optimized builds

## Live Demo

**View the live application:** [https://mindful-ai-gamma.vercel.app](https://mindful-ai-gamma.vercel.app)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/afelipfo/Mindful_AI.git
   cd Mindful_AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
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

1. **Enter your feelings** in the text area
2. **Click "Analyze my mood"** or press Enter
3. **Receive comprehensive support**:
   - Empathetic response
   - Personalized recommendation
   - Motivational quote
   - Music recommendation with YouTube link
   - Book recommendation with purchase links
   - Place recommendation with activities
4. **View recent analyses** in the history section
5. **Share your results** with others

## Project Structure

```
mindful-ai/
├── app/
│   ├── api/analyze-mood/route.ts    # Mood analysis API with RAG
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Main application UI
│   └── not-found.tsx                # 404 page
├── lib/
│   ├── mood-analyzer.ts             # API client
│   ├── music.ts                     # Music database (30+ songs)
│   ├── books.ts                     # Books database (30+ books)
│   ├── places.ts                    # Places database (30+ locations)
│   ├── rag-system.ts                # RAG system implementation
│   └── types.ts                     # TypeScript types
├── .env.local                       # Environment variables
└── README.md                        # This file
```

## RAG System Architecture

The Retrieval Augmented Generation (RAG) system intelligently selects books and places based on multiple factors:

### Book Selection Algorithm
- **Keyword Analysis**: Matches user input with book themes and genres
- **Mood Categorization**: Maps emotional state to appropriate book categories
- **AI Enhancement**: Uses additional AI analysis for better contextual matching
- **Scoring System**: Ranks books based on relevance to user input
- **Fallback Mechanism**: Ensures recommendations even if keyword matching fails

### Place Selection Algorithm
- **Activity Matching**: Suggests places based on mentioned activities or preferences
- **Mood-Based Filtering**: Recommends locations appropriate for current emotional state
- **Contextual Analysis**: Considers user's specific needs and situation
- **Geographic Relevance**: Includes diverse locations suitable for different moods
- **Activity Categorization**: Matches place types with therapeutic activities

### RAG Implementation Details
- **Enhanced Input Processing**: Uses OpenAI to extract additional context and themes
- **Multi-factor Scoring**: Combines keyword matching, mood alignment, and AI insights
- **Intelligent Fallbacks**: Graceful degradation when enhanced analysis fails
- **Real-time Processing**: Efficient selection algorithms for responsive user experience

## API Documentation

### POST /api/analyze-mood

Analyzes user input and returns comprehensive mood analysis with RAG recommendations.

**Request Body:**
```json
{
  "text_input": "I'm feeling really stressed about work and need to relax"
}
```

**Response:**
```json
{
  "mood_detected": "anxious",
  "empathy_response": "I understand that work stress can be overwhelming. It's completely normal to feel this way, and acknowledging these feelings is the first step toward managing them.",
  "recommendation": "Try taking short breaks throughout your day, practice deep breathing exercises, and consider setting boundaries between work and personal time.",
  "motivational_quote": "You are stronger than you think and more capable than you imagine.",
  "music_recommendation": {
    "title": "Weightless",
    "artist": "Marconi Union",
    "youtube_link": "https://www.youtube.com/watch?v=UfcAVejs1Ac"
  },
  "book_recommendation": {
    "title": "The Anxiety and Worry Workbook",
    "author": "David A. Clark & Aaron T. Beck",
    "description": "Cognitive-behavioral techniques for managing anxiety",
    "genre": "Self-help",
    "amazonLink": "https://www.amazon.com/dp/1462533841",
    "goodreadsLink": "https://www.goodreads.com/book/show/25330878-the-anxiety-and-worry-workbook"
  },
  "place_recommendation": {
    "name": "Spa and Wellness Center",
    "location": "Various locations",
    "description": "Spaces designed for relaxation and self-care",
    "type": "Wellness center",
    "activities": ["Massages", "Sauna", "Jacuzzi", "Relaxation treatments"],
    "bestTimeToVisit": "Year-round"
  }
}
```

## Database Content Overview

### Books Database
The application includes a curated collection of 30+ books across multiple categories:

**Self-Help & Psychology**
- Anxiety and stress management guides
- Happiness and positive psychology books
- Emotional intelligence and mental health resources

**Philosophy & Spirituality**
- Mindfulness and meditation guides
- Life wisdom and philosophical insights
- Spiritual growth and inner peace resources

**Memoir & Biography**
- Inspiring personal transformation stories
- Overcoming adversity narratives
- Creative and entrepreneurial journeys

**Fiction**
- Uplifting and thought-provoking novels
- Philosophical fiction exploring life's meaning
- Stories of hope and human resilience

### Places Database
The application suggests 30+ carefully selected locations categorized by therapeutic value:

**Wellness & Relaxation**
- Spas and wellness centers
- Yoga studios and meditation centers
- Natural hot springs and retreat centers

**Cultural & Educational**
- Museums and art galleries
- Libraries and bookstores
- Historic sites and architectural marvels

**Natural Environments**
- National parks and nature reserves
- Botanical gardens and arboretums
- Beaches and lakeshores
- Mountain trails and forest paths

**Active & Adventure**
- Fitness centers and outdoor gyms
- Adventure parks and climbing facilities
- Sports complexes and recreational areas

**Entertainment & Social**
- Music festivals and cultural events
- Markets and food halls
- Theme parks and entertainment venues

### Music Database
A collection of 30+ songs carefully selected for their therapeutic and mood-enhancing properties:

**Mood Categories**
- **Happy**: Upbeat, celebratory tracks that boost energy and positivity
- **Sad**: Comforting, healing melodies that provide emotional support
- **Angry**: Cathartic, energetic releases that help process frustration
- **Anxious**: Calming, soothing compositions that reduce stress
- **Calm**: Peaceful, meditative sounds that promote relaxation
- **Excited**: Energizing, motivational beats that channel enthusiasm

## Technical Implementation

### Frontend Architecture
- **Next.js 15**: Latest version with App Router and Server Components
- **React 19**: Modern React features and concurrent rendering
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design

### AI Integration
- **OpenAI GPT-4o-mini**: Primary language model for mood analysis
- **LangChain**: Framework for building AI applications with structured outputs
- **Structured Output**: Ensures consistent API responses with Zod validation

### Data Management
- **Local Storage**: Client-side persistence for user history
- **Static Databases**: Curated content stored as TypeScript modules
- **Type Safety**: Full TypeScript coverage for all data structures

### Performance Optimizations
- **Static Generation**: Pre-rendered pages for optimal loading speed
- **Code Splitting**: Automatic code splitting for smaller bundle sizes
- **Image Optimization**: Next.js Image component for optimized media delivery
- **Caching**: Efficient caching strategies for API responses

## Development Guidelines

### Code Quality
- **ESLint**: Comprehensive linting rules for code consistency
- **TypeScript**: Strict type checking enabled
- **Prettier**: Automated code formatting
- **Git Hooks**: Pre-commit validation for code quality

### Testing Strategy
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint validation
- **E2E Tests**: User journey testing with Playwright
- **Performance Tests**: Load testing for API endpoints

### Deployment
- **Vercel**: Optimized deployment platform for Next.js
- **Environment Variables**: Secure API key management
- **CI/CD**: Automated testing and deployment pipeline
- **Monitoring**: Error tracking and performance monitoring

## Contributing

We welcome contributions to improve Mindful AI. Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Follow code standards** using ESLint and Prettier configurations
3. **Write comprehensive tests** for new features
4. **Update documentation** including README and code comments
5. **Test thoroughly** across different devices and browsers
6. **Submit a pull request** with detailed description of changes

### Development Setup
```bash
# Clone your fork
git clone https://github.com/yourusername/Mindful_AI.git
cd Mindful_AI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenAI API key

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **OpenAI** for providing the GPT-4o-mini API that powers our mood analysis
- **LangChain** for the excellent framework that simplifies AI application development
- **YouTube** for hosting the music content that enhances our recommendations
- **Next.js Team** for creating an outstanding React framework
- **Tailwind CSS** for the utility-first CSS framework that powers our design
- **Vercel** for providing seamless deployment and hosting solutions
- **Amazon** and **Goodreads** for book metadata and purchase links
- **The Open Source Community** for the countless libraries and tools that make this project possible

## Future Roadmap

### Short-term Enhancements
- User authentication and personalized profiles
- Enhanced RAG with vector embeddings for better content matching
- Integration with Spotify API for music streaming
- Mobile-responsive improvements and PWA features

### Medium-term Goals
- Multi-language support for global accessibility
- Advanced analytics and mood tracking over time
- Integration with calendar apps for mood-based scheduling
- Community features for sharing experiences and recommendations

### Long-term Vision
- AI-powered mood prediction based on patterns
- Integration with wearable devices for biometric data
- Therapist dashboard for professional use
- Research partnerships for mental health studies

---

**Mindful AI - Supporting mental wellness through intelligent, personalized recommendations**