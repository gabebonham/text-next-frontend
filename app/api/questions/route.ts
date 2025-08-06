export async function GET(req: Request) {
  try {
    const { formId } = await req.json()
    const backendUrl = process.env.BACKEND_URL
    const perguntas = await fetch(
      `${backendUrl}/perguntas/filter?idFormulario=${formId}`,
    ).then((r) => r.json())
    return Response.json(perguntas)
  } catch (e) {
    return Response.json({ error: e })
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/perguntas`, {
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
    const response = await fetch(`${backendUrl}/perguntas`, {
      method: 'PUT',
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
