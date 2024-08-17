import { cn } from '@/lib/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  topContent?: React.ReactNode;
  navigationContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { topContent, navigationContent, bottomContent, className, ...divProps } = props;

  return (
    <div className={cn('py-4 px-6 flex flex-col h-full', className)} {...divProps}>
      <div>{topContent}</div>
      <div className="flex flex-1 flex-col gap-y-5 my-12">{navigationContent}</div>
      <div>{bottomContent}</div>
    </div>
  );
};
