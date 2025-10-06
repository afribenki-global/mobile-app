# AfriBenki API Quick Reference Card

**Base URL**: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-850156da`

---

## Authentication

### Demo User Login
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-850156da/signin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"phone":"000006","password":"321654"}'
```

**Response**:
```json
{
  "accessToken": "jwt-token-here",
  "user": { "id": "...", "balance": 125000, "portfolioValue": 485000 }
}
```

---

## Quick Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/health` | No | Health check |
| POST | `/init` | No | Create demo user |
| POST | `/signup` | No | Register new user |
| POST | `/signin` | No | Login (get token) |
| GET | `/profile` | Yes | Get user data |
| PUT | `/profile` | Yes | Update user |
| GET | `/circles` | No | List circles |
| POST | `/circles` | Yes | Create circle |

---

## Usage Examples

### Sign Up New User
```javascript
const response = await fetch(`${API_BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ANON_KEY}`
  },
  body: JSON.stringify({
    phone: '1234567890',
    password: 'secure123',
    name: 'John Doe',
    email: 'john@example.com',
    countryCode: '+234'
  })
});
```

### Get User Profile (Protected)
```javascript
const accessToken = localStorage.getItem('accessToken');
const response = await fetch(`${API_BASE_URL}/profile`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### Update Balance
```javascript
const accessToken = localStorage.getItem('accessToken');
const response = await fetch(`${API_BASE_URL}/profile`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    balance: 150000,
    portfolioValue: 500000,
    savings: 250000
  })
});
```

---

## Environment Setup

```bash
# Required in Supabase Edge Function Secrets
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Testing Checklist

- [ ] Health check returns `{"status":"ok"}`
- [ ] Demo user can sign in (000006/321654)
- [ ] New user can sign up
- [ ] Profile endpoint requires auth token
- [ ] Profile can be updated with valid token
- [ ] Invalid token returns 401 Unauthorized

---

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid phone number format` | Phone not in E.164 | Use format: `+[country][number]` |
| `Unauthorized` | Missing/invalid token | Check Authorization header |
| `Signin failed` | Wrong credentials | Verify phone/password |
| `CORS error` | Origin not allowed | Check CORS config in function |

---

## Demo Credentials

**Phone**: `000006`  
**Password**: `321654`  
**Email**: `demo@afribenki.app`  

**Initial Balances**:
- Wallet: ₦125,000
- Portfolio: ₦485,000
- Savings: ₦200,000

---

## Helper Functions (Frontend)

```typescript
// Simple API call
import { apiCall } from './utils/supabase/client';
const data = await apiCall('/signin', {
  method: 'POST',
  body: JSON.stringify({ phone, password })
});

// Authenticated API call
import { apiCallWithAuth } from './utils/supabase/client';
const token = localStorage.getItem('accessToken');
const data = await apiCallWithAuth('/profile', token, {
  method: 'GET'
});
```

---

## Deployment

```bash
# 1. Deploy function
npx supabase functions deploy make-server-850156da

# 2. Set secrets
npx supabase secrets set SUPABASE_URL=https://xxx.supabase.co
npx supabase secrets set SUPABASE_ANON_KEY=xxx
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=xxx

# 3. Test
curl https://xxx.supabase.co/functions/v1/make-server-850156da/health
```

---

**Full Documentation**: See `BACKEND_SETUP_GUIDE.md`
