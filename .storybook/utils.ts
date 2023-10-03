/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * argTypes configurations
 */

/**
 * Completely hide props from Storybook's controls panel.
 * Should be passed or spread to `argTypes`
 */
export const hideStorybookControls = <Props>(
  propNames: Array<keyof Props>
): Record<keyof Props, typeof HIDE_CONTROL> | {} => {
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
export const disableStorybookControls = <Props>(
  propNames: Array<keyof Props>
): Record<keyof Props, typeof DISABLE_CONTROL> | {} => {
  return propNames.reduce(
    (obj, name) => ({ ...obj, [name]: DISABLE_CONTROL }),
    {}
  );
};
const DISABLE_CONTROL = { control: false };

/**
 * parameters configurations
 */

/**
 * Will hide all props/controls. Pass to `parameters`
 *
 * TODO: Figure out some way to not show Storybook's "setup" text?
 */
export const hideAllStorybookControls = {
  controls: { exclude: /.*/g },
};

/**
 * Will hide the control/addon panel entirely for a specific story.
 * Should be passed or spread to to `parameters`.
 *
 * Note that users can choose to re-show the panel in the UI
 */
export const hidePanel = {
  options: { showPanel: false },
};
