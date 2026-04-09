import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

export const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      lock: async (name, acquireTimeout, fn) => {
        if (typeof navigator === 'undefined' || !navigator.locks) {
          return fn(); // fallback: no locking
        }
        try {
          return await navigator.locks.request(
            name,
            { ifAvailable: true },  // fail fast and fall back instead of hanging
            async (lock) => {
              if (!lock) {
                // Lock not available, run without it
                return fn();
              }
              return fn();
            }
          );
        } catch (e) {
          // Lock failed — just run without lock rather than hanging
          console.warn('Lock failed, running without lock:', e);
          return fn();
        }
      },
    },
  }
);
