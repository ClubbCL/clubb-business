import { BookCheck, ChevronsUpDown, CircleHelp, FileCode2, FileText, Headset } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const iconKeyToComponent = {
  'file-text': FileText,
  'book-check': BookCheck,
  'file-code': FileCode2,
  headset: Headset,
};

export type HelpMenuItem = {
  icon: keyof typeof iconKeyToComponent;
  title: string;
  href: string;
  id: string;
};

export interface HelpMenuItemProps {
  title: string;
  items: HelpMenuItem[];
}

export const HelpMenu: React.FC<HelpMenuItemProps> = (props) => {
  const { items, title } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-gray-600">
        <Button variant="outline" className="w-full flex">
          <CircleHelp size={16} strokeWidth={2.5} />
          <span className="flex flex-1 ml-2">{title}</span>
          <ChevronsUpDown size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-gray-600">
        <DropdownMenuGroup>
          {items.map((item) => {
            const Icon = iconKeyToComponent[item.icon];

            return (
              <DropdownMenuItem key={item.id} className="cursor-pointer">
                <a href={item.href} target="_blank" className="flex items-center">
                  <Icon className="mr-2 h-4 w-4" strokeWidth={2} />
                  <span>{item.title}</span>
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
