'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SelectComponent({
  setValue,
  values,
  valuesLength,
  placeHolder,
}: {
  setValue: (value: any) => void
  values?: any[]
  valuesLength?: number
  placeHolder: any
}) {
  return (
    <Select onValueChange={(value) => setValue(parseInt(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordem</SelectLabel>
          {Array.from({ length: valuesLength as number }, (_, i) => i + 1).map(
            (_, i) => (
              <SelectItem key={i} value={(i + 1).toString()}>
                {(i + 1).toString()}
              </SelectItem>
            ),
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
