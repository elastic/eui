import React, { Fragment } from 'react';

import { EuiBreadcrumbs } from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'root',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked root');
      },
      'data-test-subj': 'breadcrumbsroot',
    },
    {
      text: 'src',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked src');
      },
    },
    {
      text: 'components',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked components');
      },
    },
    {
      text: 'button',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked button');
      },
    },
    {
      text: 'button_empty',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked button_empty');
      },
    },
    {
      text: 'button_empty.tsx',
    },
  ];

  return (
    <Fragment>
      <EuiBreadcrumbs
        breadcrumbs={breadcrumbs}
        truncate={false}
        max={4}
        showMaxPopover
      />
    </Fragment>
  );
};
