import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

type ConfigEnv = /*unresolved*/ any;

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_GITHUB_TOKEN': JSON.stringify(env.REACT_APP_GITHUB_TOKEN)
    },
    base: "/github-repos-app-",
    plugins: [react()],
  }
})