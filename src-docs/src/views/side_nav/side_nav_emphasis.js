import React, { useState } from 'react';

import { EuiSideNav } from '../../../../src/components';

export default () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Transactions');

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name) => {
    setSelectedItem(name);
  };

  const createItem = (name, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      ...data,
      id: name,
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
    };
  };

  const sideNav = [
    createItem('APM', {
      items: [
        createItem('Services', {
          items: [
            createItem('opbeans-java', {
              emphasize: true,
              isOpen: true,
              items: [
                createItem('Transactions'),
                createItem('Errors'),
                createItem('JVMs'),
              ],
            }),
          ],
        }),
        createItem('Traces'),
        createItem('Service map'),
      ],
    }),
  ];

  return (
    <EuiSideNav
      aria-label="Emphasized side nav example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
      style={{ width: 192, overflow: 'hidden' }}
    />
  );
};
