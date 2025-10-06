import { VoiceAnalysis, ImageAnalysis } from './types';

export class MultiModalAnalyzer {
  
  /**
   * Analyzes voice data for emotional content
   */
  async analyzeVoice(audioBase64: string): Promise<VoiceAnalysis> {
    try {
      // Convert base64 to audio analysis
      // This is a simplified implementation - in production you'd use more sophisticated audio analysis
      const audioBuffer = this.base64ToArrayBuffer(audioBase64);
      
      // Simulate voice analysis (in production, use Web Audio API or external service)
      const analysis = await this.performVoiceAnalysis(audioBuffer);
      
      return analysis;
    } catch (error) {
      console.error('Voice analysis error:', error);
      return this.getDefaultVoiceAnalysis();
    }
  }

  /**
   * Analyzes image data for facial emotions using face-api.js
   */
  async analyzeImage(_imageBase64: string): Promise<ImageAnalysis> {
    try {
      // This will be implemented with face-api.js on the client side
      // For now, return a mock analysis
      return this.getMockImageAnalysis();
    } catch (error) {
      console.error('Image analysis error:', error);
      return this.getDefaultImageAnalysis();
    }
  }

  /**
   * Combines text, voice, and image analysis into a unified mood assessment
   */
  combineAnalyses(
    textMood: string,
    voiceAnalysis?: VoiceAnalysis,
    imageAnalysis?: ImageAnalysis
  ): {
    combinedMood: string;
    confidence: number;
    sources: string[];
    details: {
      text?: string;
      voice?: VoiceAnalysis;
      image?: ImageAnalysis;
    };
  } {
    const sources: string[] = ['text'];
    let combinedMood = textMood;
    let totalConfidence = 0.7; // Base confidence for text analysis

    const details: Record<string, unknown> = { text: textMood };

    // Factor in voice analysis
    if (voiceAnalysis) {
      sources.push('voice');
      details.voice = voiceAnalysis;
      
      // Weight voice analysis based on confidence
      totalConfidence = (totalConfidence * 0.7) + (voiceAnalysis.confidence * 0.3);
      
      // If voice emotion strongly contradicts text, adjust combined mood
      if (this.emotionsConflict(textMood, voiceAnalysis.emotion) && voiceAnalysis.confidence > 0.8) {
        combinedMood = this.blendEmotions(textMood, voiceAnalysis.emotion, 0.6, 0.4);
      }
    }

    // Factor in image analysis
    if (imageAnalysis) {
      sources.push('image');
      details.image = imageAnalysis;
      
      totalConfidence = (totalConfidence * 0.8) + (imageAnalysis.confidence * 0.2);
      
      // If facial expression strongly contradicts other analyses, adjust
      if (imageAnalysis.confidence > 0.8) {
        const faceEmotion = imageAnalysis.dominantEmotion;
        if (this.emotionsConflict(combinedMood, faceEmotion)) {
          combinedMood = this.blendEmotions(combinedMood, faceEmotion, 0.7, 0.3);
        }
      }
    }

    return {
      combinedMood,
      confidence: Math.min(totalConfidence, 1.0),
      sources,
      details
    };
  }

  /**
   * Enhanced text analysis that considers multi-modal context
   */
  enhanceTextAnalysis(
    originalText: string,
    voiceAnalysis?: VoiceAnalysis,
    imageAnalysis?: ImageAnalysis
  ): string {
    let enhancedText = originalText;

    // Add voice context
    if (voiceAnalysis) {
      const voiceContext = this.getVoiceContext(voiceAnalysis);
      enhancedText += ` Voice analysis indicates: ${voiceContext}`;
    }

    // Add image context
    if (imageAnalysis) {
      const imageContext = this.getImageContext(imageAnalysis);
      enhancedText += ` Facial expression shows: ${imageContext}`;
    }

    return enhancedText;
  }

  // Private helper methods

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64.split(',')[1] || base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private async performVoiceAnalysis(_audioBuffer: ArrayBuffer): Promise<VoiceAnalysis> {
    // Simplified voice analysis - in production, use Web Audio API
    // This would analyze pitch, tone, speaking rate, etc.

    // Mock analysis based on audio characteristics
    const mockEmotions = ['happy', 'sad', 'angry', 'anxious', 'calm', 'excited'];
    const randomEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)];

    return {
      emotion: randomEmotion,
      confidence: 0.75 + Math.random() * 0.2,
      tone: Math.random() > 0.5 ? 'positive' : 'negative',
      energy: Math.random(),
      speechRate: 0.5 + Math.random() * 0.5
    };
  }

  private getMockImageAnalysis(): ImageAnalysis {
    const emotions = {
      happy: Math.random() * 0.3,
      sad: Math.random() * 0.3,
      angry: Math.random() * 0.2,
      surprised: Math.random() * 0.2,
      fearful: Math.random() * 0.1,
      disgusted: Math.random() * 0.1,
      neutral: Math.random() * 0.4
    };

    // Find dominant emotion
    const dominantEmotion = Object.entries(emotions).reduce((a, b) => 
      emotions[a[0] as keyof typeof emotions] > emotions[b[0] as keyof typeof emotions] ? a : b
    )[0];

    return {
      dominantEmotion,
      emotions,
      confidence: 0.7 + Math.random() * 0.25
    };
  }

  private getDefaultVoiceAnalysis(): VoiceAnalysis {
    return {
      emotion: 'neutral',
      confidence: 0.5,
      tone: 'neutral',
      energy: 0.5,
      speechRate: 0.5
    };
  }

  private getDefaultImageAnalysis(): ImageAnalysis {
    return {
      dominantEmotion: 'neutral',
      emotions: {
        happy: 0.1,
        sad: 0.1,
        angry: 0.1,
        surprised: 0.1,
        fearful: 0.1,
        disgusted: 0.1,
        neutral: 0.4
      },
      confidence: 0.5
    };
  }

  private emotionsConflict(emotion1: string, emotion2: string): boolean {
    const conflictMap: Record<string, string[]> = {
      'happy': ['sad', 'angry', 'anxious'],
      'sad': ['happy', 'excited'],
      'angry': ['happy', 'calm'],
      'anxious': ['happy', 'calm'],
      'calm': ['angry', 'anxious', 'excited'],
      'excited': ['sad', 'calm']
    };

    return conflictMap[emotion1.toLowerCase()]?.includes(emotion2.toLowerCase()) || false;
  }

  private blendEmotions(emotion1: string, emotion2: string, weight1: number, weight2: number): string {
    // Simple emotion blending - in production, use more sophisticated mapping
    const blendMap: Record<string, Record<string, string>> = {
      'happy': {
        'sad': 'bittersweet',
        'angry': 'frustrated',
        'anxious': 'nervous excitement'
      },
      'sad': {
        'happy': 'melancholic',
        'angry': 'bitter',
        'anxious': 'distressed'
      },
      'angry': {
        'happy': 'irritated',
        'sad': 'resentful',
        'anxious': 'agitated'
      }
    };

    return blendMap[emotion1.toLowerCase()]?.[emotion2.toLowerCase()] || 
           (weight1 > weight2 ? emotion1 : emotion2);
  }

  private getVoiceContext(analysis: VoiceAnalysis): string {
    const contexts = [];
    
    if (analysis.energy > 0.7) contexts.push('high energy');
    else if (analysis.energy < 0.3) contexts.push('low energy');
    
    if (analysis.speechRate > 0.7) contexts.push('fast speech');
    else if (analysis.speechRate < 0.3) contexts.push('slow speech');
    
    contexts.push(`${analysis.tone} tone`);
    contexts.push(`${analysis.emotion} emotion`);
    
    return contexts.join(', ');
  }

  private getImageContext(analysis: ImageAnalysis): string {
    const { dominantEmotion, confidence } = analysis;
    const confidenceLevel = confidence > 0.8 ? 'strong' : confidence > 0.6 ? 'moderate' : 'subtle';
    
    return `${confidenceLevel} ${dominantEmotion} expression`;
  }
}
