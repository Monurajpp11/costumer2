import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vmepbrjzzfbinleewrhp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_XLycCDzmLqyafDuxFm1AwA_lIit3QVy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
