'use client';

import { MindfulResponse } from '@/lib/types';

interface ConfidenceDisplayProps {
  result: MindfulResponse;
}

export default function ConfidenceDisplay({ result }: ConfidenceDisplayProps) {
  if (!result.confidence || !result.sources || !result.analysis_details) {
    return null;
  }

  const { confidence, sources, analysis_details } = result;
  const hasConflict = sources.length > 1 && confidence < 0.7;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <span>🎯</span>
          <span>Analysis Confidence</span>
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                confidence >= 0.8
                  ? 'bg-green-500'
                  : confidence >= 0.6
                  ? 'bg-yellow-500'
                  : 'bg-orange-500'
              }`}
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-gray-700">
            {Math.round(confidence * 100)}%
          </span>
        </div>
      </div>

      {hasConflict && (
        <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 flex items-start gap-2">
          <span className="text-base">⚠️</span>
          <div>
            <p className="font-medium">Mixed Signals Detected</p>
            <p className="text-yellow-700">
              Your different inputs show varying emotions. The analysis combines all signals to provide comprehensive support.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-600 mb-2">
          Analysis Sources ({sources.length}):
        </p>

        {analysis_details.text && (
          <div className="flex items-center justify-between bg-white rounded p-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">💬</span>
              <div>
                <p className="font-medium text-gray-700">Text Analysis</p>
                <p className="text-gray-500">Mood: {analysis_details.text.mood}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${analysis_details.text.confidence * 100}%` }}
                />
              </div>
              <span className="text-gray-600 text-xs">
                {Math.round(analysis_details.text.confidence * 100)}%
              </span>
            </div>
          </div>
        )}

        {analysis_details.voice && (
          <div className="flex items-center justify-between bg-white rounded p-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">🎤</span>
              <div>
                <p className="font-medium text-gray-700">Voice Analysis</p>
                <p className="text-gray-500">
                  {analysis_details.voice.emotion} • {analysis_details.voice.tone} tone
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${analysis_details.voice.confidence * 100}%` }}
                />
              </div>
              <span className="text-gray-600 text-xs">
                {Math.round(analysis_details.voice.confidence * 100)}%
              </span>
            </div>
          </div>
        )}

        {analysis_details.image && (
          <div className="flex items-center justify-between bg-white rounded p-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">📸</span>
              <div>
                <p className="font-medium text-gray-700">Facial Expression</p>
                <p className="text-gray-500">
                  {analysis_details.image.dominantEmotion}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${analysis_details.image.confidence * 100}%` }}
                />
              </div>
              <span className="text-gray-600 text-xs">
                {Math.round(analysis_details.image.confidence * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {analysis_details.image && analysis_details.image.emotions && (
        <div className="mt-3 pt-3 border-t border-purple-100">
          <p className="text-xs font-medium text-gray-600 mb-2">Facial Emotion Breakdown:</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(analysis_details.image.emotions)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .slice(0, 4)
              .map(([emotion, score]) => (
                <div key={emotion} className="flex items-center gap-1 text-xs">
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-gray-600 capitalize">{emotion}</span>
                      <span className="text-gray-500">{Math.round((score as number) * 100)}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-blue-400"
                        style={{ width: `${(score as number) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
