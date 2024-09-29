import ZapIcon from '@/assets/icons/zap-color.svg';
import { FilterSelector, MembersTable } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faker } from '@/utils/client';
import { Search, Share } from 'lucide-react';
import { useMemo, useState } from 'react';

type FilterValue = 'all' | 'king' | 'expert' | 'beginner';

const levelFilterItems = [
  { name: 'All', value: 'all' },
  { name: 'King', value: 'king' },
  { name: 'Expert', value: 'expert' },
  { name: 'Beginner', value: 'beginner' },
];

export const Members: React.FC = () => {
  const [filter, setFilter] = useState<FilterValue>('all');
  const [searchValue, setSearchValue] = useState<string>();

  const members = useMemo(() => faker.fakeMembers(250), []);

  return (
    <div className="text-gray-900 text-sm mt-2">
      <div className="flex gap-x-2">
        <FilterSelector
          items={levelFilterItems}
          defaultValue="all"
          onValueChange={(value) => setFilter(value as FilterValue)}
        />
        <Button variant="outline" className="min-h-9 font-normal flex gap-x-2">
          <Share size={16} />
          Exportar
          <ZapIcon />
        </Button>
        <div className="flex items-center shadow-sm border rounded-md border-input px-4">
          <Search size={16} />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="shadow-none border-0 outline-none focus-visible:ring-0 w-[86px] focus:min-w-[300px]"
            placeholder="Buscar..."
          />
        </div>
      </div>
      <div className="mt-5">
        <MembersTable
          members={members}
          searchValue={searchValue}
          levelFilter={filter === 'all' ? undefined : filter}
          onMemberAction={() => {}}
        />
      </div>
    </div>
  );
};
