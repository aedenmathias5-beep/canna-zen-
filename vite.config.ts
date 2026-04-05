import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    base: '/',
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
        env.VITE_SUPABASE_URL ||
        'https://wsfufhzdxhqimbokxwcw.supabase.co'
      ),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY ||
        'sb_publishable_iFHuddg53-NTSxu3YTuw-w_LvcgsDVE'
      ),
      'import.meta.env.VITE_MOLLIE_API_KEY': JSON.stringify(
        env.VITE_MOLLIE_API_KEY ||
        'test_rNAJUpSxpzsFDAsGMR2DtVMUnJUf5T'
      ),
      'import.meta.env.VITE_SITE_URL': JSON.stringify(
        env.VITE_SITE_URL || 'https://cannazen.fun'
      ),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
    server: {
      host: '0.0.0.0',
      port: 5000,
      allowedHosts: true,
    },
  }
})
