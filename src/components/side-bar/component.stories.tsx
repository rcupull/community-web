import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { SideBar } from '.';

export default {
  component: SideBar,
};

export const Default = (): JSX.Element => {
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <button onClick={() => setCollapse(!collapse)}>Collapse</button>
      <SideBar
        collapse={collapse}
        items={[
          {
            label: 'Home',
            href: '/',
            svg: BellIcon,
          },
          {
            label: 'Sign In',
            href: '/sign-in',
            svg: XMarkIcon,
          },
          {
            label: 'Sign Up',
            href: '/sign-up',
            svg: Bars3Icon,
          },
          {
            label: 'Home',
            href: '/',
            svg: BellIcon,
          },
          {
            label: 'Sign In',
            href: '/sign-in',
            svg: XMarkIcon,
          },
          {
            label: 'Sign Up',
            href: '/sign-up',
            svg: Bars3Icon,
          },
        ]}
      />
    </>
  );
};
