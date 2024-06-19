/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* DISCLAIMER: Parts of this file were copied from Storybook jsxDecorator and adjusted for more specific needs.
https://github.com/storybookjs/storybook/blob/2bff7a1c156bbd42ab381f84b8a55a07694e7e53/code/renderers/react/src/docs/jsxDecorator.tsx#L224 */

import {
  ReactElement,
  FunctionComponent,
  ComponentType,
  ExoticComponent,
} from 'react';
import * as prettier from 'prettier';
import tsParser from 'prettier/parser-typescript';
import { StoryContext } from '@storybook/react';

// @ts-ignore - config import
import basePrettierConfig from '../../../../.prettierrc';

export const toPascalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/* Helpers for React specific checks */
export const isMemo = (component: ExoticComponent) =>
  component.$$typeof === Symbol.for('react.memo');
export const isForwardRef = (component: ExoticComponent) =>
  component.$$typeof === Symbol.for('react.forward_ref');
export const isFragment = (component: ReactElement | ExoticComponent) => {
  // use type guards to ensure keys are available
  const isReactElement = (el: any): el is ReactElement => el.type !== undefined;
  const isExoticComponent = (el: any): el is ExoticComponent =>
    el.$$typeof !== undefined;

  return isReactElement(component)
    ? component.type?.toString().includes('fragment')
    : isExoticComponent(component)
    ? component.$$typeof?.toString().includes('fragment')
    : false;
};

/* Helpers */
// returns the displayName and handles typing as
// otherwise `type` would not be typed
export const getElementDisplayName = (
  node: ReactElement
): string | undefined => {
  let displayName;

  if (typeof node.type === 'function' || typeof node.type === 'object') {
    const component = node.type as FunctionComponent;
    displayName = component.displayName ?? component.name ?? undefined;
  }

  return displayName;
};

// returns the displayName after resolving Emotion wrappers
export const getEmotionComponentDisplayName = (
  node: ReactElement
): string | undefined => {
  const displayName = getElementDisplayName(node);

  if (
    (typeof displayName === 'string' && displayName.startsWith('Emotion')) ||
    node.props?.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ != null
  ) {
    const { __EMOTION_TYPE_PLEASE_DO_NOT_USE__: emotionData } = node.props;
    const isForwardRefComponent = isForwardRef(emotionData);

    // we need to rely here on the reference Emotion stores to know what component this actually is
    const replacementName: string | undefined = isForwardRefComponent
      ? emotionData.__docgenInfo.displayName
      : typeof emotionData === 'string'
      ? emotionData
      : emotionData?.displayName;

    // remove internal component underscore markings
    return replacementName ? replacementName.replace('_', '') : displayName;
  }

  return displayName;
};

export const getComponentDisplayName = (
  context: StoryContext | undefined
): string | undefined => {
  if (!context) return undefined;
  const component = context.component as ComponentType & {
    __docgenInfo?: { displayName?: string };
  };

  return component?.displayName ?? component.__docgenInfo?.displayName;
};

export const isEmotionComponent = (node: ReactElement): boolean => {
  const displayName = getElementDisplayName(node);
  const matches =
    typeof displayName === 'string' ? displayName.startsWith('Emotion') : null;

  return matches != null;
};

/* Story specific checks */
export const isStoryComponent = (
  node: ReactElement,
  context: StoryContext | undefined
): boolean => {
  if (!context) return false;

  const displayName = getEmotionComponentDisplayName(node);

  return displayName === context?.component?.displayName;
};

/**
 * checks if the outer most component is a parent of the actual story component
 */
export const isStoryParent = (
  node: ReactElement,
  context: StoryContext | undefined
): boolean => {
  if (!context) return false;

  const displayName = getEmotionComponentDisplayName(node);

  if (!displayName) return false;

  const parentComponents = context.title.split('/');
  parentComponents.shift();
  parentComponents.pop();

  return parentComponents.includes(displayName);
};

export const isSubcomponent = (
  node: ReactElement,
  context: StoryContext | undefined
): boolean => {
  if (!context) return false;

  const parentComponents = context.title.split('/');
  parentComponents.shift();
  const displayName = getEmotionComponentDisplayName(node);

  if (!displayName || !parentComponents || parentComponents.length === 0) {
    return false;
  }

  let isSub = false;

  for (const parent of parentComponents) {
    if (typeof displayName === 'string' && displayName.includes(parent)) {
      isSub = true;
    }
  }

  return isSub;
};

export const isStatefulComponent = (node: ReactElement<any>): boolean => {
  const displayName = getEmotionComponentDisplayName(node);
  const isStateful =
    typeof displayName === 'string' &&
    (displayName.startsWith('Stateful') || displayName.startsWith('Component'));

  return isStateful;
};

/**
 * NOTE: This code is from the original Storybook jsxDecorator
 * Converts a React symbol to a React-like displayName
 *
 * Symbols come from here
 * https://github.com/facebook/react/blob/338dddc089d5865761219f02b5175db85c54c489/packages/react-devtools-shared/src/backend/ReactSymbols.js
 *
 * E.g.
 * Symbol(react.suspense)                    -> React.Suspense
 * Symbol(react.strict_mode)                 -> React.StrictMode
 * Symbol(react.server_context.defaultValue) -> React.ServerContext.DefaultValue
 *
 * @param {Symbol} elementType - The symbol to convert
 * @returns {string | null} A displayName for the Symbol in case elementType is a Symbol; otherwise, null.
 */
export const getReactSymbolName = (elementType: any): string => {
  const elementName = elementType.$$typeof || elementType;
  const symbolDescription: string = elementName
    .toString()
    .replace(/^Symbol\((.*)\)$/, '$1');

  const reactComponentName = symbolDescription
    .split('.')
    .map((segment) => {
      // Split segment by underscore to handle cases like 'strict_mode' separately, and PascalCase them
      return segment.split('_').map(toPascalCase).join('');
    })
    .join('.');

  return reactComponentName;
};

export const skipJsxRender = (context: StoryContext): boolean => {
  const isArgsStory = context?.parameters.__isArgsStory;
  const isManuallySkipped = context?.parameters?.codeSnippet?.skip === true;

  // never render if the user is skipping it manually or if it's not an args story.
  return !isArgsStory || isManuallySkipped;
};

/**
 * runs prettier (ts) on a code string to apply code formatting
 */
export const getFormattedCode = async (code: string) => {
  const prettierConfig = {
    ...basePrettierConfig,
    trailingComma: 'none' as const,
    parser: 'typescript',
    plugins: [tsParser],
  };

  const formattedCode = await prettier.format(code, prettierConfig);

  return formattedCode;
};
