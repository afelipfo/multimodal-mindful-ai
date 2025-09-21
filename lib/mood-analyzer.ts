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

export async function getEmotionalSupport(text_input: string): Promise<MindfulResponse> {
  const response = await retryFetch('/api/analyze-mood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text_input }),
  });
  const data = await response.json();
  return data as MindfulResponse;
}