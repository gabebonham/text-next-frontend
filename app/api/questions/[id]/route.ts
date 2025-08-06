export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/perguntas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return Response.json(response)
  } catch (e) {
    return Response.json({ error: e })
  }
}
