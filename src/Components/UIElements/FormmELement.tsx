import React, { type JSX } from 'react'
import { Input } from '../ui/input'
import { ComboboxBox } from './DropDownMenu'
import { SwitchElement } from './switch'
import { X } from 'lucide-react'

type Props = {
  fieldId: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  dataType?: string;
  defaultType?: string;
  isRequired?: boolean;

  onDelete?: (id: string) => void;
  onFieldNameChange?: (value: string) => void;
  onDataTypeChange?: (value: string) => void;
  onRequiredToggle?: (value: boolean) => void;

  placeholder?: string;
}

function FormElement({
  fieldId,
  className,
  value,
  defaultValue,
  dataType,
  defaultType,
  isRequired,
  onDelete,
  onFieldNameChange,
  onDataTypeChange,
  onRequiredToggle,
  placeholder,
}: Props): JSX.Element {
  return (
    <div className={`w-full p-2 flex justify-between gap-2 items-center min-w-fit sm:min-w-[400px] bg-neutral-900 rounded-md ${className || ''}`}>
      <Input
        type='text'
        value={value}
        onChange={(e) => onFieldNameChange?.(e.target.value)}
        placeholder={placeholder || 'Field Name'}
        className='max-w-sm min-w-[100px] text-white active:outline-none'
      />

      <ComboboxBox
        defaultType={defaultType}
        onSelect={(val) => onDataTypeChange?.(val)}
        
      />

      <SwitchElement
        isChecked={isRequired}
        onToggle={(val) => onRequiredToggle?.(val)}
      />

      <button
         onClick={() => onDelete?.(fieldId)}
        className='p-2 rounded-md h-full text-white hover:text-red-600 cursor-pointer transition-colors'
      >
        <X />
      </button>
    </div>
  )
}

export default FormElement
