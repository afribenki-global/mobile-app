# AfriBenki Database Schema Documentation

## Overview

AfriBenki uses Supabase's Key-Value Store for flexible, production-ready data storage. This document outlines the complete database schema, data models, and relationships.

## Architecture

```
┌─────────────────┐
│  Supabase Auth  │ ← User Authentication
└────────┬────────┘
         │
         v
┌─────────────────┐
│   KV Store      │ ← All Application Data
│  (PostgreSQL)   │
└─────────────────┘
```

## Data Models

### 1. User Profile

**Key Pattern:** `user:{userId}`

**Schema:**
```typescript
{
  id: string;                    // Supabase Auth User ID
  phone: string;                  // E.164 format: +234XXXXXXXXX
  name: string;
  email?: string | null;
  username?: string;              // Optional username
  balance: number;                // Current wallet balance
  portfolioValue: number;         // Total investment value
  savings: number;                // Total savings amount
  onboardingComplete: boolean;    // Has completed onboarding
  profilePicture?: string | null; // URL to profile image
  currency?: string;              // Preferred currency (NGN, GHS, KES, etc.)
  language?: string;              // Preferred language (en, fr, sw, ar)
  country?: string;               // Country code (NG, GH, KE, etc.)
  createdAt: string;              // ISO 8601 timestamp
  updatedAt?: string;             // ISO 8601 timestamp
}
```

**Example:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "phone": "+2348012345678",
  "name": "John Doe",
  "email": "john@example.com",
  "balance": 125000,
  "portfolioValue": 485000,
  "savings": 200000,
  "onboardingComplete": true,
  "profilePicture": null,
  "currency": "NGN",
  "language": "en",
  "country": "NG",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### 2. Investment

**Key Pattern:** `investment:{userId}:{timestamp}`

**Schema:**
```typescript
{
  id: string;                     // Full key: investment:userId:timestamp
  userId: string;                 // Reference to user
  name: string;                   // Investment name (e.g., "Stanbic Money Market Fund")
  type: string;                   // Type: mutual_fund, stock, bond, crypto
  amount: number;                 // Investment amount
  units?: number;                 // Number of units/shares
  pricePerUnit?: number;          // Purchase price per unit
  currentValue: number;           // Current market value
  returnRate: number;             // Expected/actual return rate (%)
  status: string;                 // Status: active, sold, matured
  category?: string;              // Category: money_market, equity, fixed_income, etc.
  riskLevel?: string;             // Risk: low, medium, high
  maturityDate?: string;          // For bonds/fixed deposits
  createdAt: string;              // ISO 8601 timestamp
  updatedAt?: string;             // ISO 8601 timestamp
}
```

**Example:**
```json
{
  "id": "investment:a1b2c3d4:1705318200000",
  "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Stanbic Money Market Fund",
  "type": "mutual_fund",
  "amount": 50000,
  "units": 5000,
  "pricePerUnit": 10,
  "currentValue": 53500,
  "returnRate": 12.5,
  "status": "active",
  "category": "money_market",
  "riskLevel": "low",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### 3. Savings Plan

**Key Pattern:** `savings:{userId}:{timestamp}`

**Schema:**
```typescript
{
  id: string;                     // Full key: savings:userId:timestamp
  userId: string;                 // Reference to user
  name: string;                   // Plan name (e.g., "Emergency Fund")
  goal: number;                   // Target amount
  currentAmount: number;          // Current saved amount
  frequency: string;              // Contribution frequency: daily, weekly, monthly
  autoDebit: boolean;             // Auto-debit enabled
  startDate: string;              // ISO 8601 timestamp
  endDate?: string;               // Target completion date
  status: string;                 // Status: active, completed, paused
  interest?: number;              // Interest rate if applicable
  icon?: string;                  // Icon identifier
  color?: string;                 // Color code for UI
  createdAt: string;              // ISO 8601 timestamp
  updatedAt?: string;             // ISO 8601 timestamp
}
```

**Example:**
```json
{
  "id": "savings:a1b2c3d4:1705318200000",
  "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Emergency Fund",
  "goal": 300000,
  "currentAmount": 150000,
  "frequency": "monthly",
  "autoDebit": true,
  "startDate": "2025-01-01T00:00:00Z",
  "endDate": "2025-12-31T23:59:59Z",
  "status": "active",
  "interest": 8.5,
  "icon": "shield",
  "color": "#00A676",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### 4. Transaction

**Key Pattern:** `transaction:{userId}:{timestamp}`

**Schema:**
```typescript
{
  id: string;                     // Full key: transaction:userId:timestamp
  userId: string;                 // Reference to user
  type: string;                   // Type: topup, withdrawal, transfer, investment, savings
  amount: number;                 // Transaction amount
  method?: string;                // Payment method: card, bank_transfer, mobile_money
  status: string;                 // Status: pending, processing, completed, failed
  reference?: string;             // External transaction reference
  accountDetails?: object;        // Account details for withdrawals
  description?: string;           // Transaction description
  fee?: number;                   // Transaction fee
  timestamp: string;              // ISO 8601 timestamp
}
```

**Example:**
```json
{
  "id": "transaction:a1b2c3d4:1705318200000",
  "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "type": "topup",
  "amount": 50000,
  "method": "bank_transfer",
  "status": "completed",
  "reference": "TXN123456789",
  "description": "Wallet Top-up via Bank Transfer",
  "fee": 0,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 5. Activity

**Key Pattern:** `activity:{userId}:{timestamp}`

**Schema:**
```typescript
{
  id: string;                     // Full key: activity:userId:timestamp
  userId: string;                 // Reference to user
  type: string;                   // Type: topup, withdrawal, investment, savings, transfer, circle
  title: string;                  // Activity title
  amount?: number;                // Amount (if applicable)
  category: string;               // Category: wallet, investment, savings, circle
  description?: string;           // Additional details
  metadata?: object;              // Additional metadata
  timestamp: string;              // ISO 8601 timestamp
}
```

**Example:**
```json
{
  "id": "activity:a1b2c3d4:1705318200000",
  "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "type": "investment",
  "title": "Invested in Stanbic Money Market Fund",
  "amount": 50000,
  "category": "investment",
  "description": "New investment in money market fund",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 6. Circle (Savings Group)

**Key Pattern:** `circle:{timestamp}`

**Schema:**
```typescript
{
  id: string;                     // Full key: circle:timestamp
  name: string;                   // Circle name
  description: string;            // Circle description
  creatorId: string;              // User ID of creator
  members: string[];              // Array of user IDs
  goal: number;                   // Total goal amount
  currentAmount: number;          // Current saved amount
  contributionAmount: number;     // Required contribution per cycle
  frequency: string;              // Contribution frequency: daily, weekly, monthly
  memberLimit?: number;           // Maximum members
  isPrivate: boolean;             // Private or public circle
  status: string;                 // Status: active, completed, archived
  icon?: string;                  // Icon identifier
  coverImage?: string;            // Cover image URL
  createdAt: string;              // ISO 8601 timestamp
  updatedAt?: string;             // ISO 8601 timestamp
}
```

**Example:**
```json
{
  "id": "circle:1705318200000",
  "name": "Wedding Planning Circle",
  "description": "Saving together for Sarah's wedding",
  "creatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "members": ["a1b2c3d4...", "b2c3d4e5...", "c3d4e5f6..."],
  "goal": 1000000,
  "currentAmount": 450000,
  "contributionAmount": 50000,
  "frequency": "monthly",
  "memberLimit": 10,
  "isPrivate": false,
  "status": "active",
  "icon": "heart",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### 7. Circle Contribution

**Key Pattern:** `circle-contribution:{circleId}:{userId}:{timestamp}`

**Schema:**
```typescript
{
  id: string;                     // Full key
  circleId: string;               // Reference to circle
  userId: string;                 // Reference to user
  amount: number;                 // Contribution amount
  timestamp: string;              // ISO 8601 timestamp
}
```

### 8. Circle Message

**Key Pattern:** `circle-message:{circleId}:{timestamp}`

**Schema:**
```typescript
{
  id: string;                     // Full key
  circleId: string;               // Reference to circle
  userId: string;                 // Message sender
  userName: string;               // Sender's name
  message: string;                // Message content
  type?: string;                  // Message type: text, system
  timestamp: string;              // ISO 8601 timestamp
}
```

### 9. Notification

**Key Pattern:** `notification:{userId}:{timestamp}`

**Schema:**
```typescript
{
  id: string;                     // Full key
  userId: string;                 // Reference to user
  title: string;                  // Notification title
  message: string;                // Notification message
  type: string;                   // Type: info, success, warning, error
  category: string;               // Category: wallet, investment, savings, circle, system
  read: boolean;                  // Read status
  actionUrl?: string;             // Deep link to related screen
  metadata?: object;              // Additional data
  timestamp: string;              // ISO 8601 timestamp
}
```

## API Endpoints Reference

### Authentication
- `POST /make-server-850156da/signup` - Create new user
- `POST /make-server-850156da/signin` - User login
- `GET /make-server-850156da/profile` - Get user profile (protected)
- `PUT /make-server-850156da/profile` - Update user profile (protected)

### Wallet & Transactions
- `POST /make-server-850156da/topup` - Top-up wallet (protected)
- `POST /make-server-850156da/withdraw` - Withdraw funds (protected)
- `GET /make-server-850156da/transactions` - Get transaction history (protected)

### Investments
- `GET /make-server-850156da/investments` - Get user investments (protected)
- `POST /make-server-850156da/investments` - Create investment (protected)

### Savings Plans
- `GET /make-server-850156da/savings-plans` - Get savings plans (protected)
- `POST /make-server-850156da/savings-plans` - Create savings plan (protected)
- `POST /make-server-850156da/savings-plans/:id/contribute` - Add to savings (protected)

### Circles
- `GET /make-server-850156da/circles` - Get all circles
- `POST /make-server-850156da/circles` - Create circle (protected)

### Activities
- `GET /make-server-850156da/activities` - Get user activities (protected)

### AI Chat
- `POST /make-server-850156da/ai-chat` - Send message to AI advisor (protected)

## Data Relationships

```
User
├── Has Many → Investments
├── Has Many → Savings Plans
├── Has Many → Transactions
├── Has Many → Activities
├── Has Many → Notifications
└── Belongs to Many → Circles

Circle
├── Has Many → Members (Users)
├── Has Many → Contributions
└── Has Many → Messages

Investment
├── Belongs to → User
└── Generates → Activities

Savings Plan
├── Belongs to → User
└── Generates → Activities

Transaction
├── Belongs to → User
└── Generates → Activity
```

## Query Patterns

### Get All User Investments
```typescript
const investments = await kv.getByPrefix(`investment:${userId}:`);
```

### Get All User Savings Plans
```typescript
const savingsPlans = await kv.getByPrefix(`savings:${userId}:`);
```

### Get Recent Activities (Last 10)
```typescript
const activities = await kv.getByPrefix(`activity:${userId}:`);
const recent = activities
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  .slice(0, 10);
```

### Get User's Circles
```typescript
const allCircles = await kv.getByPrefix('circle:');
const userCircles = allCircles.filter(circle => 
  circle.members.includes(userId)
);
```

## Data Migration Strategy

When migrating from demo/mock data to production:

1. **Export existing mock data structure**
2. **Create migration scripts** for each data model
3. **Validate data integrity** before migration
4. **Run migrations** in staging environment first
5. **Monitor** for any issues

## Backup & Recovery

### Automated Backups
Supabase provides automatic daily backups. For additional safety:

1. Export critical data weekly
2. Store backups in external storage (S3, Google Cloud Storage)
3. Test recovery procedures monthly

### Manual Backup
```typescript
// Export all user data
const allUsers = await kv.getByPrefix('user:');
const allInvestments = await kv.getByPrefix('investment:');
const allSavings = await kv.getByPrefix('savings:');
// ... etc

const backup = {
  users: allUsers,
  investments: allInvestments,
  savings: allSavings,
  timestamp: new Date().toISOString()
};

// Save to file or external storage
```

## Performance Optimization

### Indexing Strategy
The KV store uses prefixed keys for efficient queries:
- Prefix queries are O(log n) complexity
- User-specific data is isolated by userId
- Time-based data uses timestamps for chronological sorting

### Caching Recommendations
1. Cache user profile data in app state
2. Cache recent activities for quick display
3. Invalidate cache on data updates

### Pagination
For large datasets:
```typescript
// Get activities with pagination
const activities = await kv.getByPrefix(`activity:${userId}:`);
const page = 1;
const pageSize = 20;
const paginatedActivities = activities
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  .slice((page - 1) * pageSize, page * pageSize);
```

## Security Considerations

1. **User Isolation:** All user data is prefixed with userId
2. **Authorization:** Server validates user ID from auth token
3. **Data Validation:** Server validates all inputs before storage
4. **Sensitive Data:** Never store plain passwords or full card numbers
5. **Audit Trail:** All transactions and activities are logged with timestamps

---

**Last Updated:** January 2025  
**Version:** 1.0.0
