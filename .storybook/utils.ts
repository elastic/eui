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

import type { ArgTypes, Meta, Preview, StoryObj } from '@storybook/react';

type StorybookConfig<T> = Meta<T> | StoryObj<T> | Preview;

/**
 * Completely hide props from Storybook's controls panel.
 *
 * Can be used for preview (Preview), component (Meta) or story (Story)
 * context by passing the config object for either. Use after defining
 * the specific config to be able to pass the config to this util.
 *
 * @returns the mutated config
 */
export const hideStorybookControls = <Props>(
  config: StorybookConfig<Props>,
  propNames: Array<keyof Props>
): StorybookConfig<Props> => {
  const updatedConfig = _updateArgTypes(config, propNames, {
    key: 'table',
    value: { disable: true },
  });

  return updatedConfig;
};

/**
 * Leave props visible in Storybook's controls panel, but disable them
 * from being controllable (renders a `-`).
 *
 * Can be used for preview (Preview), component (Meta) or story (Story)
 * context by passing the config object for either. Use after defining
 * the specific config to be able to pass the config to this util.
 *
 * @returns the mutated config
 */
export const disableStorybookControls = <Props>(
  config: StorybookConfig<Props>,
  propNames: Array<keyof Props>
): StorybookConfig<Props> => {
  const updatedConfig = _updateArgTypes(config, propNames, {
    key: 'control',
    value: false,
  });

  return updatedConfig;
};

/**
 * Configure provided args to be listed under a specified
 * category in the props table.
 *
 * Can be used for preview (Preview), component (Meta) or story (Story)
 * context by passing the config object for either. Use after defining
 * the specific config to be able to pass the config to this util.
 *
 * @returns the mutated config
 */
export const moveStorybookControlsToCategory = <Props>(
  config: StorybookConfig<Props>,
  propNames: Array<keyof Props>,
  category = 'Additional'
): StorybookConfig<Props> => {
  const updatedConfig = _updateArgTypes(config, propNames, {
    key: 'table',
    value: { category },
  });

  return updatedConfig;
};

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

/**
 * Internal helper function to merge `argTypes` objects into
 * a Storybook story config object
 *
 * @returns the mutated config
 */
const _updateArgTypes = <Props>(
  config: StorybookConfig<Props>,
  propNames: Array<keyof Props>,
  { key, value }: { key: string; value: Record<string, any> | boolean | string }
): StorybookConfig<Props> => {
  if (!Array.isArray(propNames)) return config;

  const currentArgTypes = config.argTypes as Partial<ArgTypes<Props>>;
  const newArgTypes = { ...currentArgTypes };

  for (const propName of propNames) {
    const currentValue = newArgTypes?.[propName] ?? {};
    const newValue =
      typeof value === 'object' ? { ...currentValue?.[key], ...value } : value;

    newArgTypes[propName] = {
      ...currentValue,
      [key]: newValue,
    };
  }

  config.argTypes = newArgTypes;

  return config;
};
