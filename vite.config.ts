import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

type ConfigEnv = /*unresolved*/ any;

export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_GITHUB_TOKEN': JSON.stringify(env.REACT_APP_GITHUB_TOKEN)
    },
    plugins: [react()],
    server: {
      host: true,
      port: 3000
    },
  }
})