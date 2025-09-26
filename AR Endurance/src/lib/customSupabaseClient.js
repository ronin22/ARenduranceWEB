import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vlcwsmedrmfcxywttbwz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsY3dzbWVkcm1mY3h5d3R0Ynd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NDM4NDIsImV4cCI6MjA2NTQxOTg0Mn0.gRoei4asMv0IdiOL5zuwxrBRlqRYm593AWao_QTJ4mg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);