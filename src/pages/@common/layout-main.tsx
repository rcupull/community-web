import { Popover } from '@headlessui/react';

import { useRouter } from 'hooks/useRouter';

import { Footer } from './footer';
import { SideBar } from './side-bar';

import { BusinessLogo } from 'pages/@common/business-logo';
import { Navbar } from 'pages/@common/nav-bar';
import { ChildrenProp } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutMainProps extends ChildrenProp {}

export const LayoutMain = ({ children }: LayoutMainProps): JSX.Element => {
  const { pathname } = useRouter();

  const isDashboard = pathname.includes('dashboard');

  const smSideBar = (
    <div
      className={cn('min-w-64 hidden h-screen', {
        'sm:block': isDashboard,
      })}
    >
      <SideBar />
    </div>
  );

  const xsSideBar = (
    <Popover className={cn('relative sm:hidden')}>
      {({ close }) => {
        return (
          <>
            <Popover.Button as="div" className="absolute -top-12">
              <div className="flex w-14 cursor-pointer">
                <BusinessLogo className="ml-auto" />
              </div>
            </Popover.Button>

            <Popover.Panel className="absolute z-10">
              <div className="min-w-64 h-screen" onClick={() => close()}>
                <SideBar />
              </div>
            </Popover.Panel>
          </>
        );
      }}
    </Popover>
  );

  return (
    <div className="flex flex-col h-screen">
      <Navbar className="flex-shrink-0" />

      <div className="flex">
        {xsSideBar}
        {smSideBar}
        <div
          className={cn('w-full p-3', {
            'sm:w-[calc(100%-16rem)]': isDashboard,
          })}
        >
          {children}
        </div>
      </div>

      <Footer className="mt-auto flex-shrink-0" />
    </div>
  );
};
