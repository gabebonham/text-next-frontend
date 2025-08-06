'use client'

import QuestionEntity from '@/app/_entities/QuestionEntity'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { createMultiAwnser, sendAction } from '../_actions/actions'
import AwnserEntity from '@/app/_entities/AwnserEntity'
interface MultiAwnser {
  id: string
  content: string
}
export default function QuestionToAwnser({
  question,
  send,
  setSent,
}: {
  question: QuestionEntity
  send: boolean
  setSent: (value: boolean) => void
}) {
  const [awnser, setAwnser] = useState<string>('')
  const [multiAwnser, setMultiAwnser] = useState<MultiAwnser[]>([])
  const [openQuestion, setOpenQuestion] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const data = {
    respostaaberta: openQuestion,
    idpergunta: question.id,
    resposta: awnser,
    ordem: question.ordem,
  } as AwnserEntity
  const sendHandler = async (id?: string) => {
    if (question.tipopergunta == 'text' || question.tipopergunta == 'multi') {
      setOpenQuestion(true)
    }
    if (question.tipopergunta == 'single' || question.tipopergunta == 'multi') {
      let result
      if (error == '' && send) {
        result = await sendAction(data)
      } else if (id) {
        result = await createMultiAwnser(id, question.id)
      } else {
        result = false
      }
      setSent(result)
    }
  }
  useEffect(() => {
    sendHandler()
  }, [send])
  const header = () => {
    return (
      <div className="text-3xl space-y-4">
        <h1 className="text-5xl text-black">{question.titulo}</h1>
        <h4>{question.subpergunta}</h4>
        <h4 className="text-2xl">{question.orientacaoresposta}</h4>
        <h4 className="text-red-500 text-2xl">
          {question.obrigatoria && 'Pergunta Obrigatória*'}
        </h4>
      </div>
    )
  }

  if (question.tipopergunta == 'y/n')
    return (
      <div className="space-y-4">
        {header()}
        <h4 className="text-red-500">{error && error}</h4>
        <div className="flex items-center justify-start gap-x-24">
          <div className="flex items-center gap-x-3">
            <Label htmlFor={`${question.id}yes`} className="text-3xl ">
              Sim
            </Label>

            <Checkbox
              className="size-6 mt-1 "
              id={`${question.id}yes`}
              checked={awnser == 'Sim'}
              onCheckedChange={() => awnser != 'Sim' && setAwnser('Sim')}
            />
          </div>
          <div className="flex items-center gap-x-3">
            <Label htmlFor={`${question.id}no`} className="text-3xl ">
              Não
            </Label>
            <Checkbox
              className="size-6 mt-1 "
              id={`${question.id}no`}
              checked={awnser == 'Não'}
              onCheckedChange={() => awnser != 'Não' && setAwnser('Não')}
            />
          </div>
        </div>
      </div>
    )
  const handleAddMultiAwnser = (id: string, content: string) => {
    setMultiAwnser([...multiAwnser, { id, content }])
  }
  const handleRemoveMultiAwnser = (id: string) => {
    const newList = multiAwnser.filter((awn) => awn.id != id)
    setMultiAwnser(newList)
  }
  const handleCheckMultiAwnser = (id: string): boolean => {
    return multiAwnser.map((awn) => awn.id).includes(id)
  }
  if (question.tipopergunta == 'multi')
    return (
      <div>
        <div className="space-y-4">
          {header()}
          <div className="flex items-center justify-start gap-x-24">
            <div className="grid grid-cols-2 gap-8">
              {question.respostas.map((resposta) => (
                <div className="flex items-center gap-x-3">
                  <Label className="text-3xl ">{resposta.resposta}</Label>
                  <Checkbox
                    className="size-6 mt-1 "
                    id={`${question.id}${resposta.resposta}`}
                    checked={handleCheckMultiAwnser(
                      `${question.id}${resposta.resposta}`,
                    )}
                    onCheckedChange={() =>
                      handleCheckMultiAwnser(
                        `${question.id}${resposta.resposta}`,
                      )
                        ? handleRemoveMultiAwnser(
                            `${question.id}${resposta.resposta}`,
                          )
                        : handleAddMultiAwnser(
                            `${question.id}${resposta.resposta}`,
                            resposta.resposta,
                          )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  if (question.tipopergunta == 'single')
    return (
      <div>
        <div className="space-y-4">
          {header()}
          <div className="flex items-center justify-start gap-x-24">
            <div className="grid grid-cols-2 gap-8">
              {question.respostas.map((resposta) => (
                <div className="flex items-center gap-x-3">
                  <Label htmlFor={`${question.id}no`} className="text-3xl ">
                    {resposta.resposta}
                  </Label>
                  <Checkbox
                    className="size-6 mt-1 "
                    id={`${question.id}${resposta.resposta}`}
                    checked={awnser == resposta.resposta}
                    onCheckedChange={() =>
                      awnser != resposta.resposta &&
                      setAwnser(resposta.resposta)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  if (question.tipopergunta == 'text')
    return (
      <div className="space-y-4">
        {header()}
        <h4 className="text-red-500 py-4">{error && error}</h4>
        <div className="flex items-center justify-start gap-x-24">
          <div>
            <Textarea
              value={awnser}
              onChange={(e) => setAwnser(e.target.value as string)}
            />
          </div>
        </div>
      </div>
    )
  const handleIntAwnser = (inp: string) => {
    if (inp == '') {
      setAwnser('')
      return
    }
    const parsed = parseInt(inp)
    if (isNaN(parsed)) {
      setError('Entrada inválida')
    } else {
      setAwnser(parsed.toString())
      setError('')
    }
  }
  if (question.tipopergunta == 'int')
    return (
      <div>
        {header()}
        <h4 className="text-red-500 py-4">{error && error}</h4>
        <div className="flex items-center justify-start gap-x-24">
          <div>
            <Input
              value={awnser}
              onChange={(e) => handleIntAwnser(e.target.value as string)}
            />
          </div>
        </div>
      </div>
    )
  const handleDecAwnser = (inp: string) => {
    if (inp === '') {
      setAwnser('')
      return
    }

    const cleaned = inp.replace(/\D/g, '')

    if (cleaned === '') {
      setAwnser('')
      setError('')
      return
    }

    const number = parseFloat(cleaned) / 100

    const formatted = number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    setAwnser(formatted)
    setError('')
  }
  if (question.tipopergunta == 'dec')
    return (
      <div>
        {header()}
        <h4 className="text-red-500 py-4">{error && error}</h4>
        <div className="flex items-center justify-start gap-x-24">
          <div>
            <Input
              value={awnser}
              onChange={(e) => handleDecAwnser(e.target.value as string)}
            />
          </div>
        </div>
      </div>
    )
}
