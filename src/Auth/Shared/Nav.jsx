import { Button } from "../../components/ui/button.tsx"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu.tsx"
export default function Nav() {
  const [position, setPosition] = React.useState("English")

    return (
        <nav className="flex justify-between items-center py-2 sm:py-4 px-5">
            <div className="">
                <h1 className="text-Auth-head-font-color font-semibold text-xl ">Collabspace</h1>
            </div>
            <div>
<DropdownMenu>
      <DropdownMenuTrigger asChild className=" w-18">
        <Button  variant="outline">{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="English">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="العربية">العربية</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Français">Français</DropdownMenuRadioItem>

          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
            </div>
        </nav>
    );
}