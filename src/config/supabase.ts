import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://oxizvwxyblaaacaojzzd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aXp2d3h5YmxhYWFjYW9qenpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTk4MzQsImV4cCI6MjA0NzE3NTgzNH0.mVufHg7eNdbtAKfMuYprFCiZIXJ1YaeBH4HdIYZpkJY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);