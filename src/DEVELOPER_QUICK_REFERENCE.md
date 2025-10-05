# 🛠️ Developer Quick Reference - October 2025 Update

## New Components API

### AfriBenkiLogo
```tsx
import { AfriBenkiLogo } from './components/AfriBenkiLogo';

// Usage
<AfriBenkiLogo size="lg" animated={true} />

// Props
size: 'sm' | 'md' | 'lg'  // Default: 'lg'
animated: boolean          // Default: true
```

### CircleContributeScreen
```tsx
// Route: 'circle-contribute'
// Required Context: selectedCircleId must be set

// Navigate to:
setSelectedCircleId('1');  // Set the circle ID
setCurrentScreen('circle-contribute');

// Activity logged automatically
// Success returns to 'circles'
```

### CircleAddMembersScreen
```tsx
// Route: 'circle-add-members'
// Returns to: 'circle-chat'

// Features:
// - Contact search
// - Multi-select
// - AfriBenki user detection
// - Batch invites
```

### CircleSettingsScreen
```tsx
// Route: 'circle-settings'
// Returns to: 'circle-chat'

// Configurable:
// - Group name
// - Target amount
// - Contribution amount
// - Frequency
```

### ArticleReaderScreen
```tsx
// Route: 'article-reader'
// Required Context: selectedArticleId

// Navigate to:
setSelectedArticleId('basics-1');
setCurrentScreen('article-reader');

// Features:
// - Progress tracking
// - Bookmarks
// - Likes
// - Related articles
```

---

## Context Updates

### AppContext
```tsx
import { useApp } from './components/AppContext';

// New state variables:
const {
  unreadNotificationsCount,     // number
  setUnreadNotificationsCount,  // (count: number) => void
  selectedCircleId,             // string | null
  setSelectedCircleId,          // (id: string | null) => void
} = useApp();
```

### ActivityContext
```tsx
import { useActivity } from './components/ActivityContext';

const { addActivity } = useActivity();

// Updated interface:
addActivity({
  type: 'circle',              // Added 'circle' type
  title: 'Circle Contribution',
  description: 'Family Vacation Fund',
  amount: 50000,
  status: 'completed',
  // icon is now optional - auto-assigned by type
});
```

---

## Routing Map

### New Routes
```tsx
'circle-contribute'   → CircleContributeScreen
'circle-add-members'  → CircleAddMembersScreen  
'circle-settings'     → CircleSettingsScreen
'article-reader'      → ArticleReaderScreen
```

### Updated Routes
```tsx
'welcome'            → WelcomeScreen (new logo)
'notifications'      → NotificationsScreen (badge updates)
'circles'           → CirclesScreen (contribute, join functionality)
'circle-chat'       → CircleChatScreen (linked settings)
'investment-basics' → InvestmentBasicsScreen (article reader integration)
```

---

## Common Patterns

### Navigation with State
```tsx
// Pattern 1: Navigate with selection
setSelectedCircleId('1');
setCurrentScreen('circle-contribute');

// Pattern 2: Navigate with article
setSelectedArticleId('basics-1');
setCurrentScreen('article-reader');
```

### Activity Logging
```tsx
import { useActivity } from './components/ActivityContext';

const { addActivity } = useActivity();

// Log any activity
addActivity({
  type: 'circle',
  title: 'Action Completed',
  description: 'Details here',
  amount: 1000,  // Optional
  status: 'completed',
});
```

### Toast Notifications
```tsx
import { toast } from 'sonner@2.0.3';

// Success
toast.success('Action completed!');

// Error
toast.error('Something went wrong');

// Info
toast.info('Processing...');

// With description
toast.success('Title', {
  description: 'More details here'
});
```

### Multi-language Support
```tsx
const { language, t } = useApp();

// Use translation function
<button>{t('contribute')}</button>

// Conditional text
{language === 'fr' ? 'Contribuer' : 'Contribute'}
```

### Currency Formatting
```tsx
const { formatCurrency } = useApp();

// Format any amount
const formatted = formatCurrency(50000);
// Returns: ₦50,000.00 (based on user's currency)
```

---

## Component Communication

### Parent → Child (Props)
```tsx
// In Parent
<MyComponent amount={50000} onComplete={() => {}} />

// In Child
interface MyComponentProps {
  amount: number;
  onComplete: () => void;
}
```

### Child → Parent (Callbacks)
```tsx
// In Parent
const handleComplete = (data: any) => {
  console.log('Child completed:', data);
};

<MyComponent onComplete={handleComplete} />

// In Child
props.onComplete({ status: 'success' });
```

### Sibling (via Context)
```tsx
// Component A
setSelectedCircleId('1');

// Component B
const { selectedCircleId } = useApp();
// Uses the same ID
```

---

## Styling Guidelines

### Brand Colors
```tsx
// Tailwind classes
className="bg-primary"        // Navy #001F3F
className="bg-accent"         // Green #00A676
className="bg-warning"        // Gold #F4C430

// Gradients
className="bg-gradient-to-r from-primary to-accent"
```

### Common Layouts
```tsx
// Screen container
<div className="min-h-screen bg-muted pb-20">

// Header with gradient
<div className="bg-gradient-to-r from-primary to-accent text-white p-6">

// Card
<Card className="p-5">

// Button primary
<Button className="bg-accent hover:bg-accent/90">
```

### Animations
```tsx
import { motion } from 'motion/react';

// Fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>

// Stagger children
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: index * 0.05 }}
  >
))}
```

---

## Data Flow Examples

### Circle Contribution Flow
```
User clicks "Contribute"
  ↓
setSelectedCircleId('1')
setCurrentScreen('circle-contribute')
  ↓
User completes 4 steps
  ↓
addActivity({ type: 'circle', ... })
  ↓
setCurrentScreen('circles')
  ↓
Activity shows in history
```

### Notification Read Flow
```
User clicks notification
  ↓
markAsRead(notificationId)
  ↓
Update local state
  ↓
Calculate new unread count
  ↓
setUnreadNotificationsCount(newCount)
  ↓
TopBar badge updates automatically
```

### Join Circle Flow
```
User clicks "Join"
  ↓
Add circle ID to joinedCircles state
  ↓
Show toast notification
  ↓
Button disabled with "Pending" text
  ↓
(Later: Admin approves in backend)
```

---

## Testing Utilities

### Mock Data Locations
```
Circles: CirclesScreen.tsx (lines 15-57)
Contacts: CircleAddMembersScreen.tsx (lines 21-28)
Articles: ArticleReaderScreen.tsx (lines 36-228)
Notifications: NotificationsScreen.tsx (lines 24-109)
```

### State Debugging
```tsx
// Add temporary logging
const { selectedCircleId } = useApp();
console.log('Current circle:', selectedCircleId);

// Watch notifications
const { unreadNotificationsCount } = useApp();
console.log('Unread count:', unreadNotificationsCount);
```

### Manual Testing Checklist
```
✓ Logo animation on welcome
✓ Sign-in button contrast
✓ Notification badge updates
✓ Contribute flow validation
✓ Join button state change
✓ Settings save
✓ Article progress bar
✓ Language switching
✓ Activity logging
```

---

## Performance Tips

### Optimize Re-renders
```tsx
// Use memo for expensive components
const MemoizedComponent = React.memo(MyComponent);

// Use callback for functions passed as props
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### Lazy Loading (Future)
```tsx
// Lazy load screens
const CircleContributeScreen = lazy(() => 
  import('./components/screens/CircleContributeScreen')
);

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <CircleContributeScreen />
</Suspense>
```

### Animation Performance
```tsx
// GPU acceleration
className="will-change-transform gpu-accelerated"

// Reduce motion for accessibility
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

---

## Error Handling

### API Calls
```tsx
try {
  const result = await apiCall('/endpoint', { method: 'POST' });
  // Handle success
} catch (error: any) {
  toast.error(
    language === 'fr' 
      ? 'Erreur de connexion' 
      : 'Connection error'
  );
}
```

### Form Validation
```tsx
if (!amount || parseFloat(amount) <= 0) {
  toast.error(
    language === 'fr' 
      ? 'Montant invalide' 
      : 'Invalid amount'
  );
  return;
}

if (amount > user.balance) {
  toast.error(
    language === 'fr'
      ? 'Solde insuffisant'
      : 'Insufficient balance'
  );
  return;
}
```

---

## Build & Deploy

### Environment Variables
```bash
# Required
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key

# Optional
VITE_ENV=production
```

### Build Commands
```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Type check
npx tsc --noEmit
```

### Pre-deployment Checks
```bash
✓ No TypeScript errors
✓ No console.log statements
✓ All imports resolve
✓ Build completes successfully
✓ Bundle size acceptable
```

---

## File Structure Reference

```
src/
├── components/
│   ├── screens/
│   │   ├── CircleContributeScreen.tsx    ← New
│   │   ├── CircleAddMembersScreen.tsx    ← New
│   │   ├── CircleSettingsScreen.tsx      ← New
│   │   └── ArticleReaderScreen.tsx       ← New
│   ├── ui/                                ← shadcn components
│   ├── AfriBenkiLogo.tsx                 ← New
│   ├── AppContext.tsx                    ← Updated
│   ├── ActivityContext.tsx               ← Updated
│   └── TopBar.tsx                        ← Updated
├── styles/
│   └── globals.css                       ← Brand colors
└── App.tsx                               ← Routes updated
```

---

## Quick Troubleshooting

### Issue: Logo not showing
```
Check: Import path correct?
Check: Component mounted?
Check: SVG rendering in browser?
```

### Issue: Notification badge stuck
```
Check: setUnreadNotificationsCount called?
Check: markAsRead updating state?
Check: Context provider wrapping app?
```

### Issue: Contribute flow not working
```
Check: selectedCircleId set before navigation?
Check: ActivityContext available?
Check: User balance sufficient?
```

### Issue: Language not switching
```
Check: Translations file imported?
Check: language prop passed correctly?
Check: Conditional rendering syntax correct?
```

---

## Code Snippets

### Create a New Screen
```tsx
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export function MyNewScreen() {
  const { setCurrentScreen, language } = useApp();

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('previous-screen')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white">Screen Title</h2>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        <Card className="p-5">
          {/* Your content here */}
        </Card>
      </motion.div>
    </div>
  );
}
```

### Add a New Route
```tsx
// In App.tsx
import { MyNewScreen } from './components/screens/MyNewScreen';

// In switch statement
case 'my-new-screen':
  mainScreen = <MyNewScreen />;
  break;
```

---

**Quick Reference Complete** ✅  
Updated: October 5, 2025
