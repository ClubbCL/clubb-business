import { cn } from '@/lib/utils';

export interface AppLayoutProps extends React.HTMLProps<HTMLDivElement> {
  nav?: React.ReactNode;
  header?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { nav, header, className, children } = props;

  return (
    <div className={cn('flex size-full', className)}>
      <nav className="w-[270px]">{nav}</nav>
      <div className="flex flex-col flex-1 overflow-auto">
        <header className="sticky top-0">{header}</header>
        <main className={`flex flex-col flex-1`}>{children}</main>
      </div>
    </div>
  );
};
