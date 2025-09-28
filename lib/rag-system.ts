import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { booksDatabase, Book } from './books';
import { placesDatabase, Place } from './places';

export interface RAGRecommendations {
  book: Book;
  place: Place;
}

export class MoodBasedRAG {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  private getMoodCategory(mood: string): string {
    const lowerMood = mood.toLowerCase();
    
    if (lowerMood.includes('sad') || lowerMood.includes('depress') || lowerMood.includes('blue') || lowerMood.includes('down')) {
      return 'sad';
    } else if (lowerMood.includes('angry') || lowerMood.includes('mad') || lowerMood.includes('furious') || lowerMood.includes('rage')) {
      return 'angry';
    } else if (lowerMood.includes('anxious') || lowerMood.includes('worry') || lowerMood.includes('nervous') || lowerMood.includes('stress') || lowerMood.includes('fear')) {
      return 'anxious';
    } else if (lowerMood.includes('calm') || lowerMood.includes('relax') || lowerMood.includes('peace') || lowerMood.includes('serene')) {
      return 'calm';
    } else if (lowerMood.includes('excited') || lowerMood.includes('energetic') || lowerMood.includes('thrilled') || lowerMood.includes('pumped')) {
      return 'excited';
    } else if (lowerMood.includes('happy') || lowerMood.includes('joy') || lowerMood.includes('cheerful') || lowerMood.includes('delighted')) {
      return 'happy';
    }
    
    return 'happy'; // default
  }

  private selectBestBook(books: Book[], userInput: string): Book {
    // Simple selection based on keywords in user input
    const keywords = userInput.toLowerCase().split(' ');
    
    // Score books based on relevance
    const scoredBooks = books.map(book => {
      let score = 0;
      
      // Check if user mentions specific genres or themes
      if (keywords.some(keyword => book.genre.toLowerCase().includes(keyword))) {
        score += 3;
      }
      
      if (keywords.some(keyword => book.description.toLowerCase().includes(keyword))) {
        score += 2;
      }
      
      if (keywords.some(keyword => book.title.toLowerCase().includes(keyword))) {
        score += 1;
      }
      
      return { book, score };
    });
    
    // Sort by score and return the best match, or random if no clear winner
    scoredBooks.sort((a, b) => b.score - a.score);
    
    if (scoredBooks[0].score > 0) {
      return scoredBooks[0].book;
    }
    
    // If no clear match, return random book from the mood category
    return books[Math.floor(Math.random() * books.length)];
  }

  private selectBestPlace(places: Place[], userInput: string): Place {
    const keywords = userInput.toLowerCase().split(' ');
    
    // Score places based on relevance
    const scoredPlaces = places.map(place => {
      let score = 0;
      
      // Check if user mentions specific activities or place types
      if (place.activities.some(activity => 
        keywords.some(keyword => activity.toLowerCase().includes(keyword))
      )) {
        score += 3;
      }
      
      if (keywords.some(keyword => place.type.toLowerCase().includes(keyword))) {
        score += 2;
      }
      
      if (keywords.some(keyword => place.description.toLowerCase().includes(keyword))) {
        score += 2;
      }
      
      if (keywords.some(keyword => place.name.toLowerCase().includes(keyword))) {
        score += 1;
      }
      
      return { place, score };
    });
    
    // Sort by score and return the best match, or random if no clear winner
    scoredPlaces.sort((a, b) => b.score - a.score);
    
    if (scoredPlaces[0].score > 0) {
      return scoredPlaces[0].place;
    }
    
    // If no clear match, return random place from the mood category
    return places[Math.floor(Math.random() * places.length)];
  }

  async getRecommendations(userInput: string, detectedMood: string): Promise<RAGRecommendations> {
    const moodCategory = this.getMoodCategory(detectedMood);
    
    // Get relevant books and places for the mood
    const relevantBooks = booksDatabase[moodCategory] || booksDatabase['happy'];
    const relevantPlaces = placesDatabase[moodCategory] || placesDatabase['happy'];
    
    // Use AI to enhance selection if needed
    const enhancedPrompt = ChatPromptTemplate.fromTemplate(`
      Based on the user's input: "{userInput}" and detected mood: "{mood}", 
      help me understand what specific themes, activities, or preferences they might have.
      
      Extract key themes, interests, or specific needs that could help in recommending:
      1. A book that would be most helpful or appealing
      2. A place or activity that would be most beneficial
      
      Respond with just the key themes/interests separated by commas.
    `);
    
    try {
      const enhancedAnalysis = await this.model.invoke(
        await enhancedPrompt.format({ userInput, mood: detectedMood })
      );
      
      // Use the enhanced analysis to improve selection
      const enhancedInput = userInput + ' ' + enhancedAnalysis.content;
      
      const selectedBook = this.selectBestBook(relevantBooks, enhancedInput);
      const selectedPlace = this.selectBestPlace(relevantPlaces, enhancedInput);
      
      return {
        book: selectedBook,
        place: selectedPlace
      };
    } catch (error) {
      console.error('Error in enhanced selection, falling back to basic selection:', error);
      
      // Fallback to basic selection
      const selectedBook = this.selectBestBook(relevantBooks, userInput);
      const selectedPlace = this.selectBestPlace(relevantPlaces, userInput);
      
      return {
        book: selectedBook,
        place: selectedPlace
      };
    }
  }
}
