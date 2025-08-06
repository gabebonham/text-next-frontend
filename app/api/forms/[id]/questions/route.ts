export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(
      `${backendUrl}/perguntas?idFormularios=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((r) => r.json())
    return Response.json(response)
  } catch (e) {
    return Response.json({ error: e })
  }
}
