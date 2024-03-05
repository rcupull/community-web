import { useEffect, useRef, useState } from 'react';

import { MutedBox } from 'components/muted-box';

import { useInterval } from 'hooks/useInterval';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { cn, range } from 'utils/general';

export interface SkeletonSearchProps extends StyleProps {
  layouts?: Business['layouts'];
  active?: boolean;
}

export const SkeletonSearch = ({ active, layouts }: SkeletonSearchProps) => {
  const type = layouts?.search?.type;

  const [selectedIndex, setSelectedIndex] = useState<Array<number>>([]);
  const interval = useInterval();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (type) {
      case 'postCategories': {
        return interval(
          [
            () => setSelectedIndex([2]),
            () => setSelectedIndex([2, 6]),
            () => setSelectedIndex([2, 6, 9]),
            () => setSelectedIndex([2, 9]),
            () => setSelectedIndex([9]),
            () => setSelectedIndex([]),
          ],
          1000,
        );
      }
      case 'postCategoriesScrollable': {
        return interval(
          [
            () => setSelectedIndex([2]),
            () => ref.current?.scrollTo({ left: 300, behavior: 'smooth' }),
            () => setSelectedIndex([2, 6]),
            () => ref.current?.scrollTo({ left: 300, behavior: 'smooth' }),
            () => setSelectedIndex([2, 6, 9]),
            () => ref.current?.scrollTo({ left: 0, behavior: 'smooth' }),
            () => setSelectedIndex([2, 9]),
            () => setSelectedIndex([9]),
            () => setSelectedIndex([]),
          ],
          1000,
        );
      }
      case 'postCategoriesExcluded': {
        return interval(
          [
            () => setSelectedIndex([2]),
            () => setSelectedIndex([6]),
            () => setSelectedIndex([9]),
            () => setSelectedIndex([]),
          ],
          1000,
        );
      }
      case 'postCategoriesExcludedScrollable': {
        return interval(
          [
            () => setSelectedIndex([2]),
            () => ref.current?.scrollTo({ left: 200, behavior: 'smooth' }),
            () => setSelectedIndex([6]),
            () => ref.current?.scrollTo({ left: 400, behavior: 'smooth' }),
            () => setSelectedIndex([9]),
            () => ref.current?.scrollTo({ left: 0, behavior: 'smooth' }),
            () => setSelectedIndex([]),
          ],
          1000,
        );
      }
    }

    return interval.cancel;
  }, [type]);

  const searchAndButtons = (
    <div className="w-40 flex gap-2">
      <MutedBox className="!h-6" active={active} />
      <MutedBox className="!w-8 !h-6" active={active} />
      <MutedBox className="!w-8 !h-6" active={active} />
    </div>
  );

  if (type === 'left') {
    return <div className="flex justify-start">{searchAndButtons}</div>;
  }

  if (type === 'center') {
    return <div className="flex justify-center">{searchAndButtons}</div>;
  }

  if (type === 'right') {
    return <div className="flex justify-end">{searchAndButtons}</div>;
  }

  if (type === 'postCategories') {
    return (
      <div className="flex gap-2 flex-wrap">
        {range(14).map((index) => (
          <MutedBox
            key={index}
            className={cn('!w-12 !h-6', { 'bg-gray-500': selectedIndex.includes(index) })}
            active={active}
          />
        ))}
      </div>
    );
  }

  if (type === 'postCategoriesScrollable') {
    return (
      <div ref={ref} className="flex gap-2 overflow-x-auto max-w-full">
        {range(14).map((index) => (
          <MutedBox
            key={index}
            className={cn('!w-12 !h-6 flex-shrink-0', {
              'bg-gray-500': selectedIndex.includes(index),
            })}
            active={active}
          />
        ))}
      </div>
    );
  }

  if (type === 'postCategoriesExcluded') {
    return (
      <div className="flex gap-2 flex-wrap">
        {range(14).map((index) => (
          <MutedBox
            key={index}
            className={cn('!w-12 !h-6', { 'bg-gray-500': selectedIndex.includes(index) })}
            active={active}
          />
        ))}
      </div>
    );
  }

  if (type === 'postCategoriesExcludedScrollable') {
    return (
      <div ref={ref} className="flex gap-2 overflow-x-auto max-w-full">
        {range(14).map((index) => (
          <MutedBox
            key={index}
            className={cn('!w-12 !h-6 flex-shrink-0', {
              'bg-gray-500': selectedIndex.includes(index),
            })}
            active={active}
          />
        ))}
      </div>
    );
  }

  return <></>;
};
