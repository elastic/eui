/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Completely hide props from Storybook's controls panel.
 * Should be passed or spread to `argTypes`
 */
export const hideStorybookControls = (propNames: string[]) => {
  return propNames.reduce(
    (obj, name) => ({ ...obj, [name]: HIDE_CONTROL }),
    {}
  );
};
const HIDE_CONTROL = { table: { disable: true } };

/**
 * Leave props visible in Storybook's controls panel, but disable them
 * from being controllable (renders a `-`).
 *
 * Should be passed or spread to `argTypes`
 */
export const disableStorybookControls = (propNames: string[]) => {
  return propNames.reduce(
    (obj, name) => ({ ...obj, [name]: DISABLE_CONTROL }),
    {}
  );
};
const DISABLE_CONTROL = { control: false };
