import React from 'react';
import playground from './playground';
import buttonConfig from './views/button/playground';
import accordionConfig from './views/accordion/playground';

export const childRoutes = [
  {
    path: 'accordion',
    component: () => playground(accordionConfig()),
    name: 'EuiAccordion',
  },
  {
    path: 'button',
    component: () => playground(buttonConfig()),
    name: 'EuiButton',
  },
  {
    path: '*',
    component: () => <div>Not Found</div>,
    name: 'Page Not Found',
  },
];
