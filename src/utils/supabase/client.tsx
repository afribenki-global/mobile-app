import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-850156da`;

// API helper functions
// Demo mode fallback data
const DEMO_USER = {
  id: 'demo-user-1',
  username: '000006',
  phone: '000006',
  name: 'Demo User',
  email: 'demo@afribenki.app',
  balance: 125000,
  portfolioValue: 485000,
  savings: 200000,
  onboardingComplete: false,
  profilePicture: null,
};

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      let errorMessage = 'API call failed';
      try {
        const error = await response.json();
        errorMessage = error.error || error.message || errorMessage;
      } catch {
        errorMessage = `API call failed with status ${response.status}`;
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error: any) {
    // Demo mode fallback for signin
    if (endpoint === '/signin' && options.method === 'POST') {
      const body = JSON.parse(options.body as string);
      if (body.phone === '+000006' || body.phone === '000006') {
        return {
          accessToken: 'demo-token',
          user: DEMO_USER,
        };
      }
    }
    
    // Demo mode fallback for profile
    if (endpoint === '/profile' && options.method === 'GET') {
      const authHeader = options.headers?.['Authorization'] as string;
      if (authHeader?.includes('demo-token')) {
        return { user: DEMO_USER };
      }
    }
    
    throw error;
  }
}

export async function apiCallWithAuth(endpoint: string, accessToken: string, options: RequestInit = {}) {
  return apiCall(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}