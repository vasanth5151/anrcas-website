import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Runs the Vercel-style handlers in `/api` inside the Vite dev server so that
 * `npm run dev` behaves like production. Secrets stay in the Node process —
 * they are never handed to the client bundle.
 */
function devApiRoutes(env) {
  return {
    name: 'anr-dev-api-routes',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, env)
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()
        const route = req.url.split('?')[0].replace(/^\/api\//, '').replace(/\/$/, '')
        if (!/^[a-z0-9-]+$/i.test(route)) return next()

        try {
          const mod = await server.ssrLoadModule(`/api/${route}.js`)
          const body = await new Promise((resolve) => {
            const chunks = []
            req.on('data', (c) => chunks.push(c))
            req.on('end', () => {
              const raw = Buffer.concat(chunks).toString('utf8')
              try {
                resolve(raw ? JSON.parse(raw) : {})
              } catch {
                resolve({})
              }
            })
          })
          req.body = body
          res.status = (code) => {
            res.statusCode = code
            return res
          }
          res.json = (payload) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            return res
          }
          await (mod.default ?? mod.handler)(req, res)
        } catch (error) {
          server.config.logger.error(`[dev-api] ${route}: ${error.message}`)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Dev API route failed.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), devApiRoutes(env)],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('react-router')) return 'router'
            if (id.includes('react-dom') || id.includes('/react/')) return 'react'
          },
        },
      },
    },
  }
})
