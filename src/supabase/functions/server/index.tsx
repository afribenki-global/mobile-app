import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Supabase clients
const getSupabaseAdmin = () => createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const getSupabaseClient = (accessToken?: string) => createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!,
  accessToken ? {
    global: { headers: { Authorization: `Bearer ${accessToken}` } }
  } : undefined
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-850156da/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize default user
app.post("/make-server-850156da/init", async (c) => {
  try {
    const supabase = getSupabaseAdmin();
    
    // Check if default user exists
    const existingUser = await kv.get('user:demo');
    if (existingUser) {
      return c.json({ message: "Default user already exists" });
    }
    
    // Create default user in Supabase Auth using email (phone requires E.164 format)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'demo@afribenki.app',
      password: '321654',
      user_metadata: {
        username: '000006',
        name: 'Demo User',
        phone: '000006',
        onboardingComplete: false,
      },
      email_confirm: true, // Auto-confirm since we don't have email server setup
    });
    
    if (authError) {
      console.error('Auth creation error:', authError);
      return c.json({ error: `Failed to create auth user: ${authError.message}` }, 500);
    }
    
    // Store user data in KV store
    await kv.set(`user:demo`, {
      id: authData.user?.id,
      username: '000006',
      phone: '000006',
      name: 'Demo User',
      email: 'demo@afribenki.app',
      balance: 125000,
      portfolioValue: 485000,
      savings: 200000,
      onboardingComplete: false,
      profilePicture: null,
      createdAt: new Date().toISOString(),
    });
    
    // Also store by user ID for easy lookup
    await kv.set(`user:${authData.user?.id}`, {
      id: authData.user?.id,
      username: '000006',
      phone: '000006',
      name: 'Demo User',
      email: 'demo@afribenki.app',
      balance: 125000,
      portfolioValue: 485000,
      savings: 200000,
      onboardingComplete: false,
      profilePicture: null,
      createdAt: new Date().toISOString(),
    });
    
    return c.json({ 
      message: "Default user created successfully",
      username: '000006',
      phone: '000006'
    });
  } catch (error) {
    console.error('Initialization error:', error);
    return c.json({ error: `Failed to initialize: ${error.message}` }, 500);
  }
});

// Sign up with phone number
app.post("/make-server-850156da/signup", async (c) => {
  try {
    const { phone, password, name, email, countryCode } = await c.req.json();
    const supabase = getSupabaseAdmin();
    
    // Format phone number in E.164 format (remove spaces, ensure starts with +)
    const fullPhone = `${countryCode}${phone}`.replace(/\s+/g, '');
    
    // Validate E.164 format (starts with +, followed by 1-15 digits)
    if (!/^\+[1-9]\d{1,14}$/.test(fullPhone)) {
      return c.json({ error: 'Invalid phone number format. Please use a valid international phone number.' }, 400);
    }
    
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      phone: fullPhone,
      password,
      user_metadata: {
        name,
        email,
        phone: fullPhone,
        onboardingComplete: false,
      },
      phone_confirm: true, // Auto-confirm since we don't have SMS setup
    });
    
    if (authError) {
      console.error('Signup error:', authError);
      return c.json({ error: `Signup failed: ${authError.message}` }, 400);
    }
    
    // Store user data in KV store
    await kv.set(`user:${authData.user?.id}`, {
      id: authData.user?.id,
      phone: fullPhone,
      name,
      email: email || null,
      balance: 0,
      portfolioValue: 0,
      savings: 0,
      onboardingComplete: false,
      profilePicture: null,
      createdAt: new Date().toISOString(),
    });
    
    return c.json({ 
      message: "User created successfully",
      userId: authData.user?.id
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: `Signup failed: ${error.message}` }, 500);
  }
});

// Sign in with phone number or demo user
app.post("/make-server-850156da/signin", async (c) => {
  try {
    const { phone, password } = await c.req.json();
    const supabase = getSupabaseClient();
    
    // Handle demo user login (use email instead of phone)
    if (phone === '000006' || phone === '+000006') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@afribenki.app',
        password,
      });
      
      if (error) {
        console.error('Demo signin error:', error);
        return c.json({ error: `Signin failed: ${error.message}` }, 401);
      }
      
      // Get demo user data from KV store
      let userData = await kv.get(`user:${data.user?.id}`);
      if (!userData) {
        userData = await kv.get('user:demo');
      }
      
      return c.json({ 
        accessToken: data.session?.access_token,
        user: userData || {
          id: data.user?.id,
          username: '000006',
          phone: '000006',
          name: 'Demo User',
          email: 'demo@afribenki.app',
          balance: 125000,
          portfolioValue: 485000,
          savings: 200000,
          onboardingComplete: false,
          profilePicture: null,
        },
      });
    }
    
    // Regular phone login
    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });
    
    if (error) {
      console.error('Signin error:', error);
      return c.json({ error: `Signin failed: ${error.message}` }, 401);
    }
    
    // Get user data from KV store
    const userData = await kv.get(`user:${data.user?.id}`);
    
    return c.json({ 
      accessToken: data.session?.access_token,
      user: userData || data.user,
    });
  } catch (error) {
    console.error('Signin error:', error);
    return c.json({ error: `Signin failed: ${error.message}` }, 500);
  }
});

// Get user profile (protected route)
app.get("/make-server-850156da/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.error('Auth error:', error);
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    // Get user data from KV store
    const userData = await kv.get(`user:${user.id}`);
    
    return c.json({ user: userData || user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return c.json({ error: `Failed to fetch profile: ${error.message}` }, 500);
  }
});

// Update user profile (protected route)
app.put("/make-server-850156da/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const updates = await c.req.json();
    const existingData = await kv.get(`user:${user.id}`) || {};
    
    // Update user data in KV store
    await kv.set(`user:${user.id}`, {
      ...existingData,
      ...updates,
      id: user.id,
      onboardingComplete: true,
    });
    
    return c.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error('Profile update error:', error);
    return c.json({ error: `Failed to update profile: ${error.message}` }, 500);
  }
});

// Get circles
app.get("/make-server-850156da/circles", async (c) => {
  try {
    const circles = await kv.getByPrefix('circle:');
    return c.json({ circles: circles || [] });
  } catch (error) {
    console.error('Circles fetch error:', error);
    return c.json({ error: `Failed to fetch circles: ${error.message}` }, 500);
  }
});

// Create circle (protected route)
app.post("/make-server-850156da/circles", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const circleData = await c.req.json();
    const circleId = `circle:${Date.now()}`;
    
    await kv.set(circleId, {
      ...circleData,
      id: circleId,
      creatorId: user.id,
      members: [user.id],
      createdAt: new Date().toISOString(),
    });
    
    return c.json({ message: "Circle created successfully", circleId });
  } catch (error) {
    console.error('Circle creation error:', error);
    return c.json({ error: `Failed to create circle: ${error.message}` }, 500);
  }
});

// ==================== INVESTMENTS ====================

// Get user investments
app.get("/make-server-850156da/investments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const investments = await kv.getByPrefix(`investment:${user.id}:`);
    return c.json({ investments: investments || [] });
  } catch (error) {
    console.error('Investments fetch error:', error);
    return c.json({ error: `Failed to fetch investments: ${error.message}` }, 500);
  }
});

// Create investment
app.post("/make-server-850156da/investments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const investmentData = await c.req.json();
    const investmentId = `investment:${user.id}:${Date.now()}`;
    
    // Update user balance
    const userData = await kv.get(`user:${user.id}`);
    if (userData && userData.balance < investmentData.amount) {
      return c.json({ error: 'Insufficient balance' }, 400);
    }
    
    await kv.set(investmentId, {
      ...investmentData,
      id: investmentId,
      userId: user.id,
      status: 'active',
      createdAt: new Date().toISOString(),
    });
    
    // Update user balances
    if (userData) {
      await kv.set(`user:${user.id}`, {
        ...userData,
        balance: userData.balance - investmentData.amount,
        portfolioValue: (userData.portfolioValue || 0) + investmentData.amount,
      });
    }
    
    // Create activity record
    const activityId = `activity:${user.id}:${Date.now()}`;
    await kv.set(activityId, {
      id: activityId,
      userId: user.id,
      type: 'investment',
      title: `Invested in ${investmentData.name}`,
      amount: investmentData.amount,
      category: investmentData.type || 'investment',
      timestamp: new Date().toISOString(),
    });
    
    return c.json({ message: "Investment created successfully", investmentId });
  } catch (error) {
    console.error('Investment creation error:', error);
    return c.json({ error: `Failed to create investment: ${error.message}` }, 500);
  }
});

// ==================== SAVINGS PLANS ====================

// Get user savings plans
app.get("/make-server-850156da/savings-plans", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const savingsPlans = await kv.getByPrefix(`savings:${user.id}:`);
    return c.json({ savingsPlans: savingsPlans || [] });
  } catch (error) {
    console.error('Savings plans fetch error:', error);
    return c.json({ error: `Failed to fetch savings plans: ${error.message}` }, 500);
  }
});

// Create savings plan
app.post("/make-server-850156da/savings-plans", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const savingsData = await c.req.json();
    const savingsId = `savings:${user.id}:${Date.now()}`;
    
    await kv.set(savingsId, {
      ...savingsData,
      id: savingsId,
      userId: user.id,
      currentAmount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    });
    
    return c.json({ message: "Savings plan created successfully", savingsId });
  } catch (error) {
    console.error('Savings plan creation error:', error);
    return c.json({ error: `Failed to create savings plan: ${error.message}` }, 500);
  }
});

// Add to savings plan
app.post("/make-server-850156da/savings-plans/:id/contribute", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const savingsId = c.req.param('id');
    const { amount } = await c.req.json();
    
    // Get savings plan
    const savingsPlan = await kv.get(savingsId);
    if (!savingsPlan || savingsPlan.userId !== user.id) {
      return c.json({ error: 'Savings plan not found' }, 404);
    }
    
    // Get user data
    const userData = await kv.get(`user:${user.id}`);
    if (!userData || userData.balance < amount) {
      return c.json({ error: 'Insufficient balance' }, 400);
    }
    
    // Update savings plan
    await kv.set(savingsId, {
      ...savingsPlan,
      currentAmount: (savingsPlan.currentAmount || 0) + amount,
    });
    
    // Update user balances
    await kv.set(`user:${user.id}`, {
      ...userData,
      balance: userData.balance - amount,
      savings: (userData.savings || 0) + amount,
    });
    
    // Create activity record
    const activityId = `activity:${user.id}:${Date.now()}`;
    await kv.set(activityId, {
      id: activityId,
      userId: user.id,
      type: 'savings',
      title: `Added to ${savingsPlan.name}`,
      amount: amount,
      category: 'savings',
      timestamp: new Date().toISOString(),
    });
    
    return c.json({ message: "Contribution successful" });
  } catch (error) {
    console.error('Contribution error:', error);
    return c.json({ error: `Failed to contribute: ${error.message}` }, 500);
  }
});

// ==================== TRANSACTIONS ====================

// Get user transactions
app.get("/make-server-850156da/transactions", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const transactions = await kv.getByPrefix(`transaction:${user.id}:`);
    return c.json({ transactions: transactions || [] });
  } catch (error) {
    console.error('Transactions fetch error:', error);
    return c.json({ error: `Failed to fetch transactions: ${error.message}` }, 500);
  }
});

// Top-up wallet
app.post("/make-server-850156da/topup", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const { amount, method } = await c.req.json();
    
    if (amount < 1000) {
      return c.json({ error: 'Minimum top-up amount is 1000' }, 400);
    }
    
    // Get user data
    const userData = await kv.get(`user:${user.id}`);
    
    // Update user balance
    await kv.set(`user:${user.id}`, {
      ...userData,
      balance: (userData?.balance || 0) + amount,
    });
    
    // Create transaction record
    const transactionId = `transaction:${user.id}:${Date.now()}`;
    await kv.set(transactionId, {
      id: transactionId,
      userId: user.id,
      type: 'topup',
      amount: amount,
      method: method,
      status: 'completed',
      timestamp: new Date().toISOString(),
    });
    
    // Create activity record
    const activityId = `activity:${user.id}:${Date.now()}`;
    await kv.set(activityId, {
      id: activityId,
      userId: user.id,
      type: 'topup',
      title: `Wallet Top-up via ${method}`,
      amount: amount,
      category: 'wallet',
      timestamp: new Date().toISOString(),
    });
    
    return c.json({ message: "Top-up successful", newBalance: (userData?.balance || 0) + amount });
  } catch (error) {
    console.error('Top-up error:', error);
    return c.json({ error: `Top-up failed: ${error.message}` }, 500);
  }
});

// Withdraw from wallet
app.post("/make-server-850156da/withdraw", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const { amount, method, accountDetails } = await c.req.json();
    
    if (amount < 1000) {
      return c.json({ error: 'Minimum withdrawal amount is 1000' }, 400);
    }
    
    // Get user data
    const userData = await kv.get(`user:${user.id}`);
    
    if (!userData || userData.balance < amount) {
      return c.json({ error: 'Insufficient balance' }, 400);
    }
    
    // Update user balance
    await kv.set(`user:${user.id}`, {
      ...userData,
      balance: userData.balance - amount,
    });
    
    // Create transaction record
    const transactionId = `transaction:${user.id}:${Date.now()}`;
    await kv.set(transactionId, {
      id: transactionId,
      userId: user.id,
      type: 'withdrawal',
      amount: amount,
      method: method,
      accountDetails: accountDetails,
      status: 'processing',
      timestamp: new Date().toISOString(),
    });
    
    // Create activity record
    const activityId = `activity:${user.id}:${Date.now()}`;
    await kv.set(activityId, {
      id: activityId,
      userId: user.id,
      type: 'withdrawal',
      title: `Withdrawal via ${method}`,
      amount: amount,
      category: 'wallet',
      timestamp: new Date().toISOString(),
    });
    
    return c.json({ message: "Withdrawal request submitted", newBalance: userData.balance - amount });
  } catch (error) {
    console.error('Withdrawal error:', error);
    return c.json({ error: `Withdrawal failed: ${error.message}` }, 500);
  }
});

// ==================== ACTIVITIES ====================

// Get user activities
app.get("/make-server-850156da/activities", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const activities = await kv.getByPrefix(`activity:${user.id}:`);
    return c.json({ activities: activities || [] });
  } catch (error) {
    console.error('Activities fetch error:', error);
    return c.json({ error: `Failed to fetch activities: ${error.message}` }, 500);
  }
});

// ==================== AI CHAT ====================

// External LLM integration endpoint
app.post("/make-server-850156da/ai-chat", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const { message, context } = await c.req.json();
    
    // Check if external LLM is configured
    const externalLLMUrl = Deno.env.get('EXTERNAL_LLM_API_URL');
    const externalLLMKey = Deno.env.get('EXTERNAL_LLM_API_KEY');
    
    if (externalLLMUrl && externalLLMKey) {
      // Call external LLM API
      try {
        const response = await fetch(externalLLMUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${externalLLMKey}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: `You are a helpful financial advisor for AfriBenki, a fintech app. User context: ${JSON.stringify(context)}. Provide personalized, actionable financial advice in a friendly tone. Keep responses concise but informative.`
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`External LLM API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        return c.json({ 
          response: data.choices?.[0]?.message?.content || data.response || 'Sorry, I could not generate a response.',
          source: 'external_llm'
        });
      } catch (llmError) {
        console.error('External LLM error:', llmError);
        return c.json({ 
          response: 'I apologize, but I\'m having trouble connecting to the AI service. Please try again later.',
          error: llmError.message,
          source: 'error'
        }, 500);
      }
    } else {
      // Fallback to built-in responses
      return c.json({ 
        response: 'External LLM is not configured. Using built-in AI advisor.',
        source: 'builtin'
      });
    }
  } catch (error) {
    console.error('AI chat error:', error);
    return c.json({ error: `AI chat failed: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);