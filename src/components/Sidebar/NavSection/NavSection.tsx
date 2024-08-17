import { NavItem, NavItemProps } from '@components/Sidebar/NavItem';

export interface NavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  items: Array<NavItemProps & { id: string }>;
}

export const NavSection: React.FC<NavSectionProps> = (props) => {
  const { title, items, ...divProps } = props;

  return (
    <div {...divProps}>
      {title && <div className="text-xs text-gray-400 font-medium mb-1">{title}</div>}
      <ul>
        {items.map((item) => (
          <li key={item.id} className="cursor-pointer">
            <NavItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
