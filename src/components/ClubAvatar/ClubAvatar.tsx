import { cn } from '@/lib/utils';
import { stringToColorPair } from '@/utils/styles';

export interface ClubAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  size: number;
}

export const ClubAvatar: React.FC<ClubAvatarProps> = (props) => {
  const { text, size, style = {}, className, ...divProps } = props;

  const { textColor, backgroundColor } = stringToColorPair(text);

  const shortText = text.slice(0, 1).toUpperCase();

  return (
    <div
      className={cn('rounded-lg flex items-center justify-center font-bold', className)}
      style={{ width: size, height: size, backgroundColor, color: textColor, ...style }}
      {...divProps}
    >
      {shortText}
    </div>
  );
};
