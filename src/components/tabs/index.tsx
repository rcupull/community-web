import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

interface TabItem<L extends string = string> extends StyleProps {
  label: L;
  content: React.ReactNode;
}

type ItemRender<L extends string = string> = (args: {
  selected: boolean;
  label: L;
  index: number;
}) => React.ReactElement;

export interface TabsProps<L extends string = string> extends StyleProps {
  items: Array<TabItem<L>>;
  itemRenderType?: 'classic' | 'rounded';
  itemRender?: ItemRender<L>;
  selected?: number;
  onSelect?: (newSelected: number) => void;
  contentClassName?: string;
}

const clasicItemRender: ItemRender = ({ selected, label }) => {
  return (
    <div
      className={cn(
        'w-full mx-1 max-w-28 text-center p-2 bg-gray-50 rounded-sm hover:bg-gray-100 border-b-2 border-transparent',
        {
          '!border-indigo-600': selected,
        },
      )}
    >
      {label}
    </div>
  );
};

export const Tabs = <L extends string = string>({
  items,
  className,
  onSelect,
  selected,
  itemRender = clasicItemRender,
  contentClassName,
}: TabsProps<L>) => {
  return (
    <Tab.Group selectedIndex={selected} onChange={onSelect}>
      <Tab.List className={cn('flex', className)}>
        {items.map(({ label, className }, index) => {
          return (
            <Tab key={index} as={Fragment}>
              {({ selected }) => {
                return (
                  <div className={cn('cursor-pointer focus-visible:outline-none', className)}>
                    {itemRender({ label, selected, index })}
                  </div>
                );
              }}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels>
        {items.map(({ content }, index) => {
          return (
            <Tab.Panel className={cn('pt-4', contentClassName)} key={index}>
              {content}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};
