'use client'

import AwnserEntity from '@/app/_entities/AwnserEntity'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function AwnsersDrawer({
  awnsers,
}: {
  awnsers: AwnserEntity[]
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-green-400 cursor-pointer text-xl py-6 px-6">
          Respostas
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[800px]">
        <ScrollArea className="max-h-[800px] overflow-y-auto rounded-2xl">
          <div>
            {awnsers ? (
              awnsers.map((awnser) => (
                <div>
                  <p>{awnser.resposta}</p>
                  <p>
                    {awnser.respostaaberta
                      ? 'Pergunta aberta'
                      : 'Pergunta não aberta'}
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full h-96 text-center">
                Não há respostas ainda.
              </div>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
