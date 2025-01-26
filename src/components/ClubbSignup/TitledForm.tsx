import { Button } from '@ui/button';
import { ChevronLeft } from 'lucide-react';

export interface TitledFormProps {
  title: string;
  children: React.ReactNode;
  subTitle?: string;
  className?: string;
  titleContainerClassName?: string;
  onClickBack?: () => void;
}

export const TitledForm: React.FC<TitledFormProps> = (props) => {
  const { title, children, subTitle, className, titleContainerClassName, onClickBack } = props;

  return (
    <div className={className}>
      <div className={titleContainerClassName}>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {subTitle && <p className="text-sm">{subTitle}</p>}
      </div>
      {children}
      {onClickBack && (
        <Button className="mt-4 text-xs px-0 pr-1" variant="ghost" onClick={onClickBack}>
          <ChevronLeft size={14} className="mr-1" />
          Anterior
        </Button>
      )}
    </div>
  );
};
