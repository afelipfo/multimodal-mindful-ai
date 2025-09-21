export interface MusicRecommendation {
  title: string;
  artist: string;
  youtube_link: string;
}

export interface MindfulResponse {
  mood_detected: string;
  empathy_response: string;
  recommendation: string;
  motivational_quote: string;
  music_recommendation: MusicRecommendation;
}

export interface MoodInput {
  text_input: string;
}