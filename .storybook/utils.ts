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

import type { Args, ArgTypes, Meta, Preview, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
  const updatedConfig = _updateArgTypes(config, propNames, [
    {
      key: 'table',
      value: { disable: true },
    },
  ]);

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
  const updatedConfig = _updateArgTypes(config, propNames, [
    {
      key: 'control',
      value: false,
    },
  ]);

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
  const updatedConfig = _updateArgTypes(config, propNames, [
    {
      key: 'table',
      value: { category },
    },
  ]);

  return updatedConfig;
};

/**
 * Configures passed argTypes to be setup as toggle control
 * which fires a Storybook action when enabled.
 * Should be used for function props only.
 *
 * Can be used for preview (Preview), component (Meta) or story (Story)
 * context by passing the config object for either. Use after defining
 * the specific config to be able to pass the config to this util.
 *
 * @returns the mutated config
 */
export const enableFunctionToggleControls = <Props>(
  config: StorybookConfig<Props>,
  propNames: Array<keyof Props>
) => {
  const setAction = (propName: string | number) => ({
    true: action(propName.toString()),
    false: undefined,
  });

  /* Sets the default value for the passed function prop.
  This is needed to ensure the coolean control is set and
  to prevent additional clicks.
  NOTE: This has to happen before the argTypes are updated */
  config.args = propNames.reduce(
    (acc, propName) => ({
      ...acc,
      [propName]: true,
    }),
    config.args
  );

  let updatedConfig = _updateArgTypes(config, propNames, [
    { key: 'control', value: 'boolean' },
    {
      key: 'mapping',
      value: setAction,
    },
  ]);

  updatedConfig = {
    ...updatedConfig,
    /* Overwrites global parameters.actions setting in preview.tsx which enables
    actions on function props starting with "on[Name]" by default. This is needed
    to ensure the default "false" state is actually false. */
    parameters: {
      ...updatedConfig.parameters,
      actions: {
        ...updatedConfig.parameters?.actions,
        argTypesRegex: null,
      },
    },
  };

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
  controls: Array<{
    key: string;
    value:
      | Record<string, any>
      | boolean
      | string
      | ((propName: any) => Record<string, any>);
  }>
): StorybookConfig<Props> => {
  const currentArgTypes = config.argTypes as Partial<ArgTypes<Props>>;
  const newArgTypes = { ...currentArgTypes };

  for (const propName of propNames) {
    for (const { key, value } of controls) {
      const currentArgTypeValue = newArgTypes?.[propName] ?? ({} as Args);
      const currentControlValue = currentArgTypeValue.hasOwnProperty(key)
        ? currentArgTypeValue[key]
        : ({} as Record<string, any>);

      let newValue = value;

      if (typeof value === 'function') {
        newValue = value(propName);
      }

      if (
        typeof value === 'object' &&
        typeof currentArgTypeValue[key] === 'object'
      ) {
        newValue = { ...currentControlValue, ...value };
      }

      newArgTypes[propName] = {
        ...currentArgTypeValue,
        [key]: newValue,
      };
    }
  }

  config.argTypes = newArgTypes;

  return config;
};
