import React from 'react';
import { PlaygroundView } from './views/playground_view';
import ButtonExample from './views/button/playground';

const childRoutes = [
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

export const playgrounds = [
  {
    path: '/playgrounds',
    component: PlaygroundView,
    indexRoute: {
      component: () => <div>play</div>,
      source: 'views/home/HomeView',
    },
    childRoutes,
  },
];
