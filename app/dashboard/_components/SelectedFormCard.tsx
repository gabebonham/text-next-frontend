'use client'

import FormEntity from '@/app/_entities/FormEntity'
import QuestionEntity from '@/app/_entities/QuestionEntity'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { createEmptyQuestion, updateForm } from '../_actions/actions'
import { Button } from '@/components/ui/button'
import FormQuestionCardComponent from './FormQuestionCard'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { SelectArrow } from '@radix-ui/react-select'
import SelectComponent from './SelectComponent'
import Link from 'next/link'

export default function SelectedFormCard({
  selectedForm,
  setRefresh,
  refresh,
  formsLength,
}: {
  selectedForm: FormEntity
  setRefresh: (value: boolean) => void
  refresh: boolean
  formsLength: number
}) {
  const [questions, setQuestions] = useState<QuestionEntity[]>(
    selectedForm.perguntas,
  )
  const [order, setOrder] = useState<number>(selectedForm.ordem)
  const getNewQuestion = async (id: string) => {
    await createEmptyQuestion(id)
    const questionsRes = (await fetch(`/api/forms/${id}/questions`).then((r) =>
      r.json(),
    )) as QuestionEntity[]
    setQuestions(questionsRes)
  }
  const getQuestions = async () => {
    const questionsRes = (await fetch(
      `/api/forms/${selectedForm.id}/questions`,
    ).then((r) => r.json())) as QuestionEntity[]
    setQuestions(questionsRes)
  }
  useEffect(() => {}, [selectedForm, refresh])
  return (
    <Card className="w-full h-full">
      <CardContent>
        <CardHeader>
          <CardTitle className="text-4xl py-4">
            <div className="flex items-center w-full justify-between ">
              <p>{selectedForm.titulo ?? ''}</p>
              <SelectComponent
                placeHolder={selectedForm.ordem}
                setValue={setOrder}
                valuesLength={formsLength}
              />
            </div>
            <form
              action={updateForm}
              className="flex flex-col justify-center gap-x-4 gap-y-4"
            >
              <Input value={order} name="order" type="hidden" />
              <Input value={selectedForm.id} name="id" type="hidden" />
              <Input
                className="text-4xl my-4"
                defaultValue={selectedForm.titulo ?? ''}
                name="title"
              />
              <Textarea
                name="description"
                defaultValue={selectedForm.descricao ?? ''}
              />
              <Button
                type="submit"
                className="bg-blue-400 cursor-pointer text-xl py-6 px-6"
              >
                Salvar
              </Button>
            </form>
          </CardTitle>
        </CardHeader>
        <div className="py-4 flex items-center gap-x-8">
          <Input type="hidden" name="formId" value={selectedForm.id ?? ''} />
          <Button
            onClick={() => getNewQuestion(selectedForm.id)}
            className="bg-blue-400 cursor-pointer text-xl py-6 px-6"
          >
            Adicionar Pergunta
          </Button>
          <Link
            className="text-blue-800"
            href={`/formulario/${selectedForm.id}`}
          >
            Visitar Página de Formulario
          </Link>
        </div>
        <CardDescription className="space-y-6 ">
          {questions?.map((question: QuestionEntity) => (
            <FormQuestionCardComponent
              getNewQuestion={getQuestions}
              refresh={refresh}
              setRefresh={setRefresh}
              key={question.id}
              questionsLength={questions.length || 0}
              question={question}
            />
          ))}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
