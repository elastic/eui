import React, { useState } from 'react';

import { EuiIcon, EuiSideNav } from '../../../../src/components';
import { slugify } from '../../../../src/services';

export default () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Time stuff');

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name) => {
    setSelectedItem(name);
  };

  const createItem = (name, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const sideNav = [
    createItem('Elasticsearch', {
      onClick: undefined,
      icon: <EuiIcon type="logoElasticsearch" />,
      items: [
        createItem('Data sources'),
        createItem('Users'),
        createItem('Roles'),
        createItem('Watches'),
        createItem(
          'Extremely long title will become truncated when the browser is narrow enough'
        ),
      ],
    }),
    createItem('Kibana', {
      onClick: undefined,
      icon: <EuiIcon type="logoKibana" />,
      items: [
        createItem('Advanced settings', {
          items: [
            createItem('General', { disabled: true }),
            createItem('Timelion', {
              items: [
                createItem('Time stuff', {
                  icon: <EuiIcon type="clock" />,
                }),
                createItem('Lion stuff', {
                  icon: <EuiIcon type="stats" />,
                }),
              ],
            }),
            createItem('Visualizations'),
          ],
        }),
        createItem('Index Patterns'),
        createItem('Saved Objects'),
        createItem('Reporting'),
      ],
    }),
    createItem('Logstash', {
      onClick: undefined,
      icon: <EuiIcon type="logoLogstash" />,
      items: [createItem('Pipeline viewer')],
    }),
  ];

  return (
    <EuiSideNav
      aria-label="Complex example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
      style={{ width: 192 }}
    />
  );
};
