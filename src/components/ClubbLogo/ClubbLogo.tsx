import { cn } from '@/lib/utils';

export const ClubbLogo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...divProps }) => (
  <div className={cn('font-recoleta-bold text-[#343250] text-[36px] flex items-center', className)} {...divProps}>
    clubb <span className="font-paytone-one bg-[#ff2c78] text-white text-[10px] px-2 rounded-full ml-4">BETA</span>
  </div>
);
