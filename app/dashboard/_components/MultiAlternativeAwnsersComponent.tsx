'use client'

import AwnserEntity from '@/app/_entities/AwnserEntity'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import SelectComponent from './SelectComponent'
import { createResposta, deleteResposta } from '../_actions/actions'
import { X } from 'lucide-react'

export default function MultiAlternativeAwnserComponent({
  respostas,
  questionId,
}: {
  respostas: AwnserEntity[]
  questionId: string
}) {
  const [awnsers, setAwnsers] = useState<AwnserEntity[]>(respostas)

  const [inp, setInp] = useState<string>('')
  const [order, setOrder] = useState<number>(0)
  const handleAddAwnser = async () => {
    const newAwnserObj = {
      resposta: inp,
      idpergunta: questionId,
      respostaaberta: false,
      ordem: order,
    } as AwnserEntity
    await createResposta(newAwnserObj as AwnserEntity)

    setAwnsers((prev) => [...prev, newAwnserObj])
    setInp('')
  }
  const handleDeleteAwnser = async (id: string) => {
    const newAwnsersList = awnsers.filter((awnser) => awnser.id != id)
    await deleteResposta(id)

    setAwnsers(newAwnsersList)
  }
  return (
    <Card className="px-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <h1>Adicionar Opção</h1>
          <div className="flex flex-col gap-y-2 pt-2">
            <Input
              value={inp}
              onChange={(e) => setInp(e.currentTarget.value as string)}
            />
            <div className="flex gap-x-2 items-center">
              <SelectComponent
                placeHolder={'Ordem'}
                valuesLength={respostas.length + 1}
                setValue={setOrder}
              />
              <Button
                className="bg-blue-400 hover:bg-blue-400/60 cursor-pointer"
                onClick={() => inp && handleAddAwnser()}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h1>Respostas Possíveis</h1>
          <div className="grid grid-cols-2 gap-2 py-2">
            {awnsers && awnsers.length > 0
              ? awnsers.map((awnser) => (
                  <Badge
                    onClick={() => handleDeleteAwnser(awnser.id)}
                    className="rounded-2xl bg-yellow-700 cursor-pointer"
                  >
                    {awnser?.resposta}
                    <X />
                  </Badge>
                ))
              : 'Sem respostas'}
          </div>
        </div>
      </div>
    </Card>
  )
}
