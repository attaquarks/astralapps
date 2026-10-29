import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { apiRouter } from './handlers.js'

/*
 * Production server for Hostinger (or any Node host): serves the built static
 * site from /dist and the AI API from /api. Run with:
 *   npm run build && npm start
 * (start loads .env via node --env-file-if-exists, so ANTHROPIC_API_KEY is read.)
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')
const port = process.env.PORT || 8080

const app = express()

// API — apiRouter reads the body itself, so no express.json() needed.
app.use('/api', (req, res) => {
  apiRouter(req, res)
})

// Static assets + SPA fallback (any non-API GET serves index.html).
app.use(express.static(distDir))
app.use((_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`AstralApps running at http://localhost:${port}`)
})
