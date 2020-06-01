import React from 'react';
import buttonConfig from './views/button/playground';
import playground from './playground';

export const childRoutes = [
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
