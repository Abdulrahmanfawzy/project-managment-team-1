import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput({ value, onValueChange }: { value: string, onValueChange: (value: string) => void }) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                placeholder="Search"
                className="w-72 pl-10"
                value={value}
                onChange={(e) => onValueChange(e.target.value.toLowerCase())}
            />
        </div>
    );
}