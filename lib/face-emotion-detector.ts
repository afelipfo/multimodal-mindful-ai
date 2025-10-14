// This module should only be imported on the client side
import { ImageAnalysis } from './types';

export class FaceEmotionDetector {
  private isInitialized = false;
  private modelsLoaded = false;
  private faceapi: typeof import('@vladmandic/face-api') | null = null;

  /**
   * Initialize the face detection model
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Check if we're on the client side
    if (typeof window === 'undefined') {
      throw new Error('FaceEmotionDetector can only be used on the client side');
    }

    try {
      // Dynamically import face-api only on client side
      this.faceapi = await import('@vladmandic/face-api');

      // Load models from CDN
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';

      await Promise.all([
        this.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        this.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      this.modelsLoaded = true;
      this.isInitialized = true;
      console.log('Face emotion detector initialized successfully');
    } catch (error) {
      console.error('Failed to initialize face detector:', error);
      throw error;
    }
  }

  /**
   * Analyze emotions from an image
   */
  async analyzeImage(imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<ImageAnalysis> {
    if (!this.modelsLoaded || !this.faceapi) {
      await this.initialize();
    }

    if (!this.faceapi) {
      throw new Error('Face API not loaded');
    }

    try {
      // Detect face with expressions
      const detection = await this.faceapi
        .detectSingleFace(imageElement, new this.faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detection) {
        console.log('No face detected in image');
        return this.getDefaultImageAnalysis();
      }

      // Extract emotion scores
      const expressions = detection.expressions;

      const emotions = {
        happy: expressions.happy,
        sad: expressions.sad,
        angry: expressions.angry,
        surprised: expressions.surprised,
        fearful: expressions.fearful,
        disgusted: expressions.disgusted,
        neutral: expressions.neutral,
      };

      // Get dominant emotion
      const dominantEmotion = this.getDominantEmotion(emotions);

      // Calculate confidence based on the dominant emotion score
      const confidence = this.calculateConfidence(emotions, dominantEmotion);

      return {
        dominantEmotion,
        emotions,
        confidence,
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      return this.getDefaultImageAnalysis();
    }
  }

  /**
   * Get the dominant emotion from the emotion scores
   */
  private getDominantEmotion(emotions: Record<string, number>): string {
    let maxEmotion = 'neutral';
    let maxScore = 0;

    for (const [emotion, score] of Object.entries(emotions)) {
      if (score > maxScore) {
        maxScore = score;
        maxEmotion = emotion;
      }
    }

    return maxEmotion;
  }

  /**
   * Calculate confidence score
   */
  private calculateConfidence(emotions: Record<string, number>, dominantEmotion: string): number {
    const dominantScore = emotions[dominantEmotion];

    // Base confidence on how much the dominant emotion stands out
    const otherEmotionsTotal = Object.entries(emotions)
      .filter(([emotion]) => emotion !== dominantEmotion)
      .reduce((sum, [, score]) => sum + score, 0);

    // If dominant emotion is much higher than others, confidence is high
    const separation = dominantScore - (otherEmotionsTotal / 6);

    // Normalize confidence to 0.5-0.95 range
    const normalizedConfidence = 0.5 + (separation * 0.45);

    return Math.max(0.5, Math.min(0.95, normalizedConfidence));
  }

  /**
   * Get default image analysis when no face is detected
   */
  private getDefaultImageAnalysis(): ImageAnalysis {
    return {
      dominantEmotion: 'neutral',
      emotions: {
        happy: 0.14,
        sad: 0.14,
        angry: 0.14,
        surprised: 0.14,
        fearful: 0.14,
        disgusted: 0.14,
        neutral: 0.16,
      },
      confidence: 0.3,
    };
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.isInitialized = false;
    this.modelsLoaded = false;
    this.faceapi = null;
  }
}

// Singleton instance
let detectorInstance: FaceEmotionDetector | null = null;

export function getFaceEmotionDetector(): FaceEmotionDetector {
  if (!detectorInstance) {
    detectorInstance = new FaceEmotionDetector();
  }
  return detectorInstance;
}
