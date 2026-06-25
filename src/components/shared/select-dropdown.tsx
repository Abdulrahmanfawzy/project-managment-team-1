import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  contentClassName?: string;
};

export default function SelectDropdown({
  value,
  onValueChange,
  options,
  className = "w-18",
  contentClassName = "w-32",
}: SelectDropdownProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button variant="outline">{selected?.label ?? value}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={contentClassName}>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
