import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { ListFilter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type FilterItemType = {
  name: string;
  value: string;
};

export interface FilterSelectorProps extends SelectProps {
  items: FilterItemType[];
}

export const FilterSelector: React.FC<FilterSelectorProps> = (props) => {
  const { items, ...selectProps } = props;

  const { t } = useTranslation();

  return (
    <Select {...selectProps}>
      <SelectTrigger className="rounded-lg h-9 w-auto">
        <div className="flex items-center">
          <ListFilter size={16} className="mr-2" />
          {t('components.filter.level')}:
          <span className="ml-1">
            <SelectValue />
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="cursor-pointer">
            <div className="flex items-center gap-x-2">
              <span>{item.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
