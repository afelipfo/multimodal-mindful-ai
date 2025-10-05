'use client';

import { useState, useRef, useEffect } from 'react';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBase64: string) => void;
  isDisabled?: boolean;
}

export default function VoiceRecorder({ onRecordingComplete, isDisabled }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [audioRecorded, setAudioRecorded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Check for microphone permission
    checkMicrophonePermission();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      setError(null);
      stream.getTracks().forEach(track => track.stop()); // Stop the test stream
    } catch (error) {
      setHasPermission(false);
      setError('Microphone access denied. Please grant permission.');
      console.error('Microphone permission denied:', error);
    }
  };

  const startRecording = async () => {
    if (!hasPermission) {
      await checkMicrophonePermission();
      if (!hasPermission) return;
    }

    try {
      setError(null);
      setAudioRecorded(false);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        }
      });

      streamRef.current = stream;

      // Try different MIME types for better browser compatibility
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = ''; // Use default
          }
        }
      }

      const options = mimeType ? { mimeType } : {};
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' });
          convertToBase64(blob);
          setAudioRecorded(true);
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError('Recording failed. Please try again.');
        stopRecording();
      };

      mediaRecorder.start(100); // Collect data every 100ms for smoother recording
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) { // Max 60 seconds
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to access microphone. Please check permissions.');
      setHasPermission(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const convertToBase64 = (blob: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onRecordingComplete(base64String);
    };
    reader.onerror = () => {
      setError('Failed to process audio. Please try again.');
    };
    reader.readAsDataURL(blob);
  };

  const resetRecording = () => {
    setAudioRecorded(false);
    setRecordingTime(0);
    setError(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="text-yellow-800 text-sm mb-2 text-center">
          {error || 'Microphone access is required for voice analysis'}
        </div>
        <button
          onClick={checkMicrophonePermission}
          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition"
        >
          Grant Permission
        </button>
      </div>
    );
  }

  if (audioRecorded) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-green-800 font-medium">Voice recorded ({formatTime(recordingTime)})</span>
        </div>
        <button
          onClick={resetRecording}
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Record again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {error && (
        <div className="text-xs text-red-600 text-center p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-3">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isDisabled || hasPermission === null}
          className={`
            flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200
            ${isRecording
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600'
            }
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            text-white shadow-lg hover:shadow-xl
          `}
          title={isRecording ? 'Stop recording' : 'Start voice recording'}
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          {isRecording ? (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z"/>
              <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v5M8 23h8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          )}
        </button>

        {isRecording && (
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-base font-mono text-gray-700 font-semibold">
              {formatTime(recordingTime)}
            </span>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-600 text-center font-medium">
        {isRecording ? '🎙️ Recording... Click to stop' : '🎤 Click to record voice (max 60s)'}
      </div>

      {recordingTime > 50 && isRecording && (
        <div className="text-xs text-orange-600 font-semibold animate-pulse">
          ⏱️ Auto-stop in {60 - recordingTime}s
        </div>
      )}
    </div>
  );
}
