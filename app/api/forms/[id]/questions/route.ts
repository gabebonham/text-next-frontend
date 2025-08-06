import FormEntity from '@/app/_entities/FormEntity'

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
    const questions = response.perguntas
    return Response.json(questions)
  } catch (e) {
    console.log(e)
    return Response.json({ error: e })
  }
}
