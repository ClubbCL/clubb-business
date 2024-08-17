import { cn } from '@/lib/utils';
import { UserMenu, UserMenuProps } from '@components/TopBar/UserMenu';
import { Bell, MessageCircle } from 'lucide-react';

export interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: string;
  userMenu: UserMenuProps['items'];
}

export const TopBar: React.FC<TopBarProps> = (props) => {
  const { children, user, userMenu, className, ...divProps } = props;

  return (
    <div className={cn('flex items-center h-20 px-12 bg-white bg-opacity-95', className)} {...divProps}>
      <div className="flex flex-1">{children}</div>
      <div className="flex items-center text-gray-600">
        <Bell size={16} strokeWidth={2.5} className="mr-4 cursor-pointer" />
        <MessageCircle size={16} strokeWidth={2.5} className="cursor-pointer" />
        <UserMenu title={user} items={userMenu} />
      </div>
    </div>
  );
};
