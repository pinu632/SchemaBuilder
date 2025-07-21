"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"


const dataTypes = [
  {
    value: "string",
    label: "String",
  },
  {
    value: "number",
    label: "Number",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
  {
    value: "null",
    label: "Null",
  },
  {
    value: "array",
    label: "Array",
  },
  {
    value: "object",
    label: "Object (Nested)",
  },
  {
    value: "int[]",
    label: "int[]",
  },
  {
    value: "string[]",
    label: "string[]",
  },
  {
    value: "JSON[]",
    label: "JSON[]",
  },
]

type ComboboxBoxProps = {
  defaultType?: string;
  onSelect?: (value: string) => void;
}

export function ComboboxBox(
  { defaultType="string", onSelect }: ComboboxBoxProps
) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px]  sm:w-[200px] justify-between"
        >
          {value
            ? dataTypes.find((type) => type.value === value)?.label
            : "Select data type"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search data type..." className="h-9" />
          <CommandList>
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup>
              {dataTypes.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    onSelect?.(currentValue)
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {type.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
