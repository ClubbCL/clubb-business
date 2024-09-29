import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PaginationButton } from '../Pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter?: string;
  columnFilters?: ColumnFiltersState;
}

export function DataTable<TData, TValue>({ columns, data, filter, columnFilters }: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const { t } = useTranslation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      globalFilter: filter,
    },
  });

  const { pageIndex } = pagination;
  const pageCount = table.getPageCount();

  const generatePageRange = useCallback(() => {
    const PAGE_RANGE = 5;
    const availableRange = Math.min(PAGE_RANGE, pageCount);
    const maxStartIndex = Math.max(pageCount - availableRange);
    const startIndex = Math.min(maxStartIndex, Math.max(pageIndex - 2, 0));

    const range: number[] = [];

    for (let i = startIndex; i < availableRange + startIndex; i++) {
      range.push(i);
    }

    return range;
  }, [pageIndex, pageCount]);

  const pageRange = generatePageRange();
  const hiddenNextPages = pageCount > 0 && pageRange.slice(-1)[0] < pageCount - 1;

  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-violet-50 hover:bg-violet-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-slate-800 font-semibold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <PaginationButton onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronsLeft size={16} />
        </PaginationButton>
        <PaginationButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft size={16} />
          {t('components.pagination.previous')}
        </PaginationButton>
        {pageRange.map((page) => (
          <PaginationButton key={page} onClick={() => table.setPageIndex(page)} isActive={pageIndex === page}>
            {page + 1}
          </PaginationButton>
        ))}
        {hiddenNextPages && <div>...</div>}
        <PaginationButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {t('components.pagination.next')}
          <ChevronRight size={16} />
        </PaginationButton>
        <PaginationButton onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
          <ChevronsRight size={16} />
        </PaginationButton>
      </div>
    </div>
  );
}
