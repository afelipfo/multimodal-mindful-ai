'use client';

import { useState, useRef, useEffect } from 'react';

interface ImageCaptureProps {
  onImageCapture: (imageBase64: string) => void;
  isDisabled?: boolean;
}

export default function ImageCapture({ onImageCapture, isDisabled }: ImageCaptureProps) {
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    checkCameraAvailability();
    
    return () => {
      stopCamera();
    };
  }, []);

  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideoInput = devices.some(device => device.kind === 'videoinput');
      setHasCamera(hasVideoInput);
      setError(null);
    } catch (error) {
      console.error('Error checking camera availability:', error);
      setHasCamera(false);
      setError('Unable to detect camera');
    }
  };

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: 'user' // Front camera for selfies
        }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setUseCamera(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Failed to access camera. Please check permissions.');
      setHasCamera(false);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setUseCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError('Camera not ready. Please try again.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      setError('Failed to capture image. Please try again.');
      return;
    }

    try {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to base64 with high quality
      const imageBase64 = canvas.toDataURL('image/jpeg', 0.95);
      setCapturedImage(imageBase64);
      onImageCapture(imageBase64);
      setError(null);

      // Stop camera after capture
      stopCamera();
    } catch (error) {
      console.error('Error capturing photo:', error);
      setError('Failed to capture image. Please try again.');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBase64 = e.target?.result as string;
      setCapturedImage(imageBase64);
      onImageCapture(imageBase64);
    };
    reader.onerror = () => {
      setError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setError(null);
    stopCamera();
  };

  if (capturedImage) {
    return (
      <div className="flex flex-col items-center space-y-3">
        <div className="relative group">
          <img
            src={capturedImage}
            alt="Captured for analysis"
            className="w-48 h-48 object-cover rounded-lg border-2 border-green-400 shadow-lg"
          />
          <button
            onClick={resetCapture}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition shadow-md flex items-center justify-center font-bold"
            title="Remove image"
            aria-label="Remove captured image"
          >
            ×
          </button>
        </div>
        <div className="flex items-center space-x-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Image ready for analysis</span>
        </div>
      </div>
    );
  }

  if (useCamera) {
    return (
      <div className="flex flex-col items-center space-y-3">
        {error && (
          <div className="text-xs text-red-600 text-center p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        <div className="relative">
          <video
            ref={videoRef}
            className="w-80 h-60 object-cover rounded-lg border-2 border-blue-400 shadow-lg"
            autoPlay
            muted
            playsInline
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={capturePhoto}
            disabled={isDisabled}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 font-medium shadow-md flex items-center space-x-2"
            aria-label="Capture photo"
          >
            <span>📸</span>
            <span>Capture</span>
          </button>
          <button
            onClick={stopCamera}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium shadow-md"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>

        <div className="text-xs text-gray-600 text-center font-medium">
          📷 Position your face in the frame and click capture
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      {error && (
        <div className="text-xs text-red-600 text-center p-2 bg-red-50 rounded border border-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-2 w-full max-w-xs">
        {hasCamera && (
          <button
            onClick={startCamera}
            disabled={isDisabled || isLoading}
            className="flex items-center justify-center px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 font-medium shadow-md space-x-2"
            aria-label="Take photo with camera"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Starting camera...</span>
              </>
            ) : (
              <>
                <span>📷</span>
                <span>Take Photo</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isDisabled}
          className="flex items-center justify-center px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 font-medium shadow-md space-x-2"
          aria-label="Upload image from device"
        >
          <span>📁</span>
          <span>Upload Image</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div className="text-xs text-gray-600 text-center max-w-xs font-medium">
        {hasCamera === false
          ? '⚠️ Camera not available. You can upload an image instead.'
          : '📸 Take a photo or upload an image for facial emotion analysis'
        }
      </div>
    </div>
  );
}
