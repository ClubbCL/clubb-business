import { Member } from '@/utils/client/types';
import { ColumnFiltersState } from '@tanstack/react-table';
import { DataTable } from '../DataTable';
import { useMembersColumns, UseMemerColumnsProps } from './useMembersColumns';

export interface MembersTableProps extends UseMemerColumnsProps {
  members: Member[];
  searchValue?: string;
  levelFilter?: string;
  setRowsSelected: (rowsSelected: number) => void;
}

export const MembersTable: React.FC<MembersTableProps> = (props) => {
  const { members, setRowsSelected, searchValue, levelFilter, ...useMemberProps } = props;

  const columns = useMembersColumns(useMemberProps);

  const columnFilters: ColumnFiltersState = [...(levelFilter ? [{ id: 'level', value: levelFilter }] : [])];

  return (
    <DataTable
      columns={columns}
      data={members}
      filter={searchValue}
      columnFilters={columnFilters}
      setRowsSelected={setRowsSelected}
    />
  );
};
