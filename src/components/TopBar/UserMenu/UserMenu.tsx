import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { CircleUserRound, LogOut, Settings, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const iconKeyToComponent = {
  settings: Settings,
  user: UserRound,
  logout: LogOut,
};

export type UserMenuItem = {
  icon: keyof typeof iconKeyToComponent;
  title: string;
  href?: string;
  onClick?: () => void;
  to?: string;
  id: string;
  separator?: boolean;
};

export interface UserMenuProps {
  title: string;
  items: UserMenuItem[];
}

export const UserMenu: React.FC<UserMenuProps> = (props) => {
  const { items, title } = props;
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={(o) => setOpen(o)} open={open}>
      <DropdownMenuTrigger asChild className="text-gray-600">
        <Button variant="ghost" className="flex">
          <CircleUserRound size={16} strokeWidth={2.5} />
          <span className="flex flex-1 ml-2">{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 text-gray-600">
        <DropdownMenuGroup>
          {items.map((item) => {
            const Icon = iconKeyToComponent[item.icon];

            const content = (
              <>
                <Icon className="mr-2 h-4 w-4" strokeWidth={2} />
                <span>{item.title}</span>
              </>
            );

            let container: React.ReactNode = null;
            const commonStyles = 'flex w-full items-center';

            if (item.href) {
              container = (
                <a href={item.href} target="_blank" className={commonStyles}>
                  {content}
                </a>
              );
            } else if (item.to) {
              container = (
                <Link to={item.to} className={commonStyles} onClick={() => setOpen(false)}>
                  {content}
                </Link>
              );
            } else if (item.onClick) {
              container = (
                <Button
                  variant="ghost"
                  onClick={item.onClick}
                  className={cn(commonStyles, 'flex justify-start p-0 h-min')}
                >
                  {content}
                </Button>
              );
            } else {
              container = <div className={commonStyles}>{content}</div>;
            }

            return (
              <>
                <DropdownMenuItem key={item.id} className="cursor-pointer">
                  {container}
                </DropdownMenuItem>
                {item.separator && <DropdownMenuSeparator />}
              </>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
