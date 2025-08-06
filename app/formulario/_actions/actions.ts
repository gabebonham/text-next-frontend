'use server'
import AwnserEntity from '@/app/_entities/AwnserEntity'

export async function sendAction(awnser: AwnserEntity) {
  try {
    const body = {
      idpergunta: awnser.idpergunta,
      resposta: awnser.resposta,
      ordem: awnser.ordem,
      respostaaberta: awnser.respostaaberta,
    }
    console.log(awnser)
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
export async function createMultiAwnser(awnserId: string, questionId: string) {
  try {
    const body = {
      idpergunta: questionId,
      idresposta: awnserId,
    }
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/respostas-perguntas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
