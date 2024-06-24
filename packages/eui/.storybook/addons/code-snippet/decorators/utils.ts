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
  isValidElement,
} from 'react';
import { Args, StoryContext } from '@storybook/react';
import * as prettier from 'prettier';
import tsParser from 'prettier/parser-typescript';

// @ts-ignore - config import
import basePrettierConfig from '../../../../.prettierrc';
import {
  ADDON_PARAMETER_KEY,
  EMOTION_LABEL_KEY,
  EMOTION_TYPE_KEY,
} from '../constants';

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
    node.props?.[EMOTION_TYPE_KEY] != null
  ) {
    const {
      [EMOTION_TYPE_KEY]: emotionTypeData,
      [EMOTION_LABEL_KEY]: emotionLabelData,
    } = node.props;
    const isForwardRefComponent = isForwardRef(emotionTypeData);

    const emotionTypeName =
      emotionTypeData.__docgenInfo?.displayName ??
      emotionTypeData.render?.displayName;
    // we need to rely here on the reference Emotion stores to know what component this actually is
    const replacementName: string | undefined = isForwardRefComponent
      ? emotionTypeName
      : typeof emotionTypeData === 'string'
      ? emotionTypeData ?? emotionLabelData
      : emotionTypeName ?? emotionLabelData?.displayName;

    // remove internal component underscore markings
    return replacementName ? replacementName.replace('_', '') : displayName;
  }

  return displayName;
};

export const getStoryComponentDisplayName = (
  context: StoryContext | undefined
): string | undefined => {
  if (!context) return undefined;
  const component = context.component as ComponentType & {
    __docgenInfo?: { displayName?: string };
  };

  return component?.displayName ?? component.__docgenInfo?.displayName;
};

/** Determine if a component is an Emotion component based on displayName.
 * Emotion components are renamed 'EmotionCssPropInternal'
 */
export const isEmotionComponent = (node: ReactElement): boolean => {
  const displayName = getElementDisplayName(node);
  const matches =
    typeof displayName === 'string' ? displayName.startsWith('Emotion') : false;

  return !!matches;
};

/* Story specific checks */
export const isStoryComponent = (
  node: ReactElement,
  context: StoryContext | undefined
): boolean => {
  if (!context) return false;

  const displayName = getEmotionComponentDisplayName(node)?.replace(/^_/, '');
  const isCurrentStory = displayName
    ? displayName === context?.component?.displayName
    : false;

  return isCurrentStory;
};

const isStoryWrapper = (node: ReactElement, context: StoryContext) => {
  const displayName = getEmotionComponentDisplayName(node);
  const isStoryWrapper =
    (typeof displayName === 'string' && displayName.startsWith('Story')) ||
    context.parameters?.[ADDON_PARAMETER_KEY]?.resolveChildren === true;

  return isStoryWrapper;
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
 * Helper to resolve components that are wrapped.
 * It's a bit hacky way to return the children of a story wrapper component
 * by calling the component first. This way we ensure to get the right information
 * for the story.
 * (e.g. when resolving <Story /> from a story decorator or when
 * resolving the children of a wrapper component)
 */
export const getResolvedStoryChild = (
  child: ReactElement,
  context: StoryContext
) => {
  return child.type && typeof child.type === 'function'
    ? (child.type as (args: Args) => ReactElement)(context?.args)
    : child;
};

/**
 * Helper to resolve the current story element from a composition preview,
 * e.g. when the story element is a child of a wrapper and only the story
 * should be determined without wrappers or siblings.
 * (e.g. for singular output or for getting defaultProps or the story element)
 *
 * It checks the passed story node recursively until it finds the current
 * story element and returns it.
 */
export const getStoryComponent = (
  node: ReactElement,
  context: StoryContext
): ReactElement | undefined => {
  let storyNode: ReactElement | undefined;

  const resolveChildren = (childNode: ReactElement) => {
    if (isStoryComponent(childNode, context)) {
      storyNode = childNode;
      return;
    } else if (isValidElement<any>(childNode) && !storyNode) {
      // CASE: array of children
      if (Array.isArray(childNode.props?.children)) {
        const { children } = childNode.props;

        for (const child of children) {
          // break out of the loop early if possible
          if (child == null || storyNode != null) break;
          // skip non-ReactElement children
          if (!isValidElement(child)) continue;

          // Story wrappers need to be resolved first to ensure the right data
          const resolvedChild = getResolvedStoryChild(child, context);
          resolveChildren(resolvedChild);
        }
      } else if (
        // CASE: story wrapper; no children
        childNode.props?.children == null &&
        (isStoryWrapper(childNode, context) || isStatefulComponent(childNode))
      ) {
        const displayName = getEmotionComponentDisplayName(childNode);
        // Story wrappers need to be resolved first to ensure the right data
        const resolvedChild = getResolvedStoryChild(childNode, context);
        const resolvedDisplayName =
          getEmotionComponentDisplayName(resolvedChild);

        if (resolvedDisplayName && resolvedDisplayName !== displayName) {
          resolveChildren(resolvedChild);
        }
      } else if (
        // CASE: single child element
        childNode.props?.children &&
        !Array.isArray(childNode.props?.children)
      ) {
        resolveChildren(childNode.props?.children);
      }
    }
  };

  resolveChildren(node);

  return storyNode;
};

type ReactElementWithDocgenInfo = ReactElement & {
  type?: { __docgenInfo?: { props: { [key: string]: any } } };
};

/**
 * Helper to retrieve a story components default props.
 * Only returns props that have the default prop value;
 * any prop value that's changed in the story is not
 * considered a default prop in this context
 */
export const getDefaultPropsfromDocgenInfo = (
  component: ReactElementWithDocgenInfo,
  context: StoryContext
): Record<string, any> | undefined => {
  if (typeof component.type === 'string') return undefined;

  // determine the story element first
  // this is required because the story might be wrapped and
  // only the story element has the required docgenInfo
  let storyComponent: ReactElementWithDocgenInfo | undefined =
    getStoryComponent(component, context);

  if (!storyComponent) return undefined;

  let propsInfo = isEmotionComponent(storyComponent)
    ? storyComponent.props?.[EMOTION_TYPE_KEY]?.__docgenInfo.props
    : storyComponent.type?.__docgenInfo?.props;

  const args = context.args;

  const defaultProps = propsInfo
    ? Object.keys(propsInfo).filter((key) => {
        if (propsInfo[key].defaultValue == null) return false;

        const defaultValue = propsInfo[key].defaultValue.value;
        // clean added string (e.g. done by EuiI18n or inline type casting with 'as')
        // checks if the string starts with wrapping quotes, then matches tonly the quoted string
        // to remove access content (e.g. "'div' as TComponent" => 'div')
        const cleanedDefaultValue = defaultValue.startsWith("'")
          ? defaultValue.match(/^'.*'/)[0].replace(/^\'/, '').replace(/\'$/, '')
          : propsInfo[key].defaultValue?.value;

        // check that the prop value is not the default value
        return cleanedDefaultValue === args[key]?.toString();
      })
    : undefined;

  // if available, returns an array of prop names
  return defaultProps;
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
