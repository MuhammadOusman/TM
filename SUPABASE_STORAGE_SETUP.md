# Supabase Storage Bucket Setup - URGENT FIX

## Problem
Images are not uploading - getting 403 error:
```
StorageApiError: new row violates row-level security policy
```

## Solution: Setup Storage Bucket

### Step 1: Create Storage Bucket
1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/zmklauljzmdirdpzpadb/storage/buckets
2. Click **"New bucket"**
3. Name: `properties`
4. **Public bucket**: ✅ Enable (so images can be viewed publicly)
5. Click **Create bucket**

### Step 2: Set Bucket Policies
1. Click on the `properties` bucket
2. Go to **Policies** tab
3. Click **"New Policy"**

#### Policy 1: Public Read (Anyone can view images)
- Policy Name: `Public Read Access`
- Allowed operations: **SELECT**
- Target roles: **public** (anon)
- Policy definition:
```sql
true
```
Click **Save**

#### Policy 2: Authenticated Upload (Admin can upload)
- Policy Name: `Authenticated Upload`
- Allowed operations: **INSERT**
- Target roles: **authenticated**
- Policy definition:
```sql
(auth.role() = 'authenticated')
```
Click **Save**

#### Policy 3: Authenticated Delete (Admin can delete)
- Policy Name: `Authenticated Delete`  
- Allowed operations: **DELETE**
- Target roles: **authenticated**
- Policy definition:
```sql
(auth.role() = 'authenticated')
```
Click **Save**

### Step 3: Verify Setup
1. Make sure bucket is **PUBLIC** (toggle should be ON)
2. Make sure all 3 policies are enabled
3. Go to admin panel and try uploading an image

## Quick Alternative (If Storage Not Working)

For now, you can use **external image URLs**:
1. Upload images to any free hosting: 
   - imgur.com
   - cloudinary.com
   - Or use Unsplash URLs
2. When creating property, use those URLs directly
3. Images will work immediately

## Current Code Changes
- ✅ Fixed image upload to extract URL properly
- ✅ Added error handling for failed uploads
- ✅ Temporarily disabled "image required" validation
- ✅ Fallback placeholder images working

## After Storage Setup
Once storage bucket is configured:
1. Delete the existing property with broken images
2. Create a new property with proper image upload
3. Images will upload to Supabase Storage
4. Public URLs will be generated automatically

## Test Checklist
- [ ] Storage bucket created
- [ ] Bucket set to PUBLIC
- [ ] 3 policies created and enabled
- [ ] Try uploading image in admin panel
- [ ] Check if image appears on property detail page
- [ ] Verify image shows on properties list page
- [ ] Confirm image shows on homepage featured section
