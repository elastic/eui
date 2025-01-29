/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { fireEvent, waitFor } from '@testing-library/react';

const waitForPanelTransition = async () => {
  // Used document instead of container or screen due to context menus living in portals
  const getPanels = () => document.querySelectorAll('.euiContextMenuPanel');

  // 2 panels will appear for the transition animation
  await waitFor(() => {
    expect(getPanels().length).toEqual(2);
  });

  // Outgoing panel will be removed on animation end
  fireEvent.animationEnd(getPanels()[0]);
  if (getPanels().length > 1) {
    fireEvent.animationEnd(getPanels()[1]);
  }

  // Transition/animation is done once we're back to 1 panel
  expect(getPanels().length).toEqual(1);
};

export const EuiContextMenuTestHelpers = {
  waitForPanelTransition,
};
