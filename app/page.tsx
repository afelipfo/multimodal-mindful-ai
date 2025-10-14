'use client';

import { useState, useEffect } from 'react';
import { getEmotionalSupport } from '@/lib/mood-analyzer';
import { MindfulResponse, HistoryEntry } from '@/lib/types';
import VoiceRecorder from '@/components/VoiceRecorder';
import ImageCapture from '@/components/ImageCapture';
import ConfidenceDisplay from '@/components/ConfidenceDisplay';
import EmotionalPatternTracker from '@/components/EmotionalPatternTracker';

function getMoodBorder(mood: string) {
  const lower = mood.toLowerCase();
  if (lower.includes('happy') || lower.includes('joy')) return 'border-green-500';
  if (lower.includes('sad') || lower.includes('depress')) return 'border-blue-500';
  if (lower.includes('angry') || lower.includes('mad')) return 'border-red-500';
  if (lower.includes('anxious') || lower.includes('worry')) return 'border-yellow-500';
  return 'border-gray-500';
}

function getMoodBg(mood: string) {
  const lower = mood.toLowerCase();
  if (lower.includes('happy') || lower.includes('joy')) return 'bg-green-100';
  if (lower.includes('sad') || lower.includes('depress')) return 'bg-blue-100';
  if (lower.includes('angry') || lower.includes('mad')) return 'bg-red-100';
  if (lower.includes('anxious') || lower.includes('worry')) return 'bg-yellow-100';
  return 'bg-gray-100';
}

function getYouTubeVideoId(url: string) {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
}

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<MindfulResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [voiceData, setVoiceData] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'text' | 'voice' | 'image' | 'multimodal'>('text');
  const [showMultiModal, setShowMultiModal] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(history));
  }, [history]);

  const handleAnalyze = async () => {
    // Allow analysis with voice or image even without text
    if (!textInput.trim() && !voiceData && !imageData) {
      setError('Please enter some text, record voice, or capture an image to analyze your mood.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 300);

    try {
      // Determine analysis mode based on available data
      let currentMode = analysisMode;
      if (voiceData && imageData) currentMode = 'multimodal';
      else if (voiceData) currentMode = 'voice';
      else if (imageData) currentMode = 'image';
      else currentMode = 'text';

      console.log('Calling API with:', { 
        textInput: textInput || '[No text provided]', 
        currentMode, 
        hasVoice: !!voiceData, 
        hasImage: !!imageData 
      });
      
      const response = await getEmotionalSupport(textInput || '', voiceData, imageData, currentMode);
      
      console.log('API response received:', response);

      setResult(response);

      // Add to history with timestamp and id
      const historyEntry: HistoryEntry = {
        ...response,
        timestamp: Date.now(),
        id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      };
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10
      setProgress(100);
    } catch (error) {
      console.error('Frontend error:', error);
      setError('Failed to analyze mood. Please check your connection and try again.');
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const handleReset = () => {
    setTextInput('');
    setResult(null);
    setError(null);
    setProgress(0);
    setVoiceData(null);
    setImageData(null);
    setAnalysisMode('text');
  };

  const handleVoiceRecording = (audioBase64: string) => {
    setVoiceData(audioBase64);
    setAnalysisMode(imageData ? 'multimodal' : 'voice');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageCapture = (imageBase64: string, analysis?: any) => {
    console.log('Image captured with analysis:', analysis);
    setImageData(imageBase64);
    setAnalysisMode(voiceData ? 'multimodal' : 'image');
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `My mood analysis: ${result.mood_detected}\nEmpathy: ${result.empathy_response}\nQuote: "${result.motivational_quote}"`;
    if (navigator.share) {
      await navigator.share({ title: 'Mindful AI Analysis', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard!');
    }
  };

  const isPositiveMood = result && (result.mood_detected.toLowerCase().includes('happy') || result.mood_detected.toLowerCase().includes('joy'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800">Mindful AI</h1>
            <p className="text-lg text-gray-600">Discover your emotions and find personalized support based on your mood</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300">
            <label htmlFor="mood-input" className="block text-sm font-medium mb-2 text-gray-700">
              How are you feeling today?
            </label>
            <textarea
              id="mood-input"
              className="w-full p-4 border border-gray-300 rounded-lg mb-4 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 bg-white"
              rows={4}
              placeholder="Share your thoughts and feelings..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-describedby="input-help"
            />
            <p id="input-help" className="text-sm text-gray-500 mb-4">Press Enter to analyze</p>

            {/* Multi-Modal Toggle */}
            <div className="mb-4">
              <button
                onClick={() => setShowMultiModal(!showMultiModal)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{showMultiModal ? '🔽' : '▶️'}</span>
                Advanced: Voice & Image Analysis
              </button>
            </div>

            {/* Multi-Modal Components */}
            {showMultiModal && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Multi-Modal Input</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">Voice Recording</h4>
                    <VoiceRecorder onRecordingComplete={handleVoiceRecording} />
                    {voiceData && (
                      <p className="text-xs text-green-600 mt-1">✓ Voice recorded</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">Image Capture</h4>
                    <ImageCapture onImageCapture={handleImageCapture} />
                    {imageData && (
                      <p className="text-xs text-green-600 mt-1">✓ Image captured</p>
                    )}
                  </div>
                </div>
                {(voiceData || imageData) && (
                  <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                    Analysis Mode: {analysisMode === 'multimodal' ? 'Multi-Modal' : analysisMode === 'voice' ? 'Voice' : 'Image'}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleAnalyze}
                disabled={loading || (!textInput.trim() && !voiceData && !imageData)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                aria-label="Analyze mood"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  `Analyze ${analysisMode === 'multimodal' ? 'Multi-Modal' : analysisMode === 'voice' ? 'Voice' : analysisMode === 'image' ? 'Image' : 'Text'} Mood`
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-lg font-medium transition bg-gray-200 text-gray-700 hover:bg-gray-300"
                aria-label="Reset"
              >
                Reset
              </button>
            </div>

            {loading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{progress}% complete</p>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
              <button onClick={() => setError(null)} className="float-right font-bold" aria-label="Close error">×</button>
            </div>
          )}

          {result && (
            <>
              {/* Confidence Display */}
              <ConfidenceDisplay result={result} />

              <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${getMoodBorder(result.mood_detected)} animate-fade-in transition-all duration-300 relative`}>
                {isPositiveMood && (
                  <div className="absolute top-4 right-4 text-2xl animate-bounce">🎉</div>
                )}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Your Personalized Support</h2>
                  <button
                    onClick={handleShare}
                    className="px-3 py-1 rounded text-sm bg-gray-200 text-gray-700 hover:bg-opacity-80 transition"
                    aria-label="Share results"
                  >
                    Share
                  </button>
                </div>
                <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3" role="img" aria-label="Mood">🎭</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Mood Detected</h3>
                    <p className="text-gray-600">{result.mood_detected}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3" role="img" aria-label="Empathy">💙</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Empathy</h3>
                    <p className="text-gray-600">{result.empathy_response}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3" role="img" aria-label="Recommendation">💡</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Recommendation</h3>
                    <p className="text-gray-600">{result.recommendation}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3" role="img" aria-label="Quote">✨</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Motivational Quote</h3>
                    <blockquote className="italic border-l-2 border-gray-300 pl-4 text-gray-600">
                      &ldquo;{result.motivational_quote}&rdquo;
                    </blockquote>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3" role="img" aria-label="Music">🎵</span>
                  <div className="w-full">
                    <h3 className="font-semibold mb-2 text-gray-800">Music Recommendation</h3>
                    <p className="mb-2 text-gray-600">{result.music_recommendation.title} by {result.music_recommendation.artist}</p>
                    {(() => {
                      const videoId = getYouTubeVideoId(result.music_recommendation.youtube_link);
                      return videoId ? (
                        <a href={result.music_recommendation.youtube_link} target="_blank" rel="noopener noreferrer" className="block">
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                            alt="YouTube video thumbnail"
                            className="w-full aspect-video object-cover rounded-lg shadow-md hover:shadow-lg transition"
                          />
                        </a>
                      ) : (
                        <a href={result.music_recommendation.youtube_link} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
                          Listen on YouTube
                        </a>
                      );
                    })()}
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3" role="img" aria-label="Book">📚</span>
                  <div className="w-full">
                    <h3 className="font-semibold mb-2 text-gray-800">Book Recommendation</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">{result.book_recommendation.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">by {result.book_recommendation.author}</p>
                      <p className="text-sm text-gray-700 mb-2">{result.book_recommendation.description}</p>
                      <p className="text-xs text-gray-500 mb-3">Genre: {result.book_recommendation.genre}</p>
                      <div className="flex gap-2">
                        {result.book_recommendation.amazonLink && (
                          <a 
                            href={result.book_recommendation.amazonLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition"
                          >
                            View on Amazon
                          </a>
                        )}
                        {result.book_recommendation.goodreadsLink && (
                          <a 
                            href={result.book_recommendation.goodreadsLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
                          >
                            View on Goodreads
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3" role="img" aria-label="Place">📍</span>
                  <div className="w-full">
                    <h3 className="font-semibold mb-2 text-gray-800">Place Recommendation</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">{result.place_recommendation.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">📍 {result.place_recommendation.location}</p>
                      <p className="text-sm text-gray-700 mb-2">{result.place_recommendation.description}</p>
                      <p className="text-xs text-gray-500 mb-2">Type: {result.place_recommendation.type}</p>
                      <div className="mb-2">
                        <p className="text-xs font-medium text-gray-600 mb-1">Suggested activities:</p>
                        <div className="flex flex-wrap gap-1">
                          {result.place_recommendation.activities.map((activity, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                      {result.place_recommendation.bestTimeToVisit && (
                        <p className="text-xs text-gray-500 mb-2">
                          Best time to visit: {result.place_recommendation.bestTimeToVisit}
                        </p>
                      )}
                      {result.place_recommendation.websiteLink && (
                        <a 
                          href={result.place_recommendation.websiteLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                        >
                          More information
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </>
          )}

          {/* Emotional Pattern Tracker */}
          {history.length > 0 && (
            <div className="mt-8">
              <EmotionalPatternTracker history={history} />
            </div>
          )}

          {history.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Analyses</h3>
              <div className="space-y-2">
                {history.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded border ${getMoodBg(item.mood_detected)} ${getMoodBorder(item.mood_detected)} cursor-pointer hover:opacity-80 transition`}
                    onClick={() => setResult(item)}
                  >
                    <p className="font-medium text-gray-900">{item.mood_detected}</p>
                    <p className="text-sm opacity-75 text-gray-700">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}