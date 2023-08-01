import React, { useState, useEffect } from 'react';

import {
  EuiBreadcrumb,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiSwitch,
  EuiSpacer,
  EuiAvatar,
  EuiIcon,
} from '../../../../src/components';

export default () => {
  const [isFixed, setIsFixed] = useState(false);

  const breadcrumbs: EuiBreadcrumb[] = [
    {
      text: 'Management',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Users',
    },
  ];

  useEffect(() => {
    if (isFixed) document.body.classList.add('euiBody--headerIsFixed--double');

    return () => {
      document.body.classList.remove('euiBody--headerIsFixed--double');
    };
  }, [isFixed]);

  const headers = (
    <>
      <EuiHeader
        theme="dark"
        position={isFixed ? 'fixed' : 'static'}
        sections={[
          {
            items: [
              <EuiHeaderLogo iconType="logoElastic">Elastic</EuiHeaderLogo>,
            ],
          },
          {
            items: [
              <EuiHeaderSectionItemButton aria-label="Account menu">
                <EuiAvatar name="John Username" size="s" />
              </EuiHeaderSectionItemButton>,
            ],
          },
        ]}
      />
      <EuiHeader
        position={isFixed ? 'fixed' : 'static'}
        sections={[
          {
            items: [
              <EuiHeaderSectionItemButton aria-label="Account menu">
                <EuiAvatar type="space" name="Default Space" size="s" />
              </EuiHeaderSectionItemButton>,
            ],
            breadcrumbs: breadcrumbs,
          },
          {
            items: [
              <EuiHeaderSectionItemButton
                aria-label="News feed: Updates available"
                notification={true}
              >
                <EuiIcon type="cheer" size="m" />
              </EuiHeaderSectionItemButton>,
            ],
          },
        ]}
      />
    </>
  );

  return (
    <>
      <EuiSwitch
        label={'Make header fixed position'}
        checked={isFixed}
        onChange={(e) => setIsFixed(e.target.checked)}
      />
      <EuiSpacer />
      {headers}
    </>
  );
};
