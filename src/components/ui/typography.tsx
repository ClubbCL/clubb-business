import { cn } from '@/lib/utils';

const variants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blackquote: 'blockquote',
  'inline-code': 'code',
  lead: 'p',
  large: 'p',
  small: 'small',
  muted: 'p',
};

export interface TypographyProps<T = undefined> extends React.HTMLProps<HTMLElement> {
  variant: keyof typeof variants;
  children?: React.ReactNode;
  component?: React.ElementType;
  componentProps?: T;
}

const variantStyles: Record<keyof typeof variants, string> = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  blackquote: 'mt-6 border-l-2 pl-6 italic',
  'inline-code': 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  lead: 'text-xl text-muted-foreground',
  large: 'text-lg font-semibold',
  small: 'text-sm font-medium leading-none',
  muted: 'text-sm text-muted-foreground',
};

export function Typography<T = undefined>({
  variant,
  className,
  component,
  children,
  componentProps,
  ...props
}: TypographyProps<T>) {
  const Component = component ? component : ((variants[variant] || 'p') as React.ElementType);
  const variantStyle = variantStyles[variant] || '';

  return (
    <Component className={cn(variantStyle, className)} {...props} {...(componentProps || {})}>
      {children}
    </Component>
  );
}
