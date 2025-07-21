
import { Switch } from "../ui/switch"

type SwitchElementProps = {
  isChecked?: boolean;
  onToggle?: (value: boolean) => void;
}

export function SwitchElement(
  { isChecked = false, onToggle }: SwitchElementProps
) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
      checked={isChecked}
      onCheckedChange={onToggle}

       className="bg-neutral-800" />
     
    </div>
  )
}
