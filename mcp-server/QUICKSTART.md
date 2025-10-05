# MCP Server Quick Start Guide

## What is this?

The Mindful AI MCP Server allows AI assistants like Claude to access mood analysis tools and databases directly. It implements the **Model Context Protocol (MCP)**, an open standard for connecting AI applications to external systems.

## Quick Setup (5 minutes)

### 1. Build the Server

```bash
cd mcp-server
npm install
npm run build
```

### 2. Test It Works

```bash
npm run inspect
```

This opens the MCP Inspector where you can test all tools and resources.

### 3. Connect to Claude Desktop

**Step 1:** Find your config file location:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Step 2:** Get the absolute path to your server:

```bash
pwd
# Copy the output, you'll need it!
```

**Step 3:** Edit your Claude Desktop config:

```json
{
  "mcpServers": {
    "mindful-ai": {
      "command": "node",
      "args": [
        "/YOUR/ABSOLUTE/PATH/multimodal-mindful-ai/mcp-server/dist/index.js"
      ],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key_here"
      }
    }
  }
}
```

**Step 4:** Restart Claude Desktop

### 4. Try It Out!

In Claude Desktop, try asking:

- "What music do you recommend for a happy mood?"
- "Show me books for when I'm feeling anxious"
- "What are the available mood categories?"
- "Detect my mood from: I'm feeling really stressed about work today"

## Available Tools

### 1. `get_music_recommendation`
Get music suggestions for any mood.

**Example:**
```json
{
  "mood": "happy",
  "count": 3
}
```

### 2. `get_book_recommendation`
Get book recommendations based on mood.

**Example:**
```json
{
  "mood": "anxious",
  "count": 2
}
```

### 3. `get_place_recommendation`
Get suggestions for places to visit.

**Example:**
```json
{
  "mood": "calm",
  "count": 1
}
```

### 4. `detect_mood`
Automatically detect mood from text.

**Example:**
```json
{
  "text": "I'm feeling really excited about my new project!"
}
```

### 5. `add_to_history`
Track mood analyses over time.

**Example:**
```json
{
  "mood": "happy",
  "input": "Had a great day today!"
}
```

## Available Resources

Access these directly in Claude:

- **`mood://categories`** - See all mood categories and descriptions
- **`mood://history`** - View recent mood tracking
- **`music://database`** - Browse the entire music collection
- **books://database** - Browse the book collection
- **`places://database`** - Browse all place recommendations

## Troubleshooting

### Server won't start
- Check that you ran `npm run build`
- Make sure Node.js v18+ is installed
- Verify the path in your config is absolute, not relative

### Claude doesn't see the server
- Restart Claude Desktop after config changes
- Check the config JSON syntax is valid
- Look at Claude's developer tools for error messages

### Tools aren't working
- Ensure the OPENAI_API_KEY is set (if needed for future features)
- Check the server logs for errors
- Try running `npm run inspect` to test manually

## What's Next?

- **Customize the databases**: Edit files in `src/data/` to add your own music, books, or places
- **Add new tools**: Extend `src/index.ts` with custom functionality
- **Connect other apps**: Use this server with any MCP-compatible application

## Support

- **Documentation**: See `README.md` for detailed info
- **Issues**: Report at https://github.com/afelipfo/multimodal-mindful-ai/issues
- **MCP Docs**: https://modelcontextprotocol.io/

---

**Happy mood tracking! 🎭**
