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

Deno.serve(app.fetch);