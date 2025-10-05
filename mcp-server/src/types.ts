/**
 * Type definitions for Mindful AI MCP Server
 */

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
}

export interface MoodAnalysisResult {
  mood_detected: string;
  empathy_response: string;
  recommendation: string;
  motivational_quote: string;
  music_recommendation: MusicRecommendation;
  book_recommendation: BookRecommendation;
  place_recommendation: PlaceRecommendation;
}

export type MoodCategory = 'happy' | 'sad' | 'angry' | 'anxious' | 'calm' | 'excited';

export interface MoodHistoryEntry {
  timestamp: string;
  mood: string;
  input: string;
}
