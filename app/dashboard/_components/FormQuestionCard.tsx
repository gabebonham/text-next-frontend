'use client'

import QuestionEntity from '@/app/_entities/QuestionEntity'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@radix-ui/react-select'
import { useEffect, useState } from 'react'
import { updateQuestion } from '../_actions/actions'
import { Checkbox } from '@/components/ui/checkbox'
import SelectComponent from './SelectComponent'
import { XCircle } from 'lucide-react'
import AwnsersDrawer from './AwnsersDrawer'
import Link from 'next/link'

export default function FormQuestionCardComponent({
  question,
  questionsLength,
  refresh,
  setRefresh,
  getNewQuestion,
}: {
  question: QuestionEntity
  questionsLength: number
  refresh: boolean
  setRefresh: (value: boolean) => void
  getNewQuestion: () => void
}) {
  const [required, setRequired] = useState<boolean>(question.obrigatoria)
  const [type, setType] = useState<string>(question.tipopergunta)
  const [order, setOrder] = useState<number>(question.ordem)
  const handleDelete = async () => {
    const forms = await fetch(`/api/questions/${question.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    getNewQuestion()
    setRefresh(!refresh)
  }
  return (
    <Card className="p-8 border-black/40 border-1">
      <form action={updateQuestion} className="space-y-4">
        <Input type="hidden" name="required" value={required.toString()} />
        <Input type="hidden" name="type" value={type} />
        <Input type="hidden" name="order" value={order} />
        <Input type="hidden" name="id" value={question.id} />
        <Input type="hidden" name="formId" value={question.idformulario} />
        <div className="flex items-center w-full">
          <h1 className="text-2xl">Pergunta número {order}</h1>
          <XCircle
            className="text-red-500 cursor-pointer size-10"
            onClick={() => handleDelete()}
          />
        </div>
        <Separator className="border-t-1 border-blue-800/30 w-full self-center" />
        <div className="space-y-2">
          <Label className="text-xl">Título</Label>
          <Textarea
            name="title"
            className="text-xl"
            defaultValue={question.titulo}
          />
        </div>
        <Separator className="border-t-1 border-blue-800/30 w-full self-center" />
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-xl">Resposta Obrigatória?</Label>
            <Button
              type="button"
              onClick={() => setRequired(!required)}
              className={`cursor-pointer ${
                required
                  ? 'bg-red-400 hover:bg-red-400'
                  : 'bg-green-400 hover:bg-green-400'
              }`}
            >
              {required ? 'Sim' : 'Não'}{' '}
            </Button>
          </div>
          <div className="space-y-2">
            <Label className="text-xl">Ordem</Label>
            <SelectComponent
              placeHolder={question.ordem}
              setValue={setOrder}
              valuesLength={questionsLength}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xl">Orientação</Label>
            <Textarea
              name="orientation"
              defaultValue={question.orientacaoresposta}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xl">Tipo de Pergunta</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id={`${question.id}y/n`}
                  checked={type == 'y/n'}
                  onCheckedChange={() => type != 'y/n' && setType('y/n')}
                />
                <Label htmlFor={`${question.id}y/n`}>Sim/Não</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id={`${question.id}multi`}
                  checked={type == 'multi'}
                  onCheckedChange={() => type != 'multi' && setType('multi')}
                />
                <Label htmlFor={`${question.id}multi`}>Multi Escolha</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id={`${question.id}single`}
                  checked={type == 'single'}
                  onCheckedChange={() => type != 'single' && setType('single')}
                />
                <Label htmlFor={`${question.id}single`}>Escolha Única </Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id={`${question.id}text`}
                  checked={type == 'text'}
                  onCheckedChange={() => type != 'text' && setType('text')}
                />
                <Label htmlFor={`${question.id}text`}>Texto</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id={`${question.id}int`}
                  checked={type == 'int'}
                  onCheckedChange={() => type != 'int' && setType('int')}
                />
                <Label htmlFor={`${question.id}int`}>Inteiro</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id={`${question.id}dec`}
                  checked={type == 'dec'}
                  onCheckedChange={() => type != 'dec' && setType('dec')}
                />
                <Label htmlFor={`${question.id}dec`}>Numero Decimal</Label>
              </div>
            </div>
          </div>
        </div>
        <Separator className="border-t-1 border-blue-800/30 w-full self-center" />
        <div className="space-y-2">
          <Label className="text-xl">Sub Pergunta</Label>
          <Textarea name="subQuestion" defaultValue={question.subpergunta} />
        </div>
        <div className="flex items-center w-full gap-x-4">
          <Button
            type="submit"
            className="bg-blue-400 cursor-pointer text-xl py-6 px-6"
            onClick={() => {
              setRefresh(!refresh)
              getNewQuestion()
            }}
          >
            Salvar
          </Button>
          <AwnsersDrawer awnsers={question.respostas} />
        </div>
      </form>
    </Card>
  )
}
