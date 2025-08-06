export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/formularios/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json())
    return Response.json(response)
  } catch (e) {
    return Response.json({ error: e })
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/formularios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json())
  } catch (e) {
    return Response.json({ error: e })
  }
}
