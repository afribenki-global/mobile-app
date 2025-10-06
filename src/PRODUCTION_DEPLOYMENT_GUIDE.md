# AfriBenki v2.7.0 - Production Deployment Guide

## 🎉 Production-Ready Features

AfriBenki v2.7.0 is now fully production-ready with the following major updates:

### ✅ New in v2.7.0

1. **Updated Splash Screen** - New professional logo integrated
2. **Full Database Integration** - Supabase backend with comprehensive schema
3. **Removed Demo Constraints** - No more demo account info on login
4. **Background Location Detection** - Seamless user experience without detection screen
5. **External LLM Support** - AI Advisor can connect to OpenAI, Claude, or any LLM API
6. **Production-Grade Endpoints** - Complete REST API for all features

---

## Pre-Deployment Checklist

### 1. Environment Setup

Ensure you have access to:
- [ ] Supabase project (with admin credentials)
- [ ] Production domain/hosting
- [ ] Email service (optional, for notifications)
- [ ] SMS service (optional, for phone verification)
- [ ] LLM API key (optional, for AI advisor)
- [ ] Payment gateway credentials (for top-ups/withdrawals)

### 2. Supabase Configuration

#### Edge Functions Deployment

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy edge functions
supabase functions deploy make-server-850156da
```

#### Set Environment Variables

Navigate to: **Supabase Dashboard > Settings > Edge Functions > Secrets**

Required secrets:
```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Optional secrets (for AI Advisor):
```bash
EXTERNAL_LLM_API_URL=https://api.openai.com/v1/chat/completions
EXTERNAL_LLM_API_KEY=sk-your-api-key
```

### 3. Frontend Configuration

Update environment variables in your hosting platform:

```bash
VITE_SUPABASE_PROJECT_ID=your-project-ref
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Initialization

The database schema is automatically initialized when users sign up. However, you can pre-populate:

#### Create Demo User (Optional)

```bash
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/make-server-850156da/init \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

This creates a demo user with phone: `000006` and password: `321654`

---

## Deployment Steps

### Step 1: Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build
npm run preview
```

### Step 2: Deploy Frontend

#### Option A: Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Option B: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Option C: AWS Amplify
Upload the `dist` folder to AWS Amplify Console

### Step 3: Configure Domain & SSL

1. Point your domain to the hosting provider
2. Enable SSL (most providers offer free Let's Encrypt SSL)
3. Configure CORS in Supabase if needed

### Step 4: Test Production Environment

Run through this testing checklist:

#### Authentication Tests
- [ ] New user signup works
- [ ] User login works
- [ ] Phone number validation works
- [ ] Password reset works (if implemented)

#### Wallet Tests
- [ ] Top-up functionality works
- [ ] Withdrawal functionality works
- [ ] Balance updates correctly

#### Investment Tests
- [ ] Can create new investments
- [ ] Investment data persists
- [ ] Portfolio value updates

#### Savings Tests
- [ ] Can create savings plans
- [ ] Can contribute to savings
- [ ] Progress tracking works

#### AI Advisor Tests
- [ ] Built-in responses work
- [ ] External LLM integration works (if configured)
- [ ] Context awareness is accurate

---

## Post-Deployment Configuration

### 1. Enable Phone Authentication (Recommended)

For production phone authentication:

1. Go to **Supabase Dashboard > Authentication > Providers**
2. Enable **Phone** provider
3. Configure SMS provider:
   - **Twilio** (recommended)
   - **MessageBird**
   - **Vonage**

Example Twilio setup:
```bash
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 2. Enable Email Notifications (Optional)

1. Go to **Supabase Dashboard > Settings > Auth > Email Templates**
2. Customize templates
3. Configure SMTP:
   - **SendGrid** (recommended)
   - **Mailgun**
   - **AWS SES**

### 3. Set Up Payment Gateway

For real money transactions, integrate:

#### Paystack (Africa)
```typescript
// In your topup/withdrawal endpoints
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

// Initialize transaction
const response = await paystack.transaction.initialize({
  email: user.email,
  amount: amount * 100, // in kobo
  callback_url: 'https://yourapp.com/payment/callback',
});
```

#### Flutterwave (Africa)
```typescript
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const payload = {
  amount: amount,
  currency: 'NGN',
  redirect_url: 'https://yourapp.com/payment/callback',
  payment_options: 'card,banktransfer,ussd',
  customer: {
    email: user.email,
    phonenumber: user.phone,
    name: user.name,
  },
};
```

### 4. Configure External LLM (Optional)

See [EXTERNAL_LLM_SETUP.md](./EXTERNAL_LLM_SETUP.md) for detailed instructions.

Quick setup for OpenAI:
```bash
# In Supabase Edge Functions Secrets
EXTERNAL_LLM_API_URL=https://api.openai.com/v1/chat/completions
EXTERNAL_LLM_API_KEY=sk-proj-...
```

---

## Monitoring & Analytics

### 1. Set Up Error Tracking

#### Sentry Integration
```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

### 2. Set Up Analytics

#### Google Analytics
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Mixpanel (Recommended for fintech)
```bash
npm install mixpanel-browser
```

```typescript
import mixpanel from 'mixpanel-browser';

mixpanel.init('YOUR_PROJECT_TOKEN');

// Track events
mixpanel.track('User Signed Up', {
  source: 'organic',
  country: 'NG',
});
```

### 3. Monitor Supabase

1. **Dashboard Metrics** - Monitor API usage, errors, and performance
2. **Set Up Alerts** - Configure alerts for high error rates
3. **Database Monitoring** - Track database size and query performance

---

## Security Hardening

### 1. Implement Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// In edge functions
const rateLimit = new Map();

app.use(async (c, next) => {
  const ip = c.req.header('cf-connecting-ip') || 'unknown';
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  
  // Filter requests from last minute
  const recentRequests = userRequests.filter(time => now - time < 60000);
  
  if (recentRequests.length > 60) {
    return c.json({ error: 'Rate limit exceeded' }, 429);
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  
  await next();
});
```

### 2. Enable 2FA (Future Enhancement)

### 3. Regular Security Audits

Schedule monthly security reviews:
- [ ] Check for exposed API keys
- [ ] Review authentication logs
- [ ] Update dependencies
- [ ] Test backup restoration

---

## Backup & Disaster Recovery

### 1. Database Backups

Supabase provides automatic daily backups. For additional safety:

```bash
# Weekly manual backup
supabase db dump > backup_$(date +%Y%m%d).sql

# Store in S3/Google Cloud Storage
aws s3 cp backup_$(date +%Y%m%d).sql s3://your-bucket/backups/
```

### 2. Code Backups

Ensure code is:
- [ ] Committed to Git
- [ ] Pushed to remote repository (GitHub, GitLab, Bitbucket)
- [ ] Tagged with version numbers

### 3. Recovery Plan

Document your recovery process:
1. Restore database from backup
2. Redeploy edge functions
3. Redeploy frontend
4. Test critical paths
5. Notify users of any downtime

---

## Performance Optimization

### 1. Enable Caching

Configure caching headers:

```typescript
// In edge functions
app.get('/make-server-850156da/profile', async (c) => {
  // ... your code
  
  return c.json(data, {
    headers: {
      'Cache-Control': 'private, max-age=300', // Cache for 5 minutes
    },
  });
});
```

### 2. Image Optimization

Use CDN for images:
- Cloudinary
- ImageKit
- AWS CloudFront

### 3. Code Splitting

Already implemented with React lazy loading. Ensure it's working:

```bash
# Check bundle size
npm run build -- --stats

# Analyze bundle
npx vite-bundle-visualizer
```

---

## Compliance & Legal

### 1. Privacy Policy

Update privacy policy to reflect:
- Data collection practices
- Third-party services used
- User rights under GDPR/CCPA
- Cookie usage

### 2. Terms of Service

Ensure terms cover:
- User responsibilities
- Liability limitations
- Dispute resolution
- Governing law

### 3. Financial Regulations

Consult with legal counsel for:
- Money transmission licenses
- KYC/AML compliance
- Securities regulations (for investments)
- Data protection laws

---

## Support & Maintenance

### 1. Set Up Support Channels

- **Email:** support@afribenki.com
- **In-app chat:** Consider Intercom or Crisp
- **Phone:** For high-value customers

### 2. Create Runbooks

Document common issues:
- User cannot log in → Check auth logs
- Payment failed → Check payment gateway status
- App is slow → Check Supabase performance

### 3. Schedule Maintenance Windows

Plan for:
- Database optimizations (monthly)
- Dependency updates (monthly)
- Security patches (as needed)
- Feature deployments (bi-weekly)

---

## Launch Checklist

Before announcing your launch:

- [ ] All tests passing
- [ ] Production environment fully configured
- [ ] Payment gateway in live mode
- [ ] Phone/email verification working
- [ ] Error tracking active
- [ ] Analytics tracking events
- [ ] Backups configured
- [ ] Security hardening complete
- [ ] Legal pages published
- [ ] Support channels ready
- [ ] Marketing materials prepared
- [ ] App store submissions (if mobile)

---

## Post-Launch Monitoring

First 24 hours:
- [ ] Monitor error rates every hour
- [ ] Check signup conversion rates
- [ ] Verify payment transactions
- [ ] Monitor server response times
- [ ] Check user feedback

First week:
- [ ] Daily metrics review
- [ ] User feedback analysis
- [ ] Performance optimization
- [ ] Bug fixes deployment

First month:
- [ ] Feature usage analysis
- [ ] User retention tracking
- [ ] Revenue metrics
- [ ] Plan next iteration

---

## Scaling Considerations

As your user base grows:

### Database Scaling
- Enable connection pooling
- Add read replicas
- Implement database sharding (if needed)

### Server Scaling
- Use Supabase edge functions auto-scaling
- Consider dedicated servers for high traffic
- Implement CDN for static assets

### Cost Optimization
- Monitor Supabase usage
- Optimize API calls
- Implement caching strategies
- Review LLM costs (if using external)

---

## Support Resources

- **Documentation:** [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- **LLM Setup:** [EXTERNAL_LLM_SETUP.md](./EXTERNAL_LLM_SETUP.md)
- **API Reference:** [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)
- **Supabase Docs:** https://supabase.com/docs
- **Community:** Create a Discord/Slack for users

---

## Version History

- **v2.7.0** (January 2025) - Production-ready release with database integration
- **v2.6.0** (October 2025) - Navigation restructure and wallet updates
- **v2.5.0** - Feature completions and QA
- **v2.0.0** - Initial comprehensive build

---

**Congratulations on reaching production! 🎉**

For questions or support with deployment, refer to the documentation or create an issue in your project repository.

---

*Last Updated: January 2025*
