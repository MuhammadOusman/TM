# Dar Al Barakah Holiday Homes - Backend Setup Guide

## 🚀 Quick Start Guide

### **Step 1: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: Dar Al Barakah Holiday Homes
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to Dubai (e.g., Singapore)
4. Click "Create new project" and wait ~2 minutes

### **Step 2: Set Up Database**

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql` file
4. Click **RUN** (or press Ctrl+Enter)
5. Wait for "Success" message

### **Step 3: Create Storage Buckets**

1. Go to **Storage** in Supabase dashboard
2. Click "New bucket"
3. Create these buckets:
   - **Name**: `properties`, **Public**: ✅ Yes
   - **Name**: `blog-images`, **Public**: ✅ Yes
   - **Name**: `agents`, **Public**: ✅ Yes

### **Step 4: Get Your API Keys**

1. Go to **Settings** → **API** in Supabase dashboard
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxxxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### **Step 5: Configure Your React App**

1. Create a `.env` file in your project root (copy from `.env.example`):
```bash
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **IMPORTANT**: Add `.env` to your `.gitignore`:
```
# Environment variables
.env
.env.local
```

### **Step 6: Create Admin User**

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Fill in:
   - **Email**: your-admin@email.com
   - **Password**: (create a strong password)
   - **Auto Confirm User**: ✅ Yes
4. Click "Create user"

### **Step 7: Test the Backend**

1. Stop your React dev server if running (Ctrl+C in terminal)
2. Start it again:
```bash
npm start
```

3. The site should now load with the new dark theme!

---

## 📊 What You Now Have

### **Database Tables:**
- ✅ **properties** - All property listings
- ✅ **property_images** - Multiple images per property
- ✅ **blog_posts** - Blog articles and content
- ✅ **agents** - Team member profiles
- ✅ **contact_inquiries** - Contact form submissions
- ✅ **services** - Service descriptions
- ✅ **analytics_events** - User behavior tracking

### **Features Enabled:**
- ✅ **Authentication** - Admin login/logout
- ✅ **File Upload** - Image storage for properties/blogs
- ✅ **Real-time** - Live data updates
- ✅ **Analytics** - Track views, clicks, inquiries
- ✅ **Security** - Row-level security policies
- ✅ **Search** - Full-text search capabilities

---

## 🎨 Admin Panel Routes (Coming Next)

Once I finish building the admin panel, you'll have:

```
/admin/login              - Admin login page
/admin/dashboard          - Analytics & overview
/admin/properties         - Manage all properties
/admin/properties/new     - Add new property
/admin/properties/:id     - Edit property
/admin/blog               - Manage blog posts
/admin/blog/new           - Create blog post
/admin/blog/:id           - Edit blog post
/admin/inquiries          - View contact forms
/admin/agents             - Manage team
/admin/services           - Manage services
```

---

## 🔐 Security Features

### **Already Implemented:**
- ✅ Row Level Security (RLS) on all tables
- ✅ Public users can only view active/published content
- ✅ Admins have full CRUD access
- ✅ Anonymous users can submit contact forms
- ✅ API keys are environment variables (not in code)

### **Best Practices:**
- ✅ Never commit `.env` file to git
- ✅ Use strong passwords for admin accounts
- ✅ Enable 2FA on Supabase account (Settings → Account)
- ✅ Regularly backup your database (Settings → Database → Backups)

---

## 📈 Analytics Dashboard Features

### **Dashboard Stats:**
- Total properties & active properties
- Total blog posts & published posts
- Contact inquiries (total & new)
- Active team members
- Total property views

### **Charts & Graphs:**
- Daily/Weekly/Monthly traffic
- Property performance (views, inquiries)
- Top performing blog posts
- Inquiry trends over time
- Most popular locations

---

## 🛠️ API Functions Available

All API functions are in `src/services/api.js`:

### **Properties:**
```javascript
import { propertiesAPI } from './services/api';

// Get all properties
const { data, error } = await propertiesAPI.getAll();

// Get single property
const { data, error } = await propertiesAPI.getById(propertyId);

// Admin: Create property
const { data, error } = await propertiesAPI.create(propertyData);
```

### **Blog:**
```javascript
import { blogAPI } from './services/api';

// Get published posts
const { data, error } = await blogAPI.getAll();

// Get by slug
const { data, error } = await blogAPI.getBySlug('property-investment-2025');
```

### **Analytics:**
```javascript
import { analyticsAPI } from './services/api';

// Track event
await analyticsAPI.trackEvent('property_view', 'property', propertyId);

// Get dashboard stats
const { data, error } = await analyticsAPI.getDashboardStats();
```

---

## 🚨 Troubleshooting

### **Issue: "Missing Supabase environment variables"**
**Solution**: Make sure `.env` file exists and has correct values

### **Issue: "RLS policy violation"**
**Solution**: Check if user is authenticated. Some operations require admin login

### **Issue: "Failed to fetch"**
**Solution**: Check Supabase project is active and URL/keys are correct

### **Issue: Database schema errors**
**Solution**: Make sure you ran the entire `supabase-schema.sql` file

---

## 📞 Need Help?

1. Check Supabase docs: https://supabase.com/docs
2. Check SQL errors in Supabase dashboard → Database → Logs
3. Check browser console for JavaScript errors
4. Check Network tab for failed API requests

---

## ✅ Next Steps

I'm now building:
1. ✨ Admin login page
2. ✨ Admin dashboard with analytics
3. ✨ Property management interface
4. ✨ Blog management interface
5. ✨ Contact inquiry viewer

**Ready to continue?** Just let me know! 🚀
