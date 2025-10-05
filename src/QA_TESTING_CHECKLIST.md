# AfriBenki App - QA Testing Checklist

## ✅ Completed Updates (October 5, 2025)

### 1. Welcome Screen Updates
- [x] Logo replaces icon and text (using imported Figma asset)
- [x] Sign In button text displays correctly with explicit color

### 2. Home Screen - Balance Card
- [x] "Send" changed to "Top Up" (navigates to top-up screen)
- [x] "Receive" changed to "Withdraw" (navigates to withdraw screen)
- [x] Full end-to-end Top Up flow with payment methods (Card, Bank, Mobile Money)
- [x] Full end-to-end Withdraw flow with account details
- [x] Success notifications and activity logging for both flows
- [x] Balance updates after Top Up/Withdraw

### 3. Profile Completion
- [x] Onboarding banner only shows when `user.onboardingComplete === false`
- [x] Complete button navigates to `profile-edit` screen (not onboarding-profile)
- [x] Profile update marks `onboardingComplete = true` (client & server)
- [x] Banner disappears after profile completion

### 4. Explore Screen
- [x] AI Financial Advisor card removed from bottom of page
- [x] All other sections remain intact (Quick Links, Featured Articles, Tools, Videos)

### 5. Invest Screen - Major Enhancements
- [x] Swipeable portfolio cards (Fiat & Crypto)
- [x] Visual indicators for current portfolio (dots at bottom)
- [x] Navigation arrows for portfolio switching
- [x] "+" button on each portfolio card for new investments
- [x] Crypto portfolio added to quick links (4th option)
- [x] Portfolio metrics update based on selected type

### 6. New Investment Flow
- [x] Select investment type (Fiat or Crypto)
- [x] Choose specific fund/asset
- [x] Enter investment amount with validation
- [x] Confirm investment summary
- [x] Success screen with animation
- [x] Balance and portfolio value updates
- [x] Activity logging

### 7. Crypto Investments
- [x] Dedicated crypto invest screen with popular cryptocurrencies
- [x] Price display with 24h change indicators
- [x] Market cap and volume information
- [x] Risk warning card
- [x] Integration with new investment flow

### 8. Circle Chat Enhancements
- [x] Group settings accessible via three-dot menu
- [x] Comprehensive group information (name, members, goal, progress, created date)
- [x] Group metrics (total collected, monthly contributions, messages, activity)
- [x] Action buttons (Add Members, Notifications, Privacy, Settings, Leave Group)
- [x] Full members list with roles (Admin, Member, You)
- [x] Sheet component for settings drawer

### 9. Language Settings
- [x] Only English and French available (removed Swahili, Pidgin, Arabic)
- [x] Currency selection removed from language flow
- [x] Direct navigation: Language → KYC (during onboarding)
- [x] Back button added when accessed from Settings
- [x] Returns to Settings after selection (when already onboarded)

### 10. System Integration
- [x] All new screens added to App.tsx routing
- [x] Translation keys added for "topUp" (English & French)
- [x] Activity tracking for Top Up, Withdraw, and Investments
- [x] User balance and portfolio updates persist
- [x] Server-side profile update marks onboarding complete

## Testing Flow

### Test 1: Welcome & Authentication
1. Open app → See new logo on Welcome screen
2. Click "Sign In" → Button text visible and working
3. Sign in with demo user (000006/321654)

### Test 2: Profile Completion
1. New user should see onboarding banner
2. Click "Complete" → Goes to Profile Edit screen
3. Fill in profile details and save
4. Return to home → Banner should disappear

### Test 3: Top Up Flow
1. Home screen → Click "Top Up" button
2. Enter amount (min 1,000)
3. Select payment method (Card/Bank/Mobile)
4. Confirm details
5. See success animation
6. Verify balance increased
7. Check Recent Activity for top-up entry

### Test 4: Withdraw Flow
1. Home screen → Click "Withdraw" button
2. Enter amount (within available balance)
3. Select withdrawal method
4. Enter account details (bank account or phone)
5. Confirm withdrawal
6. See success animation
7. Verify balance decreased
8. Check Recent Activity for withdrawal entry

### Test 5: Investment Portfolio
1. Navigate to Invest screen
2. Swipe between Fiat and Crypto portfolios
3. Click navigation arrows to switch
4. Verify portfolio metrics change
5. Click "+" button on either card
6. Complete new investment flow
7. Verify portfolio value increases
8. Check Recent Activity

### Test 6: Crypto Investments
1. Click Crypto quick link in Invest screen
2. View cryptocurrency listings
3. Read risk warning
4. Click on any crypto to invest

### Test 7: Circle Chat Settings
1. Navigate to Circles
2. Click on a circle
3. Click three-dot menu (top right)
4. Verify group settings drawer opens
5. Check all sections: Info, Metrics, Actions, Members
6. Test various action buttons
7. Close drawer

### Test 8: Language Settings
1. Go to Settings
2. Click Language
3. Verify only English and French shown
4. Verify back button present
5. Select language and continue
6. Should return to Settings (not currency page)

## Known Issues
None identified in current implementation.

## Browser Compatibility
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## Performance Notes
- All animations use GPU acceleration
- Images lazy-loaded where applicable
- Minimal re-renders with proper state management
