import { MindfulResponse } from './types';

async function retryFetch(url: string, options: RequestInit, retries = 3, backoff = 1000): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return retryFetch(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
}

export async function getEmotionalSupport(
  text_input: string,
  voice_data?: string | null,
  image_data?: string | null,
  analysis_mode: 'text' | 'voice' | 'image' | 'multimodal' = 'text'
): Promise<MindfulResponse> {
  const requestBody = {
    text_input,
    voice_data: voice_data || undefined,
    image_data: image_data || undefined,
    analysis_mode
  };

  const response = await retryFetch('/api/analyze-mood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }
  
  const data = await response.json();
  return data as MindfulResponse;
}