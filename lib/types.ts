export interface MusicRecommendation {
  title: string;
  artist: string;
  youtube_link: string;
}

export interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  genre: string;
  amazonLink?: string;
  goodreadsLink?: string;
}

export interface PlaceRecommendation {
  name: string;
  location: string;
  description: string;
  type: string;
  activities: string[];
  bestTimeToVisit?: string;
  websiteLink?: string;
  imageUrl?: string;
}

export interface MindfulResponse {
  mood_detected: string;
  empathy_response: string;
  recommendation: string;
  motivational_quote: string;
  music_recommendation: MusicRecommendation;
  book_recommendation: BookRecommendation;
  place_recommendation: PlaceRecommendation;
  confidence?: number;
  sources?: string[];
  analysis_details?: {
    text?: { mood: string; confidence: number };
    voice?: VoiceAnalysis;
    image?: ImageAnalysis;
  };
  emotional_pattern?: EmotionalPattern;
}

export interface VoiceAnalysis {
  emotion: string;
  confidence: number;
  tone: string;
  energy: number;
  speechRate: number;
}

export interface ImageAnalysis {
  dominantEmotion: string;
  emotions: {
    happy: number;
    sad: number;
    angry: number;
    surprised: number;
    fearful: number;
    disgusted: number;
    neutral: number;
  };
  confidence: number;
}

export interface MoodInput {
  text_input: string;
  voice_data?: string; // Base64 encoded audio
  image_data?: string; // Base64 encoded image
  analysis_mode?: 'text' | 'voice' | 'image' | 'multimodal';
}

export interface EmotionalPattern {
  trend: 'improving' | 'declining' | 'stable' | 'fluctuating';
  mostCommonMood: string;
  moodFrequency: Record<string, number>;
  averageConfidence: number;
  recentMoods: Array<{
    mood: string;
    timestamp: number;
    confidence: number;
  }>;
}

export interface HistoryEntry extends MindfulResponse {
  timestamp: number;
  id: string;
}