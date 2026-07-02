import React from "react";
import SelectDropdown from "@/components/shared/select-dropdown";

const languages = [
  { label: "English", value: "English" },
  { label: "العربية", value: "العربية" },
];

export default function Nav() {
  const [position, setPosition] = React.useState("English");

  return (
    <nav className="flex justify-between items-center py-2 sm:py-4 px-5">
      <div className="">
        <h1 className="text-Auth-head-font-color font-semibold text-xl ">
          Collabspace
        </h1>
      </div>
      <div>
        <SelectDropdown
          value={position}
          onValueChange={setPosition}
          options={languages}
        />
      </div>
    </nav>
  );
}
