'use client'

import QuestionEntity from '@/app/_entities/QuestionEntity'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { sendAction } from '../_actions/actions'
import AwnserEntity from '@/app/_entities/AwnserEntity'

export default function QuestionToAwnser({
  question,
  send,
}: {
  question: QuestionEntity
  send: boolean
}) {
  const [awnser, setAwnser] = useState<string>('')
  const [openQuestion, setOpenQuestion] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const data = {
    respostaaberta: openQuestion,
    idpergunta: question.id,
    resposta: awnser,
  } as AwnserEntity
  const sendHandler = async () => {
    if (question.tipopergunta == 'text' || question.tipopergunta == 'multi')
      setOpenQuestion(true)
    if (error == '') await sendAction(data)
  }
  useEffect(() => {
    sendHandler()
  }, [send])
  const header = () => {
    return (
      <div>
        <h1>{question.titulo}</h1>
        <h4>{question.subpergunta}</h4>
        <h4>{question.orientacaoresposta}</h4>
        <h4 className="text-red-500">
          {question.obrigatoria && 'Pergunta Obrigatória*'}
        </h4>
      </div>
    )
  }

  if (question.tipopergunta == 'y/n')
    return (
      <div>
        {header()}
        <h4 className="text-red-500">{error && error}</h4>
        <div className="flex items-center justify-start gap-x-24">
          <div>
            <Label>Sim</Label>

            <Checkbox
              id={`${question.id}yes`}
              checked={awnser == 'yes'}
              onCheckedChange={() => awnser != 'Sim' && setAwnser('Sim')}
            />
          </div>
          <div>
            <Label>Não</Label>
            <Checkbox
              id={`${question.id}no`}
              checked={awnser == 'no'}
              onCheckedChange={() => awnser != 'Não' && setAwnser('Não')}
            />
          </div>
        </div>
      </div>
    )
  if (question.tipopergunta == 'multi') return <div>multi</div>
  if (question.tipopergunta == 'single') return <div>single</div>
  if (question.tipopergunta == 'text')
    return (
      <div>
        {header()}
        <h4 className="text-red-500">{error && error}</h4>
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
    try {
      parseInt(inp)
      setAwnser(inp)
      setError('')
    } catch (e) {
      setError('Entrada inválida')
    }
  }
  if (question.tipopergunta == 'int')
    return (
      <div>
        {header()}
        <h4 className="text-red-500">{error && error}</h4>
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
    try {
      const parsedInp = parseFloat(inp).toFixed(2)
      setAwnser(parsedInp.toString())
      setError('')
    } catch (e) {
      setError('Entrada inválida')
    }
  }
  if (question.tipopergunta == 'dec')
    return (
      <div>
        {header()}
        <h4 className="text-red-500">{error && error}</h4>
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
