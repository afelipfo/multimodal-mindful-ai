# Mindful AI MCP Server

A Model Context Protocol (MCP) server that provides mood analysis tools and emotional support resources. This server exposes tools and resources for analyzing moods, getting personalized recommendations for music, books, and places based on emotional states.

## Features

### Tools

1. **get_music_recommendation** - Get music recommendations based on mood category
2. **get_book_recommendation** - Get book recommendations based on mood category
3. **get_place_recommendation** - Get place suggestions based on mood category
4. **detect_mood** - Detect mood category from user input text
5. **add_to_history** - Add mood analysis to history

### Resources

1. **mood://categories** - List of all supported mood categories
2. **mood://history** - Recent mood analysis history
3. **music://database** - Complete music database organized by mood
4. **books://database** - Complete books database organized by mood
5. **places://database** - Complete places database organized by mood

### Supported Mood Categories

- **happy** - Joyful, cheerful, content
- **sad** - Down, blue, melancholic
- **angry** - Frustrated, mad, irritated
- **anxious** - Worried, nervous, stressed
- **calm** - Relaxed, peaceful, serene
- **excited** - Energetic, enthusiastic, thrilled

## Installation

```bash
cd mcp-server
npm install
```

## Configuration

Create a `.env` file in the `mcp-server` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Building

```bash
npm run build
```

## Running

### Standalone (for testing)

```bash
npm start
```

### With MCP Inspector

```bash
npm run inspect
```

### In Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mindful-ai": {
      "command": "node",
      "args": ["/absolute/path/to/multimodal-mindful-ai/mcp-server/dist/index.js"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key_here"
      }
    }
  }
}
```

## Usage Examples

### Using Tools

```typescript
// Get music recommendations for happy mood
{
  "tool": "get_music_recommendation",
  "arguments": {
    "mood": "happy",
    "count": 3
  }
}

// Detect mood from text
{
  "tool": "detect_mood",
  "arguments": {
    "text": "I'm feeling really stressed about work today"
  }
}

// Get book recommendation
{
  "tool": "get_book_recommendation",
  "arguments": {
    "mood": "anxious",
    "count": 2
  }
}
```

### Accessing Resources

```typescript
// Get mood categories
Resource: mood://categories

// View history
Resource: mood://history

// Browse music database
Resource: music://database
```

## Development

### Watch mode

```bash
npm run dev
```

### Testing with Inspector

```bash
npm run inspect
```

This will launch the MCP Inspector tool where you can test all tools and resources interactively.

## Architecture

The MCP server is built with:

- **TypeScript** - Type-safe implementation
- **@modelcontextprotocol/sdk** - Official MCP SDK
- **Zod** - Schema validation
- **Stdio Transport** - Communication protocol

### Project Structure

```
mcp-server/
├── src/
│   ├── data/
│   │   ├── music.ts      # Music database
│   │   ├── books.ts      # Books database
│   │   └── places.ts     # Places database
│   ├── types.ts          # TypeScript type definitions
│   └── index.ts          # Main server implementation
├── dist/                 # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── README.md
```

## Integration with Mindful AI App

This MCP server can be integrated with the main Next.js application or used standalone. It provides a standardized interface for AI assistants to access mood analysis capabilities.

## License

MIT
