import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutSectionSubProps extends ChildrenProp, StyleProps {
  title?: string;
}

export const LayoutPageSection = ({
  title,
  children,
  className,
}: LayoutSectionSubProps): JSX.Element => {
  return (
    <div className={cn('mt-4 w-full', className)}>
      {title && <h2 className="text-xl mt-3 mb-2">{title}</h2>}

      {children}
    </div>
  );
};
