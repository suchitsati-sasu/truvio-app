import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sqlyavusvmgmhzkrjgdf.supabase.co'
const supabaseKey = 'sb_publishable_d50b3iGL6L5cRPs-JoT65Q_aDHYfHNJ'

export const supabase = createClient(supabaseUrl, supabaseKey)