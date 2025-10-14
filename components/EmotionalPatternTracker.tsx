'use client';

import { useMemo } from 'react';
import { HistoryEntry, EmotionalPattern } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface EmotionalPatternTrackerProps {
  history: HistoryEntry[];
}

export default function EmotionalPatternTracker({ history }: EmotionalPatternTrackerProps) {
  const pattern = useMemo(() => analyzeEmotionalPattern(history), [history]);

  if (history.length < 2) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold mb-2 text-gray-800 flex items-center gap-2">
          <span>📊</span>
          <span>Emotional Patterns</span>
        </h3>
        <p className="text-sm text-gray-600">
          Track your emotional patterns over time. Keep using the app to see trends and insights!
        </p>
      </div>
    );
  }

  const timelineData = pattern.recentMoods.map((entry, index) => ({
    index: history.length - index,
    mood: entry.mood,
    confidence: Math.round(entry.confidence * 100),
    timestamp: new Date(entry.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  })).reverse();

  const moodFrequencyData = Object.entries(pattern.moodFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([mood, count]) => ({
      mood: mood.length > 15 ? mood.substring(0, 15) + '...' : mood,
      count,
    }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span>📊</span>
          <span>Emotional Patterns</span>
        </h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
            <p className="text-xs text-blue-700 font-medium mb-1">Trend</p>
            <p className="text-lg font-bold text-blue-900 capitalize flex items-center gap-1">
              {getTrendIcon(pattern.trend)}
              {pattern.trend}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
            <p className="text-xs text-purple-700 font-medium mb-1">Most Common</p>
            <p className="text-sm font-bold text-purple-900 truncate" title={pattern.mostCommonMood}>
              {pattern.mostCommonMood}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-green-700 font-medium mb-1">Avg Confidence</p>
            <p className="text-lg font-bold text-green-900">
              {Math.round(pattern.averageConfidence * 100)}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
            <p className="text-xs text-orange-700 font-medium mb-1">Total Entries</p>
            <p className="text-lg font-bold text-orange-900">{history.length}</p>
          </div>
        </div>

        {/* Trend Insights */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-1">💡 Pattern Insight</p>
          <p className="text-sm text-blue-800">{getPatternInsight(pattern)}</p>
        </div>
      </div>

      {/* Mood Frequency Chart */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Moods</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={moodFrequencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="mood"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Confidence Timeline */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Confidence Over Time</h4>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: 11, fill: '#6b7280' }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`${value}%`, 'Confidence']}
            />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Helper functions

function analyzeEmotionalPattern(history: HistoryEntry[]): EmotionalPattern {
  if (history.length === 0) {
    return {
      trend: 'stable',
      mostCommonMood: 'neutral',
      moodFrequency: {},
      averageConfidence: 0,
      recentMoods: [],
    };
  }

  // Count mood frequencies
  const moodFrequency: Record<string, number> = {};
  let totalConfidence = 0;
  const recentMoods = history.slice(0, 10).map(entry => ({
    mood: entry.mood_detected,
    timestamp: entry.timestamp,
    confidence: entry.confidence || 0.7,
  }));

  history.forEach(entry => {
    const mood = entry.mood_detected;
    moodFrequency[mood] = (moodFrequency[mood] || 0) + 1;
    totalConfidence += entry.confidence || 0.7;
  });

  const mostCommonMood = Object.entries(moodFrequency).reduce((a, b) =>
    moodFrequency[a[0]] > moodFrequency[b[0]] ? a : b
  )[0];

  const averageConfidence = totalConfidence / history.length;

  // Analyze trend (simplified)
  const trend = analyzeTrend(history);

  return {
    trend,
    mostCommonMood,
    moodFrequency,
    averageConfidence,
    recentMoods,
  };
}

function analyzeTrend(history: HistoryEntry[]): 'improving' | 'declining' | 'stable' | 'fluctuating' {
  if (history.length < 3) return 'stable';

  const positiveMoods = ['happy', 'joyful', 'excited', 'calm', 'relaxed', 'content'];
  const negativeMoods = ['sad', 'depressed', 'anxious', 'worried', 'angry', 'frustrated'];

  const recent = history.slice(0, Math.min(5, history.length));
  const older = history.slice(Math.min(5, history.length), Math.min(10, history.length));

  const countMoodType = (entries: HistoryEntry[]) => {
    let positive = 0;
    let negative = 0;
    entries.forEach(entry => {
      const mood = entry.mood_detected.toLowerCase();
      if (positiveMoods.some(m => mood.includes(m))) positive++;
      else if (negativeMoods.some(m => mood.includes(m))) negative++;
    });
    return { positive, negative };
  };

  const recentCounts = countMoodType(recent);
  const olderCounts = countMoodType(older);

  const recentRatio = recentCounts.positive / (recentCounts.positive + recentCounts.negative || 1);
  const olderRatio = olderCounts.positive / (olderCounts.positive + olderCounts.negative || 1);

  const difference = recentRatio - olderRatio;

  // Check for fluctuation
  const uniqueMoods = new Set(recent.map(e => e.mood_detected)).size;
  if (uniqueMoods >= recent.length * 0.8) {
    return 'fluctuating';
  }

  if (difference > 0.2) return 'improving';
  if (difference < -0.2) return 'declining';
  return 'stable';
}

function getTrendIcon(trend: string): string {
  switch (trend) {
    case 'improving':
      return '📈';
    case 'declining':
      return '📉';
    case 'fluctuating':
      return '📊';
    default:
      return '➡️';
  }
}

function getPatternInsight(pattern: EmotionalPattern): string {
  const insights = {
    improving: `Great news! Your emotional state shows an improving trend. You've been feeling ${pattern.mostCommonMood} most often. Keep up the positive momentum!`,
    declining: `Your recent mood shows a declining trend. The most common mood is ${pattern.mostCommonMood}. Consider reaching out to someone you trust or trying the recommended activities.`,
    stable: `Your emotional state has been relatively stable, with ${pattern.mostCommonMood} being most common. Consistency can be positive - keep monitoring how you feel.`,
    fluctuating: `Your moods have been quite varied recently. This is normal, but if it feels overwhelming, consider establishing a routine or talking to a professional.`,
  };

  return insights[pattern.trend];
}
