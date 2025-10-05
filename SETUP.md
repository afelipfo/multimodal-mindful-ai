# Quick Setup Guide

## ⚡ Fast Start (3 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up OpenAI API Key

Create a `.env.local` file in the project root:
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:
```env
OPENAI_API_KEY=your_actual_openai_api_key_here
```

**Get your API key:** https://platform.openai.com/api-keys

### 3. Start the App
```bash
npm run dev
```

Open http://localhost:3000 🚀

---

## 🎭 Testing the App

### Text Analysis
1. Type how you're feeling
2. Click "Analyze Text Mood"
3. Get personalized recommendations!

### Voice Analysis
1. Click "Advanced: Voice & Image Analysis"
2. Click the microphone button
3. Record your voice (up to 60s)
4. Click "Analyze Multi-Modal Mood"

### Image Analysis
1. Click "Advanced: Voice & Image Analysis"
2. Click "📷 Take Photo" or "📁 Upload Image"
3. Capture/upload your photo
4. Click "Analyze Multi-Modal Mood"

---

## 🔧 MCP Server Setup (Optional)

If you want to use the MCP server with Claude Desktop:

```bash
cd mcp-server
npm install
npm run build
```

See `mcp-server/README.md` for full configuration.

---

## ⚠️ Troubleshooting

**API Errors?**
- Make sure `.env.local` exists with valid OPENAI_API_KEY
- Restart the dev server after adding the key

**Camera Not Working?**
- Grant camera permissions when prompted
- Use HTTPS or localhost (required for camera access)

**Voice Not Working?**
- Grant microphone permissions when prompted
- Check browser console for errors

---

## 📚 Need Help?

- **Full Documentation**: See README.md
- **MCP Server**: See mcp-server/README.md
- **Quick Start**: See mcp-server/QUICKSTART.md
