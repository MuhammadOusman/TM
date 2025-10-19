# Blog Post Edit Problem Ka Solution (Urdu)

## Masla
Jab aap blog post ko **edit** karte ho, to form me pehle ki saari cheezain (title, content, author, etc.) show nahi ho rahi theen.

## Kya Fix Kiya

### 1. API me `getById` function add kiya
- Pehle ye function missing tha jo edit ke time blog post ka data fetch karta
- Ab ye function database se proper data le aayega

### 2. Form me data fetching fix kiya
- Response me data nested tha (`data.data`)
- Ab properly extract ho raha hai aur form me show hoga

## Ab Kya Karna Hai

### Step 1: Pehle Database Fix Karo (ZAROORI!)

1. Supabase Dashboard kholo: https://supabase.com/dashboard/project/zmklauljzmdirdpzpadb/sql

2. **SQL Editor** pe click karo

3. Ye code copy-paste karo aur **Run** karo:

```sql
-- Blog posts table fix
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE blog_posts ALTER COLUMN author_id DROP NOT NULL;

-- Agar purane data me featured_image hai to copy kar do
UPDATE blog_posts SET image = featured_image WHERE featured_image IS NOT NULL AND image IS NULL;
```

4. Success message dekho

### Step 2: Storage Bucket Check Karo

1. Supabase me Storage section me jao: https://supabase.com/dashboard/project/zmklauljzmdirdpzpadb/storage/buckets

2. Check karo ke **"blog"** naam ki bucket hai ya nahi

3. Agar nahi hai to:
   - Click "New bucket"
   - Name: `blog`
   - Public: ✓ (tick karo)
   - Click "Create"

### Step 3: Development Server Restart Karo

Terminal me:
```bash
# Pehle band karo (Ctrl + C)
# Phir dobara chalo
npm start
```

### Step 4: Test Karo

1. Admin panel me jao: http://localhost:3000/admin/blog
2. Kisi bhi existing blog post pe **Edit** button click karo
3. Ab saara data form me show hona chahiye:
   - Title ✓
   - Slug ✓
   - Author ✓
   - Content ✓
   - Category ✓
   - Excerpt ✓
   - Featured Image ✓
   - Status ✓

## Agar Abhi Bhi Problem Ho

1. **Browser Console** kholo (F12 press karo)
2. **Console tab** dekho koi error hai?
3. **Network tab** me dekho API call ho rahi hai ya nahi
4. Mujhe error message bhejo, main aur help karunga!

## Key Changes Summary

✅ `blogAPI.getById()` function add kiya
✅ Form me proper data extraction fix kiya
✅ Image upload bug fix kiya
✅ Database columns add karne ka SQL diya

---

**Important**: Sabse pehle Step 1 (Database Fix) karo, warna kuch kaam nahi karega!
