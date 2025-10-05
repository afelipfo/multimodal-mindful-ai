#!/usr/bin/env node

/**
 * Mindful AI MCP Server
 * Provides tools and resources for mood analysis and emotional support
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import * as dotenv from 'dotenv';
import { musicDatabase, moodCategories } from './data/music.js';
import { booksDatabase } from './data/books.js';
import { placesDatabase } from './data/places.js';
import { MoodCategory, MoodHistoryEntry } from './types.js';

// Load environment variables
dotenv.config();

// In-memory storage for mood history (in production, use a database)
const moodHistory: MoodHistoryEntry[] = [];
const MAX_HISTORY_SIZE = 50;

/**
 * Initialize the MCP server
 */
const server = new Server(
  {
    name: 'mindful-ai-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

/**
 * Utility function to detect mood category from text
 */
function detectMoodCategory(text: string): MoodCategory {
  const lower = text.toLowerCase();

  if (lower.includes('happy') || lower.includes('joy') || lower.includes('cheerful') || lower.includes('delighted')) {
    return 'happy';
  }
  if (lower.includes('sad') || lower.includes('depress') || lower.includes('down') || lower.includes('blue')) {
    return 'sad';
  }
  if (lower.includes('angry') || lower.includes('mad') || lower.includes('furious') || lower.includes('rage')) {
    return 'angry';
  }
  if (lower.includes('anxious') || lower.includes('worry') || lower.includes('nervous') || lower.includes('stress')) {
    return 'anxious';
  }
  if (lower.includes('calm') || lower.includes('relax') || lower.includes('peace') || lower.includes('serene')) {
    return 'calm';
  }
  if (lower.includes('excited') || lower.includes('energetic') || lower.includes('thrilled') || lower.includes('pumped')) {
    return 'excited';
  }

  return 'calm'; // default
}

/**
 * Add entry to mood history
 */
function addToHistory(mood: string, input: string): void {
  moodHistory.unshift({
    timestamp: new Date().toISOString(),
    mood,
    input: input.substring(0, 100), // Store first 100 chars
  });

  // Keep history size under limit
  if (moodHistory.length > MAX_HISTORY_SIZE) {
    moodHistory.pop();
  }
}

/**
 * List available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_music_recommendation',
        description: 'Get music recommendations based on mood category (happy, sad, angry, anxious, calm, excited)',
        inputSchema: {
          type: 'object',
          properties: {
            mood: {
              type: 'string',
              description: 'The mood category (happy, sad, angry, anxious, calm, excited)',
              enum: moodCategories,
            },
            count: {
              type: 'number',
              description: 'Number of recommendations to return (default: 1, max: 5)',
              default: 1,
            },
          },
          required: ['mood'],
        },
      },
      {
        name: 'get_book_recommendation',
        description: 'Get book recommendations based on mood category',
        inputSchema: {
          type: 'object',
          properties: {
            mood: {
              type: 'string',
              description: 'The mood category (happy, sad, angry, anxious, calm, excited)',
              enum: moodCategories,
            },
            count: {
              type: 'number',
              description: 'Number of recommendations to return (default: 1)',
              default: 1,
            },
          },
          required: ['mood'],
        },
      },
      {
        name: 'get_place_recommendation',
        description: 'Get place recommendations based on mood category',
        inputSchema: {
          type: 'object',
          properties: {
            mood: {
              type: 'string',
              description: 'The mood category (happy, sad, angry, anxious, calm, excited)',
              enum: moodCategories,
            },
            count: {
              type: 'number',
              description: 'Number of recommendations to return (default: 1)',
              default: 1,
            },
          },
          required: ['mood'],
        },
      },
      {
        name: 'detect_mood',
        description: 'Detect mood category from user input text',
        inputSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'User input text to analyze for mood',
            },
          },
          required: ['text'],
        },
      },
      {
        name: 'add_to_history',
        description: 'Add a mood analysis to history',
        inputSchema: {
          type: 'object',
          properties: {
            mood: {
              type: 'string',
              description: 'Detected mood',
            },
            input: {
              type: 'string',
              description: 'User input text',
            },
          },
          required: ['mood', 'input'],
        },
      },
    ],
  };
});

/**
 * Handle tool calls
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_music_recommendation': {
        const { mood, count = 1 } = args as { mood: MoodCategory; count?: number };
        const songs = musicDatabase[mood] || musicDatabase.calm;
        const recommendations = songs.slice(0, Math.min(count, 5));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(recommendations, null, 2),
            },
          ],
        };
      }

      case 'get_book_recommendation': {
        const { mood, count = 1 } = args as { mood: MoodCategory; count?: number };
        const books = booksDatabase[mood] || booksDatabase.calm;
        const recommendations = books.slice(0, Math.min(count, books.length));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(recommendations, null, 2),
            },
          ],
        };
      }

      case 'get_place_recommendation': {
        const { mood, count = 1 } = args as { mood: MoodCategory; count?: number };
        const places = placesDatabase[mood] || placesDatabase.calm;
        const recommendations = places.slice(0, Math.min(count, places.length));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(recommendations, null, 2),
            },
          ],
        };
      }

      case 'detect_mood': {
        const { text } = args as { text: string };
        const detectedMood = detectMoodCategory(text);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                mood: detectedMood,
                input: text,
                confidence: 'rule-based detection',
              }, null, 2),
            },
          ],
        };
      }

      case 'add_to_history': {
        const { mood, input } = args as { mood: string; input: string };
        addToHistory(mood, input);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: 'Added to history',
                historySize: moodHistory.length,
              }, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorMessage }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

/**
 * List available resources
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'mood://categories',
        name: 'Mood Categories',
        description: 'List of all supported mood categories',
        mimeType: 'application/json',
      },
      {
        uri: 'mood://history',
        name: 'Mood History',
        description: 'Recent mood analysis history',
        mimeType: 'application/json',
      },
      {
        uri: 'music://database',
        name: 'Music Database',
        description: 'Complete music database organized by mood',
        mimeType: 'application/json',
      },
      {
        uri: 'books://database',
        name: 'Books Database',
        description: 'Complete books database organized by mood',
        mimeType: 'application/json',
      },
      {
        uri: 'places://database',
        name: 'Places Database',
        description: 'Complete places database organized by mood',
        mimeType: 'application/json',
      },
    ],
  };
});

/**
 * Read resource content
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    switch (uri) {
      case 'mood://categories':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify({
                categories: moodCategories,
                descriptions: {
                  happy: 'Joyful, cheerful, content',
                  sad: 'Down, blue, melancholic',
                  angry: 'Frustrated, mad, irritated',
                  anxious: 'Worried, nervous, stressed',
                  calm: 'Relaxed, peaceful, serene',
                  excited: 'Energetic, enthusiastic, thrilled',
                },
              }, null, 2),
            },
          ],
        };

      case 'mood://history':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify({
                total: moodHistory.length,
                recent: moodHistory.slice(0, 10),
              }, null, 2),
            },
          ],
        };

      case 'music://database':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(musicDatabase, null, 2),
            },
          ],
        };

      case 'books://database':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(booksDatabase, null, 2),
            },
          ],
        };

      case 'places://database':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(placesDatabase, null, 2),
            },
          ],
        };

      default:
        throw new Error(`Unknown resource: ${uri}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to read resource: ${errorMessage}`);
  }
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Mindful AI MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
