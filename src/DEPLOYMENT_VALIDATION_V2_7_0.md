# Deployment Validation Checklist - AfriBenki v2.7.0

## 📋 Pre-Deployment Validation

Run through this checklist before deploying to production.

---

## 🎨 UI/UX Validation

### Splash Screen
- [ ] New AfriBenki logo displays correctly
- [ ] No white background around logo
- [ ] Logo is properly sized and centered
- [ ] Tagline "Save smarter, invest better" is visible
- [ ] Loading animation completes smoothly
- [ ] Transitions to welcome screen after ~2 seconds

### Welcome Screen
- [ ] Get Started button navigates to Sign Up (NOT country detection)
- [ ] Sign In button navigates to Sign In screen
- [ ] All feature cards display properly
- [ ] African pattern background renders correctly

### Sign Up Screen
- [ ] No "Detected in Ghana" banner visible
- [ ] No country/broker messaging displayed
- [ ] Phone number input is clean and simple
- [ ] Country selector works for all countries
- [ ] Form validation works correctly
- [ ] Successful signup navigates directly to dashboard
- [ ] Error messages display for invalid input

### Sign In Screen
- [ ] No demo account information banner
- [ ] No "Quick Fill Demo Credentials" button
- [ ] Form starts with empty fields
- [ ] Phone number and password validation works
- [ ] Successful login navigates to dashboard
- [ ] Error messages display for incorrect credentials
- [ ] Demo account (000006/321654) still works when manually entered

### Dashboard (After Signup)
- [ ] User lands directly on home screen
- [ ] OnboardingBanner appears for new users
- [ ] User data displays correctly
- [ ] Balance shows correct initial value
- [ ] Quick actions are functional
- [ ] Bottom navigation works

---

## 🗄️ Database Validation

### User Creation
- [ ] New user signup creates record in database
- [ ] User ID is generated from Supabase Auth
- [ ] Phone number stored in E.164 format
- [ ] Initial balances set correctly (0 for new users)
- [ ] User profile retrievable via `/profile` endpoint
- [ ] User can login after signup

### Data Persistence
- [ ] User data persists between sessions
- [ ] Access token stored in localStorage
- [ ] User auto-logged in on app reload
- [ ] Profile updates save to database
- [ ] Balance updates reflect immediately

### Investments
- [ ] Can create investment via API
- [ ] Investment deducts from wallet balance
- [ ] Investment adds to portfolio value
- [ ] Activity record created for investment
- [ ] Investment retrievable via `/investments` endpoint

### Savings Plans
- [ ] Can create savings plan via API
- [ ] Contribution deducts from balance
- [ ] Contribution adds to savings total
- [ ] Activity record created for contribution
- [ ] Savings plan retrievable via `/savings-plans` endpoint

### Transactions
- [ ] Top-up creates transaction record
- [ ] Top-up increases wallet balance
- [ ] Withdrawal creates transaction record
- [ ] Withdrawal decreases wallet balance
- [ ] Transaction history retrievable via `/transactions` endpoint

### Activities
- [ ] All user actions create activity records
- [ ] Activities retrievable via `/activities` endpoint
- [ ] Activities display in correct chronological order
- [ ] Activity types are correctly categorized

---

## 🔐 Authentication Validation

### Signup Flow
- [ ] Phone number validation works (E.164 format)
- [ ] Password minimum length enforced (6 characters)
- [ ] Email validation works
- [ ] Duplicate phone numbers rejected
- [ ] Terms and conditions checkbox required
- [ ] User created in Supabase Auth
- [ ] User data created in KV store
- [ ] Access token returned and stored

### Login Flow
- [ ] Valid credentials allow login
- [ ] Invalid credentials show error
- [ ] Demo account works (000006/321654)
- [ ] Access token returned and stored
- [ ] User redirected to dashboard
- [ ] User session persists

### Protected Routes
- [ ] `/profile` requires authentication
- [ ] `/investments` requires authentication
- [ ] `/savings-plans` requires authentication
- [ ] `/transactions` requires authentication
- [ ] `/topup` requires authentication
- [ ] `/withdraw` requires authentication
- [ ] Unauthorized requests return 401

### Session Management
- [ ] User stays logged in on page refresh
- [ ] Access token validated on each request
- [ ] Invalid tokens return 401
- [ ] User can logout and login again

---

## 🤖 AI Advisor Validation

### Built-in Responses
- [ ] AI chat button appears on all screens
- [ ] Chat opens when clicked
- [ ] Built-in responses work without LLM configured
- [ ] Navigation commands work (e.g., "show dashboard")
- [ ] Context-aware responses based on user data
- [ ] Skill level detection works (beginner/intermediate/advanced)
- [ ] Multi-language support works (English/French)

### External LLM (If Configured)
- [ ] LLM API URL environment variable set
- [ ] LLM API key environment variable set
- [ ] External LLM receives requests
- [ ] User context passed to LLM correctly
- [ ] LLM responses display in chat
- [ ] Fallback to built-in if LLM fails
- [ ] Response source indicated (external_llm/builtin/error)

### AI Context Awareness
- [ ] AI knows current user balance
- [ ] AI knows portfolio value
- [ ] AI knows recent activities
- [ ] AI knows current screen
- [ ] AI provides personalized advice

---

## 🌍 Location Detection Validation

### Background Detection
- [ ] No country detection screen appears
- [ ] Geolocation permission requested silently
- [ ] Detection runs in background during app init
- [ ] Default country set if detection fails
- [ ] User can manually select country in signup
- [ ] Detection doesn't block user flow

---

## 📱 Wallet & Transactions Validation

### Top-up
- [ ] Top-up screen accessible from wallet
- [ ] Minimum amount enforced (1000)
- [ ] Balance increases after top-up
- [ ] Transaction record created
- [ ] Activity record created
- [ ] Success notification shown

### Withdrawal
- [ ] Withdrawal screen accessible from wallet
- [ ] Minimum amount enforced (1000)
- [ ] Insufficient balance check works
- [ ] Balance decreases after withdrawal
- [ ] Transaction record created
- [ ] Activity record created
- [ ] Success notification shown

### Transaction History
- [ ] All transactions listed chronologically
- [ ] Transaction types correctly displayed
- [ ] Amounts formatted correctly
- [ ] Filter by type works
- [ ] Search functionality works

---

## 🎯 Investment Validation

### Creating Investment
- [ ] Investment creation form works
- [ ] Amount validation works
- [ ] Insufficient balance check works
- [ ] Investment types selectable
- [ ] Investment created in database
- [ ] Balance deducted correctly
- [ ] Portfolio value increased
- [ ] Activity logged
- [ ] Success modal shown

### Viewing Investments
- [ ] All investments listed
- [ ] Current values calculated correctly
- [ ] Return rates displayed
- [ ] Status indicators work
- [ ] Investment details accessible

---

## 💰 Savings Validation

### Creating Savings Plan
- [ ] Savings plan creation form works
- [ ] Goal amount validation works
- [ ] Frequency selection works
- [ ] Plan created in database
- [ ] Plan appears in savings list
- [ ] Success notification shown

### Contributing to Savings
- [ ] Contribution form works
- [ ] Amount validation works
- [ ] Insufficient balance check works
- [ ] Balance deducted correctly
- [ ] Savings total increased
- [ ] Progress bar updates
- [ ] Activity logged
- [ ] Success notification shown

---

## 👥 Circles Validation

### Viewing Circles
- [ ] All circles listed
- [ ] Public circles visible
- [ ] Private circles for members only
- [ ] Circle details accessible

### Creating Circle
- [ ] Circle creation form works
- [ ] All fields validated
- [ ] Circle created in database
- [ ] Creator added as member
- [ ] Success notification shown

---

## 🌐 Multi-Currency Validation

### Currency Support
- [ ] NGN (Nigerian Naira) works
- [ ] GHS (Ghanaian Cedi) works
- [ ] KES (Kenyan Shilling) works
- [ ] XAF (Central African CFA Franc) works
- [ ] USD (US Dollar) works
- [ ] Currency symbols display correctly
- [ ] Amounts formatted per currency

### Currency Selection
- [ ] User can select currency in settings
- [ ] Currency persists across sessions
- [ ] All amounts update to selected currency
- [ ] Currency change reflected immediately

---

## 🗣️ Multi-Language Validation

### Language Support
- [ ] English (en) works
- [ ] French (fr) works
- [ ] Swahili (sw) works (if implemented)
- [ ] Arabic (ar) works with RTL (if implemented)

### Language Selection
- [ ] User can select language in settings
- [ ] Language persists across sessions
- [ ] All UI text updates to selected language
- [ ] AI advisor responds in selected language

---

## 🔔 Notifications Validation

### Onboarding Banner
- [ ] Banner shows for incomplete profiles
- [ ] "Complete Profile" CTA works
- [ ] Banner dismissible
- [ ] Banner doesn't show for completed profiles

### Activity Notifications
- [ ] Success messages show after actions
- [ ] Error messages show on failures
- [ ] Toast notifications styled correctly
- [ ] Multiple notifications stack properly

---

## 📊 Performance Validation

### Load Times
- [ ] Splash screen loads < 2 seconds
- [ ] Dashboard loads < 3 seconds
- [ ] API responses < 1 second
- [ ] Images load progressively
- [ ] No visible layout shifts

### Responsiveness
- [ ] Mobile (320px-480px) looks good
- [ ] Tablet (768px-1024px) looks good
- [ ] Desktop (1280px+) looks good
- [ ] Touch targets > 44px
- [ ] Safe areas respected on notched devices

### Database Performance
- [ ] Queries return < 500ms
- [ ] Bulk operations complete < 2 seconds
- [ ] No database connection errors
- [ ] Concurrent users handled well

---

## 🔒 Security Validation

### Authentication Security
- [ ] Passwords never logged
- [ ] Access tokens not exposed in URLs
- [ ] Session tokens stored securely
- [ ] HTTPS enforced
- [ ] CORS properly configured

### Data Security
- [ ] User data isolated by userId
- [ ] No cross-user data leakage
- [ ] SQL injection prevented
- [ ] XSS attacks prevented
- [ ] CSRF protection enabled

### API Security
- [ ] All protected routes require auth
- [ ] Invalid tokens rejected
- [ ] Rate limiting works
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak data

---

## 📚 Documentation Validation

### Completeness
- [ ] README.md exists and comprehensive
- [ ] DATABASE_SCHEMA.md complete
- [ ] EXTERNAL_LLM_SETUP.md detailed
- [ ] PRODUCTION_DEPLOYMENT_GUIDE.md thorough
- [ ] CHANGELOG_V2_7_0.md accurate
- [ ] API documentation available

### Accuracy
- [ ] Code examples work
- [ ] Environment variables correct
- [ ] API endpoints match implementation
- [ ] Database schema matches code
- [ ] Deployment steps are current

---

## 🚀 Deployment Validation

### Build Process
- [ ] `npm run build` completes without errors
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Bundle size reasonable (< 5MB)
- [ ] Source maps generated

### Environment Setup
- [ ] All environment variables set
- [ ] Supabase project configured
- [ ] Edge functions deployed
- [ ] Database initialized
- [ ] CORS configured

### Production Testing
- [ ] App accessible at production URL
- [ ] SSL certificate valid
- [ ] All assets loading
- [ ] API endpoints reachable
- [ ] Database connections working
- [ ] Error tracking active
- [ ] Analytics tracking events

---

## 🎯 Critical Path Testing

### New User Flow
1. [ ] Open app → See splash screen with new logo
2. [ ] Click "Get Started" → Go to Sign Up (skip detection)
3. [ ] Fill signup form → No country banner shown
4. [ ] Submit form → Account created in database
5. [ ] Redirected to dashboard → See OnboardingBanner
6. [ ] Can use app immediately

### Existing User Flow
1. [ ] Open app → See splash screen
2. [ ] Auto-login if token exists → Go to dashboard
3. [ ] Or click "Sign In" → Clean login form
4. [ ] Enter credentials → Login successful
5. [ ] Access all features

### Investment Flow
1. [ ] Navigate to Invest screen
2. [ ] Select investment product
3. [ ] Enter amount
4. [ ] Confirm investment
5. [ ] Balance deducted
6. [ ] Investment shows in portfolio
7. [ ] Activity logged

### Savings Flow
1. [ ] Navigate to Save screen
2. [ ] Create savings plan
3. [ ] Set goal and frequency
4. [ ] Contribute to plan
5. [ ] Balance deducted
6. [ ] Progress updated
7. [ ] Activity logged

### AI Advisor Flow
1. [ ] Click AI chat button
2. [ ] Ask question
3. [ ] Receive response (built-in or LLM)
4. [ ] Navigation commands work
5. [ ] Context-aware advice given

---

## ✅ Sign-Off Checklist

Before marking as production-ready:

### Technical
- [ ] All tests passing
- [ ] No console errors
- [ ] No console warnings (critical ones)
- [ ] Database migrations complete
- [ ] API endpoints tested
- [ ] Security audit complete

### Business
- [ ] Legal pages published
- [ ] Privacy policy updated
- [ ] Terms of service updated
- [ ] Support channels ready
- [ ] Monitoring configured

### Operational
- [ ] Backups configured
- [ ] Error tracking active
- [ ] Analytics tracking
- [ ] Alert rules set
- [ ] Documentation complete
- [ ] Deployment guide followed

---

## 🐛 Known Issues

Document any known issues here:

- [ ] None at this time

---

## 📝 Validation Notes

**Tester Name:** _________________  
**Date:** _________________  
**Environment:** [ ] Development  [ ] Staging  [ ] Production  
**Version:** v2.7.0

**Overall Status:** [ ] Pass  [ ] Fail  [ ] Pass with Issues

**Comments:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## 🎉 Deployment Approval

- [ ] Technical Lead Approval: _________________
- [ ] Product Owner Approval: _________________
- [ ] QA Lead Approval: _________________

**Approved for Production:** [ ] Yes  [ ] No

**Deployment Date:** _________________

---

*Document Version: 1.0*  
*Last Updated: January 15, 2025*
