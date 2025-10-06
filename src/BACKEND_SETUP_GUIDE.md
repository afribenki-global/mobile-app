# AfriBenki Backend Setup & API Documentation

## Overview
AfriBenki uses Supabase for backend services including authentication, database, and serverless functions. This guide provides complete setup instructions and API documentation.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Environment Configuration](#environment-configuration)
4. [API Endpoints](#api-endpoints)
5. [Database Schema](#database-schema)
6. [Authentication Flow](#authentication-flow)
7. [Testing](#testing)
8. [Production Deployment](#production-deployment)

---

## Prerequisites

- Supabase account (free tier works for development)
- Node.js 18+ installed
- Basic understanding of REST APIs

---

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign in
3. Click "New Project"
4. Fill in project details:
   - **Name**: `afribenki` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., Africa, Europe)
5. Click "Create new project" (takes ~2 minutes)

### Step 2: Get Project Credentials

Once your project is created:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Note down:
   - **Project URL**: `https://YOUR_PROJECT_ID.supabase.co`
   - **Project ID**: The part before `.supabase.co` (e.g., `irvupvydhgieiexpexvj`)
   - **anon public key**: Long JWT token starting with `eyJ...`
   - **service_role key**: Long JWT token (keep this SECRET!)

### Step 3: Update Project Configuration

Replace the values in `/utils/supabase/info.tsx`:

```typescript
export const projectId = "YOUR_PROJECT_ID" // e.g., "irvupvydhgieiexpexvj"
export const publicAnonKey = "YOUR_ANON_KEY" // The anon/public key from Supabase
```

⚠️ **IMPORTANT**: Never commit the service_role key to Git!

---

## Environment Configuration

### Supabase Edge Function Environment Variables

The backend serverless function needs environment variables set in Supabase:

1. Go to **Project Settings** → **Edge Functions**
2. Add these secrets:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `SUPABASE_URL` | `https://YOUR_PROJECT_ID.supabase.co` | Your project URL |
| `SUPABASE_ANON_KEY` | Your anon public key | Public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Admin key (SECRET!) |

To add via CLI:
```bash
npx supabase secrets set SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
npx supabase secrets set SUPABASE_ANON_KEY=your_anon_key
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## API Endpoints

Base URL: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-850156da`

### Health Check
**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok"
}
```

---

### Initialize Demo User
**POST** `/init`

Creates the default demo user (000006/321654). Only needed once.

**Response:**
```json
{
  "message": "Default user created successfully",
  "username": "000006",
  "phone": "000006"
}
```

**Error Response:**
```json
{
  "message": "Default user already exists"
}
```

---

### Sign Up
**POST** `/signup`

Create a new user account with phone number.

**Request Body:**
```json
{
  "phone": "1234567890",
  "password": "yourpassword",
  "name": "John Doe",
  "email": "john@example.com",
  "countryCode": "+234"
}
```

**Response (Success - 200):**
```json
{
  "message": "User created successfully",
  "userId": "uuid-of-user"
}
```

**Response (Error - 400):**
```json
{
  "error": "Invalid phone number format. Please use a valid international phone number."
}
```

**Notes:**
- Phone numbers must be in E.164 format: `+[country code][number]`
- Password must be at least 6 characters
- Email is optional

---

### Sign In
**POST** `/signin`

Authenticate user and get access token.

**Request Body:**
```json
{
  "phone": "000006",
  "password": "321654"
}
```

**For Demo User:**
```json
{
  "phone": "000006",
  "password": "321654"
}
```

**Response (Success - 200):**
```json
{
  "accessToken": "jwt-token-here",
  "user": {
    "id": "user-uuid",
    "username": "000006",
    "phone": "000006",
    "name": "Demo User",
    "email": "demo@afribenki.app",
    "balance": 125000,
    "portfolioValue": 485000,
    "savings": 200000,
    "onboardingComplete": false,
    "profilePicture": null
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Signin failed: Invalid credentials"
}
```

---

### Get Profile (Protected)
**GET** `/profile`

Get current user's profile data.

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "user-uuid",
    "phone": "+2341234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "balance": 0,
    "portfolioValue": 0,
    "savings": 0,
    "onboardingComplete": false,
    "profilePicture": null,
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Unauthorized"
}
```

---

### Update Profile (Protected)
**PUT** `/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "profilePicture": "https://example.com/image.jpg",
  "balance": 150000,
  "portfolioValue": 500000,
  "savings": 250000
}
```

**Response (Success - 200):**
```json
{
  "message": "Profile updated successfully"
}
```

**Notes:**
- All fields are optional
- `onboardingComplete` is automatically set to `true`

---

### Get Circles
**GET** `/circles`

Get all circles (savings groups).

**Response (Success - 200):**
```json
{
  "circles": [
    {
      "id": "circle:1704567890123",
      "name": "Family Savings",
      "goal": "Vacation Fund",
      "targetAmount": 500000,
      "currentAmount": 200000,
      "members": ["user-id-1", "user-id-2"],
      "creatorId": "user-id-1",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Circle (Protected)
**POST** `/circles`

Create a new savings circle.

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Request Body:**
```json
{
  "name": "Wedding Fund",
  "goal": "Save for wedding",
  "targetAmount": 1000000,
  "contributionFrequency": "weekly",
  "privacy": "private"
}
```

**Response (Success - 200):**
```json
{
  "message": "Circle created successfully",
  "circleId": "circle:1704567890123"
}
```

---

## Database Schema

### User Data (KV Store)

The app uses Supabase KV store for user data with this structure:

**Key Pattern:** `user:{userId}` or `user:demo`

**Value Schema:**
```typescript
{
  id: string;              // Supabase Auth user ID
  username?: string;       // Optional username
  phone: string;           // Phone number (E.164 format)
  name: string;            // Full name
  email: string | null;    // Email (optional)
  balance: number;         // Wallet balance in smallest currency unit
  portfolioValue: number;  // Total investment value
  savings: number;         // Total savings amount
  onboardingComplete: boolean;
  profilePicture: string | null;
  createdAt: string;       // ISO 8601 timestamp
}
```

### Circle Data (KV Store)

**Key Pattern:** `circle:{timestamp}`

**Value Schema:**
```typescript
{
  id: string;              // Circle ID
  name: string;            // Circle name
  goal: string;            // Savings goal description
  targetAmount: number;    // Target savings amount
  currentAmount: number;   // Current total saved
  members: string[];       // Array of user IDs
  creatorId: string;       // Creator's user ID
  contributionFrequency: 'daily' | 'weekly' | 'monthly';
  privacy: 'public' | 'private';
  createdAt: string;       // ISO 8601 timestamp
}
```

---

## Authentication Flow

### 1. Demo User Flow
```
User enters: 000006 / 321654
    ↓
Frontend → POST /signin (email: demo@afribenki.app)
    ↓
Supabase Auth validates
    ↓
Backend returns: accessToken + user data
    ↓
Frontend stores token in localStorage
    ↓
User authenticated
```

### 2. New User Registration
```
User fills signup form
    ↓
Frontend → POST /signup
    ↓
Backend creates Supabase Auth user (phone auth)
    ↓
Backend creates user record in KV store
    ↓
Frontend shows success, navigates to signin
```

### 3. Protected Route Access
```
User makes request to protected endpoint
    ↓
Frontend adds: Authorization: Bearer {token}
    ↓
Backend validates token with Supabase Auth
    ↓
Backend fetches user data from KV store
    ↓
Returns user-specific data
```

---

## Testing

### Test Demo User Login
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-850156da/signin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "phone": "000006",
    "password": "321654"
  }'
```

### Test Profile Fetch
```bash
curl -X GET https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-850156da/profile \
  -H "Authorization: Bearer ACCESS_TOKEN_FROM_SIGNIN"
```

### Initialize Demo User
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-850156da/init \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## Production Deployment

### 1. Deploy Edge Function to Supabase

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
npx supabase login

# Link to your project
npx supabase link --project-ref YOUR_PROJECT_ID

# Deploy the function
npx supabase functions deploy make-server-850156da
```

### 2. Set Environment Variables

```bash
npx supabase secrets set SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
npx supabase secrets set SUPABASE_ANON_KEY=your_anon_key
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Enable Phone Authentication

1. Go to **Authentication** → **Providers** in Supabase Dashboard
2. Enable **Phone** provider
3. Configure SMS provider (Twilio, MessageBird, etc.)
4. Update phone auth settings

**Note:** For development, phone_confirm is auto-set to `true` to bypass SMS

### 4. Security Checklist

- ✅ Service role key stored as environment variable (never in code)
- ✅ Row Level Security (RLS) policies configured
- ✅ CORS properly configured
- ✅ Rate limiting enabled
- ✅ Phone number validation in place
- ✅ Password requirements enforced (6+ characters)

---

## Common Issues & Solutions

### Issue: "Invalid phone number format"
**Solution:** Ensure phone is in E.164 format: `+[country][number]`
```javascript
const fullPhone = `${countryCode}${phone}`.replace(/\s+/g, '');
// Example: "+2348012345678"
```

### Issue: "Unauthorized" on protected routes
**Solution:** Check that Authorization header is correctly set:
```javascript
headers: {
  'Authorization': `Bearer ${accessToken}`
}
```

### Issue: Demo user login fails
**Solution:** Run the init endpoint once to create demo user:
```bash
POST /init
```

### Issue: CORS errors
**Solution:** Edge function has CORS enabled. Check:
1. Function deployed correctly
2. Origin matches your domain
3. Request includes proper headers

---

## API Client Usage in Frontend

### Example: Sign In
```typescript
import { apiCall } from './utils/supabase/client';

const handleSignIn = async (phone: string, password: string) => {
  try {
    const data = await apiCall('/signin', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
    
    // Store access token
    localStorage.setItem('accessToken', data.accessToken);
    
    // Update user state
    setUser(data.user);
    
  } catch (error) {
    console.error('Sign in failed:', error.message);
  }
};
```

### Example: Update Profile
```typescript
import { apiCallWithAuth } from './utils/supabase/client';

const handleUpdateProfile = async (updates: Partial<User>) => {
  const accessToken = localStorage.getItem('accessToken');
  
  try {
    await apiCallWithAuth('/profile', accessToken, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    
    toast.success('Profile updated successfully!');
    
  } catch (error) {
    toast.error('Update failed: ' + error.message);
  }
};
```

---

## Monitoring & Logging

### View Edge Function Logs

1. Go to **Edge Functions** in Supabase Dashboard
2. Click on `make-server-850156da`
3. Click **Logs** tab
4. Filter by:
   - Time range
   - Log level (info, error, warn)
   - Search term

### Server-Side Logging

The function logs all requests and errors:
```typescript
// Request logging (via Hono logger)
app.use('*', logger(console.log));

// Error logging
console.error('Signin error:', error);
```

---

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Update project credentials in `/utils/supabase/info.tsx`
3. ✅ Deploy edge function
4. ✅ Set environment variables
5. ✅ Test demo user login
6. ✅ Enable phone authentication
7. ✅ Configure SMS provider for production

---

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Hono Docs**: https://hono.dev
- **Edge Functions Guide**: https://supabase.com/docs/guides/functions

---

## Change Log

- **v1.0** (Jan 2025) - Initial backend setup with phone authentication
- Demo user support (000006/321654)
- KV store for user and circle data
- Protected routes with JWT validation
