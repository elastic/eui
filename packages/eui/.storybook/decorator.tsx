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
  PropsWithChildren,
} from 'react';
import { Global, css } from '@emotion/react';
import type { Preview } from '@storybook/react';
import { EuiThemeBorealis } from '@elastic/eui-theme-borealis';

import { EuiThemeColorMode } from '../src/services';
import { useEuiTheme } from '../src/services/theme';
import { EuiProvider, EuiProviderProps } from '../src/components/provider';

export const AVAILABLE_THEMES = [
  {
    text: 'Borealis',
    value: EuiThemeBorealis.key,
    provider: EuiThemeBorealis,
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
  // so that VRT screenshots correctly capture them
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
      <StorybookBackground>
        <div id="story-wrapper" ref={setPortalSibling} css={writingModeCss}>
          {portalInsert && children}
        </div>
      </StorybookBackground>
    </EuiProvider>
  );
};

const StorybookBackground: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <Global
        styles={css`
          html {
            /* We align with the content level instead of the app level styling */
            background-color: ${euiTheme.colors.backgroundBasePlain};
          }
        `}
      />
      {children}
    </>
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

const storybookToolbarColorModes = [
  { value: 'light', title: 'Light mode', icon: 'circlehollow' as const },
  { value: 'dark', title: 'Dark mode', icon: 'circle' as const },
] satisfies Array<{ value: EuiThemeColorMode; title: string; icon: string }>;

const storybookToolbarHighContrastMode = [
  { value: 'false', title: 'High contrast off', icon: 'circlehollow' as const },
  { value: 'true', title: 'High contrast on', icon: 'circle' as const },
];

const storybookToolbarWritingModes = [
  { value: 'ltr', title: 'LTR', icon: 'arrowleft' as const },
  { value: 'rtl', title: 'RTL', icon: 'arrowright' as const },
  { value: 'vertical-lr', title: 'Vertical LTR', icon: 'arrowup' as const },
  { value: 'vertical-rl', title: 'Vertical RTL', icon: 'arrowdown' as const },
  { value: 'sideways', title: 'Sideways LTR', icon: 'collapse' as const },
] satisfies Array<{ value: WritingModes; title: string; icon: string }>;

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
      ? 'true'
      : 'false',
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
};
