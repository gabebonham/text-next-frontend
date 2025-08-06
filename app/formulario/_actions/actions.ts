import AwnserEntity from '@/app/_entities/AwnserEntity'

export async function sendAction(awnser: AwnserEntity) {
  try {
    const body = {
      idpergunta: awnser.idpergunta,
      resposta: awnser.resposta,
      respostaaberta: awnser.respostaaberta,
    }
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (e) {
    console.log(e)
  }
}
