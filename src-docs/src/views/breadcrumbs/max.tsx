import React from 'react';

import { EuiBreadcrumbs, EuiInlineEditText } from '../../../../src/components';

export default () => {
  const editableBreadcrumbNotUsable = (
    <EuiInlineEditText
      inputAriaLabel="Edit breadcrumb text"
      defaultValue="Boa constrictor"
      size="s"
    />
  );

  const editableBreadcrumbUsable = (
    <EuiInlineEditText
      inputAriaLabel="Edit breadcrumb text"
      defaultValue="Nebulosa subspecies"
      size="s"
    />
  );

  const editableBreadcrumbTest = (
    <EuiInlineEditText
      inputAriaLabel="Edit breadcrumb text"
      defaultValue="For hoots and laughs"
      size="s"
    />
  );
  const breadcrumbs = [
    {
      text: editableBreadcrumbNotUsable,
      //href: '#',
    },
    {
      text: 'Metazoans',
      href: '#',
    },
    {
      text: 'Chordates',
      href: '#',
    },
    {
      text: editableBreadcrumbTest,
      //href: '#',
    },
    {
      text: 'Tetrapods',
      href: '#',
    },
    {
      text: 'Reptiles',
      href: '#',
    },
    {
      text: 'Alligator',
      href: '#',
    },
    {
      text: editableBreadcrumbUsable,
    },
  ];

  return (
    <EuiBreadcrumbs
      max={4}
      breadcrumbs={breadcrumbs}
      aria-label="An example of EuiBreadcrumbs with specifying max prop"
    />
  );
};
