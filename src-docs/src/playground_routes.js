import React from 'react';
import ButtonExample from './views/button/playground';

export const childRoutes = [
  {
    path: 'button',
    component: ButtonExample,
    name: 'EuiButton',
  },
  {
    path: '*',
    component: () => <div>Not Found</div>,
    name: 'Page Not Found',
  },
];
