import { json } from 'stream/consumers'

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL
    const forms = await fetch(`${backendUrl}/formularios`).then((r) => r.json())
    return Response.json(forms)
  } catch (e) {
    return Response.json({ error: e })
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/formularios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return Response.json(response)
  } catch (e) {
    return Response.json({ error: e })
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/formularios`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((r) => r.json())
    return Response.json(response)
  } catch (e) {
    return Response.json({ error: e })
  }
}
