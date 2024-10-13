import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Member } from '@/utils/client/types';
import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import currency from 'currency.js';
import { format, Locale } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { ChevronDown, ChevronsUpDown, ChevronUp, EllipsisVertical, UserRoundX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

const locales: Record<string, Locale> = {
  en: enUS,
  es,
};

export type MemberAction = 'block';
export type MemberActionHandler = (action: MemberAction, member: Member) => void;

export interface UseMemerColumnsProps {
  onMemberAction: MemberActionHandler;
}

export const useMembersColumns = (props: UseMemerColumnsProps): ColumnDef<Member>[] => {
  const { onMemberAction } = props;

  const { t, i18n } = useTranslation();
  const dateFnsLocale = locales[i18n.language] || enUS;

  const getSortableHeader =
    (title: string, className?: string): (({ column }: HeaderContext<Member, unknown>) => JSX.Element) =>
    ({ column }) => {
      const sortDirection = column.getIsSorted();
      const Icon = !sortDirection ? ChevronsUpDown : sortDirection === 'asc' ? ChevronDown : ChevronUp;

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortDirection === 'asc')}
          className={twMerge('px-0 hover:bg-transparent font-semibold', className)}
        >
          {title}
          <Icon className="ml-2 h-4 w-4" />
        </Button>
      );
    };

  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          className="bg-white ml-6"
          checked={table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label={t('components.tables.members.headers.selectAll')}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="bg-white ml-6"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t('components.tables.members.headers.selectRow')}
        />
      ),
    },
    {
      accessorKey: 'username',
      header: getSortableHeader(t('components.tables.members.headers.user')),
    },
    {
      accessorKey: 'points',
      header: getSortableHeader(t('components.tables.members.headers.points')),
      cell: ({ row }) => {
        const points = currency(row.original.points, {
          precision: 0,
          separator: '.',
          decimal: ',',
        }).format({ symbol: '' });

        return <div className="text-left">{points}</div>;
      },
    },
    {
      accessorKey: 'totalPurchases',
      header: getSortableHeader(t('components.tables.members.headers.purchases')),
      cell: ({ row }) => {
        const totalPurchases = currency(row.original.totalPurchases, {
          precision: 0,
          separator: '.',
          decimal: ',',
        }).format();

        return <div className="text-left">{totalPurchases}</div>;
      },
    },
    {
      accessorKey: 'level',
      header: getSortableHeader(t('components.tables.members.headers.level')),
    },
    {
      accessorKey: 'visits',
      header: getSortableHeader(t('components.tables.members.headers.visits')),
    },
    {
      accessorKey: 'lastVisit',
      header: getSortableHeader(t('components.tables.members.headers.lastVisit')),
      cell: ({ row }) => {
        const lastVisit = format(row.original.lastVisit, 'PPP', { locale: dateFnsLocale });

        return <div className="text-left">{lastVisit}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer" onClick={() => onMemberAction('block', row.original)}>
              <div className="flex text-red-500">
                <UserRoundX size={16} className="mr-2" />
                {t('components.tables.members.actions.block')}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
};
