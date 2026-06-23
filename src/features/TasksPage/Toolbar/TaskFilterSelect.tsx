import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function TaskFilterSelect() {
    return (
        <Select>
            <SelectTrigger className="w-40">
                <SelectValue placeholder="My Task" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">
                    All Tasks
                </SelectItem>

                <SelectItem value="mine">
                    My Tasks
                </SelectItem>
            </SelectContent>
        </Select>
    );
}