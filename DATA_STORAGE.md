# Data Storage Locations

Your FitFlex application stores data in **two locations** depending on whether JSON server is running:

## 📁 Storage Location 1: JSON Server (Primary)

### Location: `db.json` file in project root

**Path:** `C:\Users\Bobby Narra\fit_flex\db.json`

When JSON server is running (`npm run server`), all data is stored in this file:

```json
{
  "activities": [...],      // All fitness activities
  "goals": {...},           // User fitness goals
  "memberships": [...],     // Membership subscriptions
  "payments": [...],        // Payment history
  "users": [...]            // Registered users
}
```

**Advantages:**
- ✅ Data persists across browser sessions
- ✅ Can be backed up easily (just copy the file)
- ✅ Can be shared between different browsers/devices
- ✅ Data is visible and editable in the file

**How to view/edit:**
- Open `db.json` in any text editor
- Data is in JSON format (human-readable)
- Changes are reflected immediately when server is running

---

## 💾 Storage Location 2: Browser localStorage (Fallback)

### Location: Browser's local storage

When JSON server is **NOT running**, data is automatically stored in your browser's localStorage.

**Storage Keys Used:**
- `fitflex_activities` - All activities
- `fitflex_goals` - Fitness goals
- `fitflex_current_user` - Currently logged-in user
- `fitflex_users_fallback` - Registered users (when server is off)

**How to View localStorage Data:**

### In Chrome/Edge:
1. Open Developer Tools (F12)
2. Go to **Application** tab
3. Expand **Local Storage** in left sidebar
4. Click on `http://localhost:3000`
5. You'll see all the storage keys

### In Firefox:
1. Open Developer Tools (F12)
2. Go to **Storage** tab
3. Expand **Local Storage**
4. Click on `http://localhost:3000`

**Advantages:**
- ✅ Works even without JSON server
- ✅ Automatic fallback when server is unavailable
- ✅ Fast access (no network calls)

**Disadvantages:**
- ❌ Data is browser-specific (not shared across browsers)
- ❌ Can be cleared by user (clearing browser data)
- ❌ Harder to backup/manage

---

## 🔄 How Data Storage Works

### Scenario 1: JSON Server Running
```
User Action → JSON Server (db.json) → localStorage (backup)
```
- Primary storage: `db.json`
- localStorage: Used as backup/sync

### Scenario 2: JSON Server NOT Running
```
User Action → localStorage only
```
- All data stored in browser localStorage
- Data persists until browser data is cleared

---

## 📊 What Data is Stored Where

| Data Type | JSON Server (db.json) | localStorage |
|-----------|----------------------|--------------|
| Activities | ✅ Yes | ✅ Yes (fallback) |
| Goals | ✅ Yes | ✅ Yes (fallback) |
| Users | ✅ Yes | ✅ Yes (fallback) |
| Memberships | ✅ Yes | ❌ No |
| Payments | ✅ Yes | ❌ No |

---

## 🔍 How to Check Current Storage

### Check if JSON Server is Running:
1. Look for terminal running `npm run server`
2. Or visit: `http://localhost:3001/activities`
3. If you see JSON data, server is running

### Check localStorage:
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Check Local Storage section
4. Look for keys starting with `fitflex_`

---

## 💡 Best Practice

**Recommended Setup:**
1. Always run JSON server: `npm run server`
2. This ensures data is stored in `db.json`
3. localStorage acts as automatic backup
4. Data persists even if you close the browser

**To Start JSON Server:**
```bash
npm run server
```

This will:
- Watch `db.json` for changes
- Serve data on `http://localhost:3001`
- Automatically save all new data to `db.json`

---

## 🗑️ How to Clear Data

### Clear JSON Server Data:
- Edit `db.json` file directly
- Or delete entries via API calls

### Clear localStorage:
1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Right-click on Local Storage
4. Select "Clear" or delete individual keys

---

## 📝 Summary

- **Primary Storage:** `db.json` file (when server is running)
- **Fallback Storage:** Browser localStorage (when server is off)
- **Data Sync:** Automatic between both locations
- **Backup:** Always keep a copy of `db.json` for safety

