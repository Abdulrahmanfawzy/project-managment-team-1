import { Fragment } from "react";
import {
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Header = {
    headName: string;
    className?: string;
    hasAccess?: boolean;
};

type TableBuilderProps<T> = {
    tableTitle?: string;
    tableHeaders: Header[];
    tableData: T[];
    hasPermissions?: boolean;
    renderRow: (_item: T, _index: number) => React.ReactNode;
    renderExtraRow?: () => React.ReactNode;
    headRowClasses?: string;
    tableHeaderClassName?: string;
    headerCTA?: () => React.ReactNode;
    footerCTA?: () => React.ReactNode;
    paginationCTA?: () => React.ReactNode;
};

export function TableBuilder<T>({
    hasPermissions = false,
    tableTitle,
    tableHeaders,
    tableData,
    renderRow,
    renderExtraRow,
    headRowClasses,
    tableHeaderClassName,
    headerCTA,
    footerCTA,
    paginationCTA,
}: TableBuilderProps<T>) {
    const { t } = useTranslation();

    return (
        <div className="bg-card grid rounded-xl">
            {tableTitle && (
                <div className="flex items-center justify-between px-6 py-3">
                    <h2 className="before:bg-brand relative font-semibold before:absolute before:inset-y-0.5 before:-inset-s-2 before:w-0.5">
                        {tableTitle}
                    </h2>

                    {headerCTA && headerCTA()}
                </div>
            )}
            <Table>
                {/* Table header and render passed header */}
                <TableHeader className={tableHeaderClassName}>
                    <TableRow className={cn(headRowClasses)}>
                        {tableHeaders.map((col, i) => (
                            <Fragment key={i}>
                                {hasPermissions ? (
                                    col.hasAccess && (
                                        <TableHead key={i} className={col.className}>
                                            {col.headName ? t(col.headName) : ""}
                                        </TableHead>
                                    )
                                ) : (
                                    <TableHead key={i} className={`${col.className}`}>
                                        {col.headName ? t(col.headName) : ""}
                                    </TableHead>
                                )}
                            </Fragment>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {/* Render dynamic data no matter the structure */}
                    {tableData.map((item, index) => renderRow(item, index))}

                    {/* Rendet the create new Entry in the table */}
                    {renderExtraRow && renderExtraRow()}
                </TableBody>

                {footerCTA && <TableFooter>{footerCTA?.()}</TableFooter>}
            </Table>

            {paginationCTA && paginationCTA?.()}
        </div>
    );
}
