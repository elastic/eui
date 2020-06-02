import React, { useState, useEffect } from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
} from '../../../../src/components/header';
import { EuiSwitch } from '../../../../src/components/form';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiAvatar } from '../../../../src/components/avatar';
// @ts-ignore
import HeaderUpdates from './header_updates';

export default () => {
  const [isFixed, setIsFixed] = useState(false);

  const breadcrumbs = [
    {
      text: 'Management',
      href: '#',
    },
    {
      text: 'Users',
    },
  ];

  /**
   * Docs Note: This additional class is needed only for docs to override the usualy single header
   */
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
            borders: 'right',
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
            borders: 'none',
          },
          {
            items: isFixed ? [<HeaderUpdates />] : undefined,
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
        onChange={e => setIsFixed(e.target.checked)}
      />
      <EuiSpacer />
      {headers}
    </>
  );
};
