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
      lock: (name, acquireTimeout, fn) => {
        // Fall back gracefully if Web Locks API is unavailable or times out
        if (typeof navigator === 'undefined' || !navigator.locks) {
          return fn();
        }
        return navigator.locks.request(name, { ifAvailable: false }, fn);
      },
    },
  },
);
