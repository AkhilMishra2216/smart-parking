# 🔧 Backend Troubleshooting Guide

## Issue: "Route not found" Error

### Quick Fixes

#### 1. Check the Correct URL
Make sure you're accessing the right endpoint:

✅ **Correct URLs:**
- Root: `https://your-backend.onrender.com/`
- Health: `https://your-backend.onrender.com/health`
- API: `https://your-backend.onrender.com/api/register`

❌ **Wrong:**
- Just the domain without any path (might work now with root route)
- Wrong endpoint path

#### 2. Check Render Deployment Status

1. Go to Render dashboard
2. Click on your backend service
3. Check the **"Events"** or **"Logs"** tab
4. Look for:
   - ✅ "Build successful"
   - ✅ "Deploy successful"
   - ❌ Any error messages

#### 3. Verify Environment Variables

In Render dashboard, go to **"Environment"** tab and verify:

```
✅ PORT=5000 (or leave empty - Render auto-assigns)
✅ NODE_ENV=production
✅ SUPABASE_URL=https://xxxxx.supabase.co
✅ SUPABASE_ANON_KEY=eyJhbGc...
✅ FRONTEND_URL=https://your-frontend.vercel.app
```

**Common Issues:**
- Missing `SUPABASE_URL` or `SUPABASE_ANON_KEY` → Server won't start
- Wrong Supabase URL format → Should start with `https://`
- Extra spaces in env vars → Remove them

#### 4. Check Build Logs

In Render dashboard:
1. Go to **"Logs"** tab
2. Look for error messages
3. Common errors:

**"Missing required environment variables"**
→ Add missing env vars in Render dashboard

**"Cannot find module"**
→ Check Root Directory is set to `backend`
→ Check Build Command is `npm install`

**"Port already in use"**
→ Remove `PORT` env var (Render assigns it automatically)

**"Supabase connection error"**
→ Verify Supabase credentials
→ Check Supabase project is active

#### 5. Test Health Endpoint

Try these URLs in your browser:

```
https://your-backend.onrender.com/
https://your-backend.onrender.com/health
```

Both should return JSON responses.

#### 6. Check Render Service Status

**Free Tier Note:**
- Render free tier services **sleep after 15 minutes** of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal behavior

**To prevent sleep:**
- Upgrade to paid plan
- Or use a service like UptimeRobot to ping your service every 10 minutes

#### 7. Verify Root Directory

In Render settings:
- **Root Directory** MUST be: `backend`
- NOT: `.` or empty or `./backend`

#### 8. Check Start Command

In Render settings:
- **Start Command** MUST be: `npm start`
- NOT: `node server.js` (won't work if package.json has start script)

---

## Common Error Messages

### "Route not found" (404)
**Cause:** Wrong URL or route doesn't exist
**Fix:** 
- Use `/health` or `/` for testing
- Check route paths in server.js

### "Cannot GET /"
**Cause:** No root route (fixed in latest code)
**Fix:** Access `/health` or `/` endpoint

### "Internal Server Error" (500)
**Cause:** Database connection issue or code error
**Fix:**
- Check Supabase credentials
- Check Render logs for specific error
- Verify database tables exist

### "Service Unavailable" (503)
**Cause:** Service is sleeping (free tier) or crashed
**Fix:**
- Wait 30-60 seconds and try again
- Check Render dashboard for service status
- Check logs for crash errors

---

## Testing Your Backend

### Test 1: Root Endpoint
```bash
curl https://your-backend.onrender.com/
```
Should return: `{"message":"Smart Parking API",...}`

### Test 2: Health Check
```bash
curl https://your-backend.onrender.com/health
```
Should return: `{"status":"ok",...}`

### Test 3: Register Vehicle
```bash
curl -X POST https://your-backend.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"license_plate":"TEST123","owner_name":"Test User"}'
```
Should return: `{"message":"Vehicle registered successfully",...}`

---

## Still Not Working?

1. **Check Render Logs:**
   - Go to Render dashboard
   - Click your service
   - Click "Logs" tab
   - Look for error messages

2. **Verify Code is Deployed:**
   - Check if latest commit is deployed
   - Force redeploy if needed

3. **Test Locally First:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Then test: `curl http://localhost:5000/health`

4. **Check Supabase:**
   - Verify Supabase project is active
   - Check if tables exist
   - Test Supabase connection

---

## Quick Checklist

- [ ] Render service shows "Live" status
- [ ] Environment variables are set correctly
- [ ] Root Directory is `backend`
- [ ] Build Command is `npm install`
- [ ] Start Command is `npm start`
- [ ] Supabase credentials are correct
- [ ] Database tables exist in Supabase
- [ ] Testing correct URL (with `/health` or `/`)

---

## Need More Help?

1. Check Render documentation: [render.com/docs](https://render.com/docs)
2. Check server logs in Render dashboard
3. Test endpoints using curl or Postman
4. Verify Supabase connection separately

