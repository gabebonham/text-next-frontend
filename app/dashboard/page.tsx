'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import FormCard from './_components/FormCard'
import { useEffect, useState } from 'react'
import SelectedFormCard from './_components/SelectedFormCard'
import FormEntity from '../_entities/FormEntity'
import { PlusCircle } from 'lucide-react'
import { createEmptyForm } from './_actions/actions'

export default function DashboardPage() {
  const [selectedForm, setSelectedForm] = useState<FormEntity | undefined>()
  const [forms, setForms] = useState<FormEntity[]>([])
  const [refresh, setRefresh] = useState<boolean>(true)
  const [refreshCreate, setRefreshCreate] = useState<boolean>(false)
  const handleGet = async () => {
    const forms = await fetch('/api/forms').then((r) => r.json())
    setForms(forms)
  }
  const handleSelect = async (form: FormEntity) => {
    setSelectedForm(form)
  }
  const handleCreate = async () => {
    await createEmptyForm()
  }
  useEffect(() => {
    if (refreshCreate) {
      handleCreate()
      setRefreshCreate(false)
    }
    handleGet()
  }, [refresh, refreshCreate])
  return (
    <div className="flex min-h-screen max-h-screen ">
      <div className="w-2/6 bg-blue-100 min-h-screen flex flex-col items-center  justify-center">
        <div className="flex items-center gap-x-8">
          <h1 className="py-8 text-3xl font-bold">Formulários</h1>
          <button onClick={() => setRefreshCreate(true)}>
            <PlusCircle className="size-10 text-green-600 cursor-pointer" />
          </button>
        </div>
        <div className="flex h-fit flex-col justify-center px-12 ">
          <ScrollArea className="max-h-[700px] overflow-y-auto">
            <div className="flex flex-col gap-y-6">
              {forms&&forms.map((currentForm: FormEntity) => (
                <FormCard
                  setRefresh={setRefresh}
                  key={currentForm?.id}
                  refresh={refresh}
                  selectedForm={currentForm}
                  handleSelect={handleSelect}
                  isSelected={currentForm?.id == selectedForm?.id}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="w-4/6 bg-blue-200 min-h-screen px-24 py-12">
        <ScrollArea className="max-h-[800px] overflow-y-auto rounded-2xl">
          <div>
            {selectedForm && (
              <SelectedFormCard
                formsLength={forms.length}
                refresh={refresh}
                setRefresh={setRefresh}
                selectedForm={selectedForm}
              />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
