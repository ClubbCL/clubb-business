import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

export interface PageSelectorProps extends SelectProps {
  rowsSelection: number[];
  triggerClassName?: string;
}

export const PageSelector: React.FC<PageSelectorProps> = (props) => {
  const { rowsSelection, triggerClassName, ...selectProps } = props;

  const { t } = useTranslation();

  const rowsSelector = rowsSelection.map((row) => ({
    name: t('components.tables.common.rowsSelector', { rows: row }),
    value: row.toString(),
  }));

  return (
    <Select {...selectProps}>
      <SelectTrigger className={twMerge('rounded-lg h-9 w-auto', triggerClassName)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        {rowsSelector.map((item) => (
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
