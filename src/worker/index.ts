import { Hono } from 'hono'

type Env = {
 filedrop: R2Bucket
}

const app = new Hono<{ Bindings: Env }>()

app.get('/api/', (c) => c.json({ name: 'Cloudflare' }))

// // Access to environment values
// app.put('/upload/:key', async (c) => {
//  const key = c.req.param('key')
//  const body = await c.req.arrayBuffer()
//  await c.env.filedrop.put(key, body)
//  return c.text(`Put ${key} successfully!`)
// })

export default app
