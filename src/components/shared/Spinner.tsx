import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

// Small reusable loading spinner, reusing the same Loader2 icon the buttons use.
export default function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
