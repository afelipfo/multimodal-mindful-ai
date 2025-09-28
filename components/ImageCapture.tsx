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
    } catch (error) {
      console.error('Error checking camera availability:', error);
      setHasCamera(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user' // Front camera for selfies
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setUseCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCamera(false);
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
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const imageBase64 = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageBase64);
    onImageCapture(imageBase64);
    
    // Stop camera after capture
    stopCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBase64 = e.target?.result as string;
      setCapturedImage(imageBase64);
      onImageCapture(imageBase64);
    };
    reader.readAsDataURL(file);
  };

  const resetCapture = () => {
    setCapturedImage(null);
    stopCamera();
  };

  if (capturedImage) {
    return (
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <img 
            src={capturedImage} 
            alt="Captured for analysis" 
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            onClick={resetCapture}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition"
            title="Remove image"
          >
            ×
          </button>
        </div>
        <div className="text-xs text-green-600 text-center">
          Image captured for emotion analysis
        </div>
      </div>
    );
  }

  if (useCamera) {
    return (
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <video
            ref={videoRef}
            className="w-64 h-48 object-cover rounded-lg border-2 border-gray-300"
            autoPlay
            muted
            playsInline
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={capturePhoto}
            disabled={isDisabled}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            📸 Capture
          </button>
          <button
            onClick={stopCamera}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          Position your face in the frame and click capture
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex flex-col space-y-2">
        {hasCamera && (
          <button
            onClick={startCamera}
            disabled={isDisabled}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            📷 Take Photo
          </button>
        )}
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isDisabled}
          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
        >
          📁 Upload Image
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
      
      <div className="text-xs text-gray-500 text-center max-w-48">
        {hasCamera === false 
          ? 'Camera not available. You can upload an image instead.'
          : 'Take a photo or upload an image for facial emotion analysis'
        }
      </div>
    </div>
  );
}
