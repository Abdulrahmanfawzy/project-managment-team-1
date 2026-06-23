import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ProjectSelect() {
    return (
        <Select>
            <SelectTrigger className="w-40">
                <SelectValue placeholder="Project 1" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="project-1">
                    Project 1
                </SelectItem>

                <SelectItem value="project-2">
                    Project 2
                </SelectItem>
            </SelectContent>
        </Select>
    );
}