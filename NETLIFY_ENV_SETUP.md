# 🚀 Netlify Deployment Guide

## ⚠️ IMPORTANT: Netlify Environment Variables Setup

Your site is deployed but **Supabase environment variables are missing on Netlify**. This is why:
- `/admin/login` shows 404 (routing fixed with `_redirects` file)
- Properties are not loading (no database connection)

## 📋 Steps to Fix:

### 1. Add Environment Variables to Netlify

Go to your Netlify dashboard:
1. Open your site: **https://app.netlify.com/sites/YOUR_SITE_NAME/settings**
2. Click **Site settings** → **Environment variables** → **Add a variable**
3. Add these **TWO** variables:

```
Variable 1:
Key: REACT_APP_SUPABASE_URL
Value: https://zmklauljzmdirdpzpadb.supabase.co

Variable 2:
Key: REACT_APP_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpta2xhdWxqem1kaXJkcHpwYWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTUxMjYsImV4cCI6MjA3NTQ5MTEyNn0.0CGTXUgV2i_gZ3Wi8s2W4w0xxI2GLmSq4ajifsFMQXQ
```

### 2. Redeploy Your Site

After adding environment variables:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete

## ✅ Files Already Fixed:

- ✅ `public/_redirects` - Routes all URLs to index.html (fixes 404s)
- ✅ `netlify.toml` - Build configuration with CI=false (no strict linting)
- ✅ All ESLint errors removed
- ✅ Build passes successfully locally

## 🔍 Quick Test After Deploy:

1. Homepage: `https://your-site.netlify.app/`
2. Admin Login: `https://your-site.netlify.app/admin/login`
3. Properties: Should load from Supabase database

## 🎯 Alternative: Quick Deploy Command

You can also set env vars via Netlify CLI:

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login
netlify login

# Set environment variables
netlify env:set REACT_APP_SUPABASE_URL "https://zmklauljzmdirdpzpadb.supabase.co"
netlify env:set REACT_APP_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpta2xhdWxqem1kaXJkcHpwYWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTUxMjYsImV4cCI6MjA3NTQ5MTEyNn0.0CGTXUgV2i_gZ3Wi8s2W4w0xxI2GLmSq4ajifsFMQXQ"

# Deploy
netlify deploy --prod
```

## 📌 Summary

**Problem:** Environment variables (.env file) only work locally, not on Netlify
**Solution:** Manually add them in Netlify dashboard or via CLI
**Result:** Supabase connection will work and properties will load

---
**Note:** Never commit `.env` file to GitHub! These settings are site-specific.
