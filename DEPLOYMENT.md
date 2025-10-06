# Deployment Guide

## 🚀 Deploy to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/afelipfo/multimodal-mindful-ai)

### Manual Deployment

1. **Push your code to GitHub** (already done! ✅)

2. **Go to [Vercel](https://vercel.com)**
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository: `afelipfo/multimodal-mindful-ai`

3. **Configure Environment Variables**
   - In Vercel project settings, add:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

4. **Deploy!**
   - Click "Deploy"
   - Wait ~2 minutes for build to complete
   - Your app will be live at: `https://your-project.vercel.app`

---

## ✅ Build Configuration

The project is configured for Vercel deployment:

- ✅ `tsconfig.json` - Excludes MCP server from build
- ✅ `.vercelignore` - Prevents MCP server from being deployed
- ✅ `.gitignore` - Prevents .env files from being committed
- ✅ Production build tested and working

---

## 🔒 Environment Variables

**Required:**
- `OPENAI_API_KEY` - Your OpenAI API key

**How to add in Vercel:**
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add `OPENAI_API_KEY` with your key
4. Select all environments (Production, Preview, Development)
5. Click "Save"
6. Redeploy to apply changes

---

## 📝 Important Notes

### MCP Server
The MCP server in `/mcp-server` is **NOT deployed** to Vercel. It's a separate tool that runs locally or on Claude Desktop. Only the Next.js web app is deployed.

### API Usage
The deployed app will use OpenAI API with your key. Monitor usage at:
https://platform.openai.com/usage

### Multi-Modal Features
- ✅ Text analysis works on deployed version
- ✅ Voice recording works (browser feature)
- ✅ Image capture works (browser feature)
- ✅ All features fully functional in production

---

## 🐛 Troubleshooting

**Build fails?**
- Check that environment variable `OPENAI_API_KEY` is set
- Verify the latest commit is pushed to GitHub
- Check Vercel build logs for specific errors

**App works locally but not on Vercel?**
- Environment variables must be set in Vercel dashboard
- Redeploy after adding env vars

**API errors in production?**
- Verify OpenAI API key is valid
- Check API usage limits not exceeded
- Review Vercel function logs

---

## 📊 Monitoring

**Vercel Dashboard:**
- View deployments and build logs
- Monitor function execution
- Check performance analytics

**OpenAI Dashboard:**
- Track API usage and costs
- Monitor rate limits
- View error logs

---

## 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

Every git push triggers a new deployment! 🎉
