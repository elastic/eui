import React from 'react';
import { PlaygroundView } from './views/playground_view';
import { childRoutes } from './playground_routes';

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
