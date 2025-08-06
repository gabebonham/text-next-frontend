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
export async function createMultiAwnser(
  multiAwnser: any[],
  questionId: string,
) {
  console.log('aa')
  try {
    const backendUrl = process.env.BACKEND_URL

    const requests = multiAwnser.map((awnser) => {
      const body = {
        idpergunta: questionId,
        idopcaoresposta: awnser.id,
      }
      console.log(body)

      return fetch(`${backendUrl}/respostas-perguntas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    })

    await Promise.all(requests)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
