import { Menu as MenuBase, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

interface MenuItem {
  label: string;
  href?: string;
  svg?: React.FunctionComponent<StyleProps>;
  onClick?: () => void;
}

export interface MenuProps extends StyleProps {
  items?: Array<MenuItem>;
  buttonElement: React.ReactNode;
  headerElement?: React.ReactNode;
}

export const Menu = ({ className, buttonElement, items, headerElement }: MenuProps) => {
  return (
    <MenuBase data-id="Menu" as="div" className={cn('relative', className)}>
      <div>
        <MenuBase.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          {buttonElement}
        </MenuBase.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuBase.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {headerElement}

          {items?.map(({ label, href, onClick, svg: Svg }, index) => (
            <MenuBase.Item key={label}>
              {({ active }) => {
                const svgNode = Svg && <Svg className={cn('h-5 w-5', { ['mr-2']: label })} />;
                if (href) {
                  return (
                    <Link
                      key={index}
                      to={href}
                      className={cn(
                        {
                          'bg-gray-100': active,
                        },
                        'px-4 py-2 text-sm text-gray-700 flex items-center',
                      )}
                    >
                      {svgNode}

                      {label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={index}
                    onClick={onClick}
                    className={cn(
                      'cursor-pointer px-4 py-2 text-sm text-gray-700 flex items-center',
                      {
                        'bg-gray-100': active,
                      },
                    )}
                  >
                    {svgNode}

                    {label}
                  </div>
                );
              }}
            </MenuBase.Item>
          ))}
        </MenuBase.Items>
      </Transition>
    </MenuBase>
  );
};