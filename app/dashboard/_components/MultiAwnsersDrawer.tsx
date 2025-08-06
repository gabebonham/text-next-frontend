'use client'

import AwnserEntity from '@/app/_entities/AwnserEntity'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@radix-ui/react-select'

export default function MultiAwnsersDrawer({
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
          <div className="">
            {awnsers ? (
              awnsers.map((awnser) => (
                <div className="w-full h-96 text-center">
                  <p>{awnser.resposta}</p>
                  <p>{awnser.vezesrespondidas?.toString()}</p>

                  <Separator className="border-t-1 border-black/50 w-1/2 justify-self-center" />
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
