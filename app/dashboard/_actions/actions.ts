'use server'

import AwnserEntity from '@/app/_entities/AwnserEntity'
import { The_Nautigal } from 'next/font/google'

export async function createEmptyQuestion(formId: string) {
  try {
    const body = {
      idformulario: formId,
      titulo: 'Título',
      codigo: 1,
      orientacaoresposta: 'Orientações',
      ordem: 1,
      obrigatoria: true,
      subpergunta: 'Sub pergunta',
      tipopergunta: 'Tipo',
    }
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/perguntas`, {
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
export async function updateQuestion(formData: FormData) {
  try {
    const body = {
      id: formData.get('id'),
      idformulario: formData.get('formId'),
      titulo: formData.get('title'),
      codigo: 12345,
      orientacaoresposta: formData.get('orientation'),
      ordem: formData.get('order'),
      obrigatoria: formData.get('required'),
      subpergunta: formData.get('subQuestion'),
      tipopergunta: formData.get('type'),
    }
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(
      `${backendUrl}/perguntas/${formData.get('id')}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
  } catch (e) {
    console.log(e)
  }
}
export async function createEmptyForm() {
  try {
    const body = {
      titulo: 'Título',
      descricao: 'Descrição',
      ordem: 0,
    }
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/formularios`, {
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
export async function updateForm(formData: FormData) {
  try {
    const body = {
      titulo: formData.get('title'),
      descricao: formData.get('description'),
      ordem: formData.get('order'),
    }
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(
      `${backendUrl}/formularios/${formData.get('id')}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
  } catch (e) {
    console.log(e)
  }
}
export async function createResposta(awnser: AwnserEntity) {
  try {
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(awnser),
    }).then((r) => r.json())
    console.log(response)
    const body = {
      idpergunta: awnser.idpergunta,
      idopcaoresposta: awnser.id,
    }
    const res = await fetch(`${backendUrl}/respostas-perguntas`, {
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

export async function deleteResposta(id: string) {
  try {
    const backendUrl = process.env.BACKEND_URL
    const response = await fetch(`${backendUrl}/respostas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.log(e)
  }
}
