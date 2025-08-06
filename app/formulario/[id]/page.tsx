'use client'

import FormEntity from '@/app/_entities/FormEntity'
import QuestionEntity from '@/app/_entities/QuestionEntity'
import SelectComponent from '@/app/dashboard/_components/SelectComponent'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@radix-ui/react-select'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import QuestionToAwnser from '../_components/QuestionToAwnser'

export default function FormPage() {
  const params = useParams()
  const id = params.id as string
  const [selectedForm, setForm] = useState<FormEntity | undefined>()
  const [send, setSend] = useState<boolean>(false)
  const handleGet = async () => {
    const res = await fetch(`/api/forms/${id}`).then((r) => r.json())
    setForm(res)
  }
  useEffect(() => {
    handleGet()
  }, [])
  return (
    <div className="w-full bg-blue-200 min-h-screen px-96 py-12">
      <div>
        <Card className="w-full h-full">
          <CardContent>
            <CardHeader>
              <CardTitle className="text-4xl py-4">
                <div className="flex items-center w-full justify-between ">
                  <p>{selectedForm?.titulo ?? ''}</p>
                </div>
                <div className="flex flex-col justify-center gap-x-4 gap-y-4">
                  <p>{selectedForm?.descricao ?? ''}</p>
                </div>
              </CardTitle>
            </CardHeader>

            <CardDescription className="space-y-6 ">
              {selectedForm?.perguntas?.map((question: QuestionEntity) => (
                <QuestionToAwnser send={send} question={question} />
              ))}
            </CardDescription>
          </CardContent>
          <CardFooter className="w-full flex items-center">
            <Button
              className="bg-green-400 cursor-pointer text-xl py-6 px-6"
              onClick={() => setSend(true)}
            >
              Enviar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
