import { cn } from '@/lib/utils';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react';

const bannerType = {
  info: {
    color: 'text-indigo-600',
    background: 'bg-violet-50',
    icon: Info,
  },
  warning: {
    color: 'text-yellow-500',
    background: 'bg-yellow-100',
    icon: CircleAlert,
  },
  success: {
    color: 'text-green-500',
    background: 'bg-green-200',
    icon: CircleCheck,
  },
  error: {
    color: 'text-red-500',
    background: 'bg-red-200',
    icon: CircleX,
  },
};

export type BannerType = keyof typeof bannerType;

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  type: BannerType;
  message: string;
}

export const Banner: React.FC<BannerProps> = (props) => {
  const { type, message } = props;

  const { icon: Icon, color: iconColor, background } = bannerType[type];

  return (
    <div className={cn(background, 'rounded-lg flex h-12 items-center whitespace-nowrap w-min px-4')}>
      <Icon size={16} strokeWidth={2} className={cn(iconColor, 'mr-1')} />
      <span className="text-sm text-gray-900 text-ellipsis overflow-hidden">{message}</span>
    </div>
  );
};