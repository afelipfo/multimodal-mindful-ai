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
}

export interface MoodInput {
  text_input: string;
}