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
      text: 'item 2',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked src');
      },
    },
    {
      text: 'item 3',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 3');
      },
    },
    {
      text: 'item 4',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 4');
      },
    },
    {
      text: 'item 5',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 5');
      },
    },
    {
      text: 'item 6',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 6');
      },
    },
    {
      text: 'item 7',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 7');
      },
    },
    {
      text: 'item 8',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 8');
      },
    },
    {
      text: 'item 9',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 9');
      },
    },
    {
      text: 'item 10',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 10');
      },
    },
    {
      text: 'item 11',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 11');
      },
    },
    {
      text: 'item 12',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 12');
      },
    },
    {
      text: 'item 13',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 13');
      },
    },
    {
      text: 'item 14',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked item 14');
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
        max={5}
        showMaxPopover
      />
    </Fragment>
  );
};
