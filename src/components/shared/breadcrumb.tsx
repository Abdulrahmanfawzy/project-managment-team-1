import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm text-muted-foreground",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1; //the first component

        return (
          <Fragment key={`${item.label}-${index}`}>
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast && "text-text-h")}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="size-4" />}
          </Fragment>
        );
      })}
    </div>
  );
}
