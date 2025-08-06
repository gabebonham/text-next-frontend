'use client'
import FormEntity from '@/app/_entities/FormEntity'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FormCard({
  handleSelect,
  selectedForm,
  isSelected,
  refresh,
  setRefresh,
}: {
  handleSelect: (value: FormEntity) => void
  selectedForm: FormEntity
  isSelected: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean
}) {
  const handleDelete = async () => {
    const forms = await fetch(`/api/forms/${selectedForm.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setRefresh(!refresh)
  }

  return (
    <Card
      className={`${isSelected && 'shadow-blue-500 shadow-lg'}  w-96 px-8 mx-4`}
    >
      <CardTitle className="flex items-center justify-between w-full">
        {selectedForm.titulo}{' '}
        <button onClick={() => handleDelete()}>
          <XCircle className="text-red-500 cursor-pointer size-8" />
        </button>
      </CardTitle>
      <CardDescription className="flex items-center w-full justify-between">
        <p> {selectedForm.descricao}</p>
        <Button
          className="bg-blue-400 cursor-pointer text-xl py-6 px-6"
          onClick={() => handleSelect(selectedForm)}
        >
          Visualizar
        </Button>
      </CardDescription>
      <CardFooter>
        Perguntas: {selectedForm.perguntas.length?.toString()}
      </CardFooter>
    </Card>
  )
}
