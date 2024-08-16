import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClubAvatar } from '@components/ClubAvatar';
import { SelectProps } from '@radix-ui/react-select';
import { useTranslation } from 'react-i18next';

export type ClubItemType = {
  name: string;
  value: string;
};

export interface ClubSelectorProps extends SelectProps {
  clubs: ClubItemType[];
}

export const ClubSelector: React.FC<ClubSelectorProps> = (props) => {
  const { clubs, ...selectProps } = props;

  const { t } = useTranslation();

  return (
    <Select {...selectProps}>
      <SelectTrigger className="w-full h-11 rounded-lg">
        <SelectValue placeholder={t('components.sidebar.clubbSelector.placeholder')} />
      </SelectTrigger>
      <SelectContent className="w-full rounded-lg">
        {clubs.map((club) => (
          <SelectItem key={club.value} value={club.value} className="cursor-pointer">
            <div className="flex items-center gap-x-2 font-semibold">
              <ClubAvatar size={30} text={club.name} />
              <span>{club.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
