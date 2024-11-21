/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useState,
  useMemo,
  FunctionComponent,
  useEffect,
  useCallback,
} from 'react';
import { css } from '@emotion/react';
import type { Preview } from '@storybook/react';
import { EuiThemeBorealis } from '@elastic/eui-theme-borealis';

import { EuiThemeColorMode } from '../src/services';
import { EuiProvider, EuiProviderProps } from '../src/components/provider';
import { EuiThemeAmsterdam } from '../src/themes';

export const AVAILABLE_THEMES = [
  {
    text: 'Borealis',
    value: EuiThemeBorealis.key,
    provider: EuiThemeBorealis,
  },
  {
    text: 'Amsterdam',
    value: EuiThemeAmsterdam.key,
    provider: EuiThemeAmsterdam,
  },
];

/**
 * Primary EuiProvider decorator to wrap around all stories
 * @see https://storybook.js.org/docs/writing-stories/decorators
 */
export const EuiProviderDecorator: FunctionComponent<
  EuiProviderProps<{}> & {
    writingMode: WritingModes;
    themeName: string;
  }
> = ({ children, writingMode, themeName, theme, ...euiProviderProps }) => {
  // Append portals into Storybook's root div (rather than <body>)
  // so that loki correctly captures them for VRT screenshots
  const [sibling, setPortalSibling] = useState<HTMLElement | null>(null);
  const portalInsert = useMemo(() => {
    if (sibling) {
      return {
        EuiPortal: { insert: { sibling, position: 'after' as const } },
      };
    }
  }, [sibling]);

  // Set CSS writing mode/direction on story-wrapper
  const writingModeCss = useMemo(
    () => [{ label: 'writingMode' }, writingModeStyles[writingMode]],
    [writingMode]
  );

  const getTheme = useCallback(() => {
    return AVAILABLE_THEMES.find((t) => themeName?.includes(t.value));
  }, [themeName]);

  const [_theme, setTheme] = useState(getTheme);

  useEffect(() => {
    if (!themeName || theme) return;

    setTheme(getTheme);
  }, [themeName, theme, getTheme]);

  const euiThemeProp = {
    theme: theme ?? _theme?.provider,
  };

  return (
    <EuiProvider
      componentDefaults={portalInsert}
      {...euiThemeProp}
      {...euiProviderProps}
    >
      <div id="story-wrapper" ref={setPortalSibling} css={writingModeCss}>
        {portalInsert && children}
      </div>
    </EuiProvider>
  );
};

/**
 * Styles used for testing CSS logical properties
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_writing_modes
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
 */
const writingModeStyles = {
  ltr: css`
    direction: ltr;
  `,
  rtl: css`
    direction: rtl;
  `,
  'vertical-lr': css`
    writing-mode: vertical-lr;
  `,
  'vertical-rl': css`
    writing-mode: vertical-rl;
  `,
  // Sideways RL is the same as vertical RL
  sideways: css`
    writing-mode: sideways-lr;
  `,
};
type WritingModes = keyof typeof writingModeStyles;

/**
 * Storybook toolbar types - define these separately so that we can ensure
 * their values match ones that EuiProviderDecorator expects
 */
type ToolbarDisplay = { title: string; icon: string };

const storybookToolbarColorModes: Array<
  ToolbarDisplay & { value: EuiThemeColorMode }
> = [
  { value: 'light', title: 'Light mode', icon: 'circlehollow' },
  { value: 'dark', title: 'Dark mode', icon: 'circle' },
];

const storybookToolbarHighContrastMode: Array<
  ToolbarDisplay & { value: boolean }
> = [
  { value: false, title: 'High contrast off', icon: 'circlehollow' },
  { value: true, title: 'High contrast on', icon: 'circle' },
];

const storybookToolbarWritingModes: Array<
  ToolbarDisplay & { value: WritingModes }
> = [
  { value: 'ltr', title: 'LTR', icon: 'arrowleft' },
  { value: 'rtl', title: 'RTL', icon: 'arrowright' },
  { value: 'vertical-lr', title: 'Vertical LTR', icon: 'arrowup' },
  { value: 'vertical-rl', title: 'Vertical RTL', icon: 'arrowdown' },
  { value: 'sideways', title: 'Sideways LTR', icon: 'collapse' },
];

/**
 * Export Storybook toolbar globals/context that affect our EuiProvider decorator
 * @see https://storybook.js.org/docs/essentials/toolbars-and-globals
 */
export const euiProviderDecoratorGlobals: Preview['globalTypes'] = {
  colorMode: {
    description: 'Color mode for EuiProvider theme',
    defaultValue: window?.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
    toolbar: {
      title: 'Color mode',
      items: storybookToolbarColorModes,
      dynamicTitle: true,
    },
  },
  highContrastMode: {
    description: 'High contrast mode for EuiProvider theme',
    defaultValue: window?.matchMedia?.('(prefers-contrast: more)').matches
      ? true
      : false,
    toolbar: {
      title: 'Contrast mode',
      items: storybookToolbarHighContrastMode,
      dynamicTitle: true,
    },
  },
  writingMode: {
    description: 'Writing mode for testing logical property directions',
    defaultValue: 'ltr',
    toolbar: {
      title: 'Writing mode',
      items: storybookToolbarWritingModes,
      dynamicTitle: true,
    },
  },
  theme: {
    description: 'Theme for EuiProvider',
    defaultValue: EuiThemeBorealis.key,
    toolbar: {
      title: 'Theme',
      items: [
        { value: EuiThemeBorealis.key, title: 'Borealis', icon: 'box' },
        { value: EuiThemeAmsterdam.key, title: 'Amsterdam', icon: 'box' },
      ],
      dynamicTitle: true,
    },
  },
};
