// ============================================================
// ARCHIVO: lib/supabase.js
// DESCRIPCIÓN: Configuración del cliente Supabase
// ============================================================

import { createClient } from '@supabase/supabase-js';

// Usamos las variables de entorno definidas en el archivo .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Creamos y exportamos el cliente para usarlo en toda la app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
