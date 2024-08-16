import ZapIcon from '@/assets/icons/zap.svg';
import { cn } from '@/lib/utils';
import { CircleHelp, House, LineChart, Medal, QrCode, Share, SlidersVertical, UserCog, Users } from 'lucide-react';
import { Link, LinkProps } from 'react-router-dom';

const iconKeyToComponent = {
  house: House,
  users: Users,
  'chart-line': LineChart,
  medal: Medal,
  sliders: SlidersVertical,
  'user-config': UserCog,
  'circle-help': CircleHelp,
  'qr-code': QrCode,
  share: Share,
};

export interface NavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  isSelected?: boolean;
  icon?: keyof typeof iconKeyToComponent;
  title: string;
  paidFeature?: boolean;
  to: LinkProps['to'];
}

export const NavItem: React.FC<NavItemProps> = (props) => {
  const { icon, title, paidFeature, isSelected, className, to, ...liProps } = props;

  const Icon = icon && iconKeyToComponent[icon];

  return (
    <li className={cn('list-none pointer-events-auto', className)} {...liProps}>
      <Link
        to={to}
        className={cn(
          'flex text-gray-600 text-sm font-medium items-center h-[34px] rounded-lg gap-x-2 hover:text-gray-950 hover:cursor-pointer',
          isSelected && 'bg-[#F5F7FE] text-gray-950 px-2.5'
        )}
      >
        {Icon && <Icon size={16} strokeWidth={2.5} />}
        <span className="flex flex-1">{title}</span>
        {paidFeature && (
          <div className="bg-yellow-300 w-5 h-[18px] rounded-[10px] flex justify-center items-center">
            <ZapIcon />
          </div>
        )}
      </Link>
    </li>
  );
};
