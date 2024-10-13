import ZapIcon from '@/assets/icons/zap-color.svg';
import { MembersTable } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faker } from '@/utils/client';
import { Search, Share } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Members: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [rowsSelected, setRowsSelected] = useState<number>(0);

  const { t } = useTranslation();
  const members = useMemo(() => faker.fakeMembers(250), []);

  return (
    <div className="text-gray-900 text-sm mt-2">
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <Button variant="outline" className="min-h-9 font-normal flex gap-x-2">
            <Share size={16} />
            {t('common.export')}
            <ZapIcon />
          </Button>
          <div className="flex items-center shadow-sm border rounded-md border-input px-4">
            <Search size={16} />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="shadow-none border-0 outline-none focus-visible:ring-0 w-[86px] focus:min-w-[300px]"
              placeholder={t('common.searchPlaceholder')}
            />
          </div>
        </div>
        {rowsSelected > 0 && (
          <Button variant="destructive" className="min-h-9 font-normal flex gap-x-2">
            {t('common.blockUser')}
          </Button>
        )}
      </div>
      <div className="mt-5">
        <MembersTable
          members={members}
          searchValue={searchValue}
          onMemberAction={() => {}}
          setRowsSelected={setRowsSelected}
        />
      </div>
    </div>
  );
};
