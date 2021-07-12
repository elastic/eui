import React, { useState } from 'react';

import { EuiSideNav } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const sideNav = [
    {
      name: 'Root item',
      id: htmlIdGenerator('basicExample')(),
      items: [
        {
          name: 'Item with onClick',
          id: htmlIdGenerator('basicExample')(),
          onClick: () => {},
        },
        {
          name: 'Item with href',
          id: htmlIdGenerator('basicExample')(),
          href: '/#/navigation/side-nav',
        },
        {
          name: 'Selected item',
          id: htmlIdGenerator('basicExample')(),
          onClick: () => {},
          isSelected: true,
        },
        {
          name: 'Disabled item',
          id: htmlIdGenerator('basicExample')(),
          disabled: true,
        },
      ],
    },
  ];

  return (
    <EuiSideNav
      aria-label="Basic example"
      mobileTitle="Basic example"
      toggleOpenOnMobile={() => toggleOpenOnMobile()}
      isOpenOnMobile={isSideNavOpenOnMobile}
      style={{ width: 192 }}
      items={sideNav}
    />
  );
};
