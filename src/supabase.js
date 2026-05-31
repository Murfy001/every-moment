import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gpfxichawgxvqkgskmaa.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwZnhpY2hhd2d4dnFrZ3NrbWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTkxNDcsImV4cCI6MjA5NTMzNTE0N30.yOMMcXxrwO7x6F5eraxj02gYz0jOuc0y8rOvrjA_IXQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storageKey: 'every-moment-auth',
  }
})