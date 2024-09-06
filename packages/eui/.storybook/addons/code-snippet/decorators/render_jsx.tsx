/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* DISCLAIMER: Parts of this file were originally copied from Storybook jsxDecorator and then adjusted for more specific needs.
https://github.com/storybookjs/storybook/blob/2bff7a1c156bbd42ab381f84b8a55a07694e7e53/code/renderers/react/src/docs/jsxDecorator.tsx#L224 */

import type { ReactElement, ReactNode } from 'react';
import React, { isValidElement } from 'react';
import type { Options } from 'react-element-to-jsx-string';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { camelCase, isEmpty } from 'lodash';
import type { ReactRenderer, Args } from '@storybook/react';
import type { StoryContext } from '@storybook/types';
import { getDocgenSection } from '@storybook/docs-tools';
import { logger } from '@storybook/client-logger';

import { UseEuiTheme } from '../../../../src/services';
import { ADDON_PARAMETER_KEY, EXCLUDED_PROPS } from '../constants';
import {
  getStoryComponentDisplayName,
  getEmotionComponentDisplayName,
  getReactSymbolName,
  isForwardRef,
  isFragment,
  isMemo,
  isEmotionComponent,
  isStatefulComponent,
  isStoryComponent,
  isStoryParent,
  isSubcomponent,
  getStoryComponent,
  getResolvedStoryChild,
  getDefaultPropsfromDocgenInfo,
  isStoryWrapper,
} from './utils';

export type JSXOptions = Options & {
  /** Whether to show the function in the jsx tab */
  showFunctions?: boolean;
  /** Whether to format HTML or Vue markup */
  enableBeautify?: boolean;
  /** Override the display name used for a component */
  displayName?: string | Options['displayName'];
};

/**
 * Apply the users parameters, apply filtering and render the jsx for a story
 */
export const renderJsx = (
  code: React.ReactElement,
  context: StoryContext<ReactRenderer>,
  options?: JSXOptions,
  euiTheme?: UseEuiTheme
): string | null => {
  if (typeof code === 'undefined') {
    logger.warn('Too many skip or undefined component');
    return null;
  }

  let displayNameDefaults;

  // NOTE: This code is from the original Storybook jsxDecorator
  // and was enhanced to add additional checks for EUI Emotion
  // component usages to ensure resolving the proper displayName
  if (typeof options?.displayName === 'string') {
    displayNameDefaults = {
      showFunctions: true,
      displayName: () => options.displayName,
    };
  } else {
    displayNameDefaults = {
      // To get exotic component names resolving properly
      displayName: (el: any): string => {
        if (el.type.displayName) {
          let displayName = el.type.displayName;
          // rename Emotion elements
          if (isEmotionComponent(el)) {
            // NOTE: overwriting el.type.displayName here and returning it
            // causes some stale value for Emotion components
            displayName = getEmotionComponentDisplayName(el) ?? displayName;
          }
          return displayName;
        } else if (getDocgenSection(el.type, 'displayName')) {
          return getDocgenSection(el.type, 'displayName');
        } else if (el.type.render?.displayName) {
          return el.type.render.displayName;
        } else if (
          typeof el.type === 'symbol' ||
          (el.type.$$typeof && typeof el.type.$$typeof === 'symbol')
        ) {
          // check if it's an emotion component and we have a displayName available on it
          const displayName = getEmotionComponentDisplayName(el);
          return displayName ?? getReactSymbolName(el.type);
        } else if (el.type.name && el.type.name !== '_default') {
          // rename stateful wrappers
          // naming convention: `Stateful{COMPONENT_NAME}`
          if (isStatefulComponent(el)) {
            const displayName =
              getStoryComponentDisplayName(context) ??
              context?.title.split('/').pop() ??
              el.type.name;
            el.type.displayName = displayName;
            return displayName;
          }
          return el.type.name;
        } else if (typeof el.type === 'function') {
          // this happens e.g. when using decorators where the <Story /> is wrapped
          return getStoryComponentDisplayName(context) ?? 'No Display Name';
        } else if (isForwardRef(el.type)) {
          return el.type.render.name;
        } else if (isMemo(el.type)) {
          return el.type.type.name;
        } else {
          return el.type;
        }
      },
    };
  }

  // react-element-to-jsx-string options
  const opts = {
    ...displayNameDefaults,
    ...options,
    useBooleanShorthandSyntax: false, // disabled in favor of manual filtering
    useFragmentShortSyntax: true,
    sortProps: true,
    // using any type here as component props can have any type
    filterProps: (value: any, key: string) => {
      // Note that false values should be allowed, and handled by `removeDefaultProps`
      if (
        EXCLUDED_PROPS.has(key) ||
        value == null ||
        value === '' ||
        // empty objects/arrays that we set up for easier testing
        (typeof value === 'object' && isEmpty(value))
      ) {
        return false;
      }

      return true;
    },
  };

  const result = React.Children.map(code, (c) => {
    // @ts-expect-error FIXME: workaround react-element-to-jsx-string
    const child = typeof c === 'number' ? (c.toString() as string) : c;
    const toJSXString: typeof reactElementToJSXString =
      typeof reactElementToJSXString === 'function'
        ? reactElementToJSXString
        : // @ts-expect-error (Converted from ts-ignore)
          reactElementToJSXString.default;

    const shouldResolveStoryElementOnly =
      context?.parameters?.codeSnippet?.resolveStoryElementOnly === true;

    let node = child;

    if (typeof child !== 'string') {
      // manual flag to remove an outer story wrapper and resolve its children instead
      // useful when complex custom stories are build where the actual story component is
      // not the outer component but part of a composition within another wrapper
      if (shouldResolveStoryElementOnly) {
        const storyNode = getStoryComponent(child, context);

        if (storyNode) {
          node = storyNode;
        }
        // manual flag to remove an outer story wrapper and resolve its children instead
        // useful when complex custom stories are build where the actual story component is
        // not the outer component but part of a composition within another wrapper
      } else if (isStoryWrapper(child, context)) {
        node = getResolvedStoryChild(child, context);
      } else {
        // removes outer wrapper components but leaves:
        // - stateful wrappers (kept and renamed later via displayName)
        // - fragments (needed for reactElementToJSXString to work initially but skipped later)
        // - parent and subcomponents components (subcomponents likely require their parent to display)
        // - default fallback: if the children are an array we resolve for the story component within the wrapper
        //   (this prevents errors with reactElementToJSXString which can't handle array children)
        node =
          isStoryComponent(child, context) ||
          isStoryParent(child, context) ||
          isSubcomponent(child, context) ||
          isStatefulComponent(child) ||
          isFragment(child)
            ? child
            : child.props.children;

        if (Array.isArray(node)) {
          const children = node as ReactElement[];

          for (const child of children) {
            const displayName = getEmotionComponentDisplayName(child);
            if (displayName === context?.component?.displayName) {
              node = child;
            }
          }
        }
      }
    }

    // convert node to jsx string
    let string: string = toJSXString(
      _simplifyNodeForStringify({
        node,
        context,
        euiTheme,
        argsOverride: context?.parameters[ADDON_PARAMETER_KEY]?.args,
      }),
      opts as Options
    );

    /** Start of filtering the generated jsx string */
    // renaming internal components
    if (string.indexOf('<_') > -1) {
      const regexStart = new RegExp(/<_/g);
      const regexEnd = new RegExp(/<\/_/g);
      const matchesStart = string.match(regexStart);
      const matchesEnd = string.match(regexEnd);

      // renaming internal component opening tags that start with _underscore
      if (matchesStart) {
        matchesStart.forEach((match) => {
          string = string.replace(match, match.replace(regexStart, '<'));
        });
      }

      // renaming internal component closing tags that start with _underscore
      if (matchesEnd) {
        matchesEnd.forEach((match) => {
          string = string.replace(match, match.replace(regexEnd, '</'));
        });
      }
    }

    // rename necessary fragments to shorthand <> (react-element-to-jsx-string outputs <React.Fragment>)
    if (string.indexOf('React.Fragment') > -1) {
      const regex = new RegExp(/React.Fragment/g);
      const matches = string.match(regex);
      if (matches) {
        matches.forEach((match) => {
          string = string.replace(match, match.replace(regex, ''));
        });
      }
    }

    // manually filter out ={true} to achieve shorthand syntax for boolean values as we're
    // not using the global option `useBooleanShorthandSyntax` to have more control
    if (string.indexOf('={true}') > -1) {
      const regex = new RegExp(/={true}/g);
      const matches = string.match(regex);
      if (matches) {
        matches.forEach((match) => {
          string = string.replace(match, match.replace(regex, ''));
        });
      }
    }

    // ensure tokens are output properly by removing added variable markers
    if (string.indexOf('{{') > -1) {
      const regex = new RegExp(/'{{|"{{|}}'|}}"/g);
      const matches = string.match(regex);
      if (matches) {
        matches.forEach((match) => {
          string = string.replace(match, '');
        });
      }
    }

    // remove arg value override markers #{} and replace them with their content
    // example:
    // in:  selected: "#{moment('Tue Mar 19 2024 18:54:51 GMT+0100')}"
    // out: selected={moment('Tue Mar 19 2024 18:54:51 GMT+0100')}
    if (string.indexOf('#{') > -1) {
      const variableRegex = new RegExp(/("|')#{.*?}("|')/g);
      const variableContentRegex = new RegExp(/(?<="#{).*?(?=}")/g);
      const variableMatch = string.match(variableRegex);

      if (variableMatch) {
        variableMatch.forEach((match) => {
          const content = match.match(variableContentRegex)!;
          string = string.replace(match, `{${content[0]}}`);
        });
      }
    }

    return string;
  }).join('\n');

  return result.replace(/function\s+noRefCheck\(\)\s*\{\}/g, '() => {}');
};

/**
 * recursively resolves ReactElement nodes:
 * - removes obsolete outer and inner <Fragment> wrappers
 * - resolves Emotion css prop back to its input state
 * - resolves arrays and objects to single elements
 */
const _simplifyNodeForStringify = ({
  node,
  context,
  euiTheme,
  argsOverride,
}: {
  node: ReactNode;
  context: StoryContext<ReactRenderer>;
  euiTheme?: UseEuiTheme;
  argsOverride?: Args;
}): ReactNode => {
  if (isValidElement(node)) {
    let updatedNode = node;
    const shouldRemoveDefaultProps =
      context?.parameters?.codeSnippet?.removeDefaultProps !== false;
    // default props for the current node
    const defaultProps = shouldRemoveDefaultProps
      ? getDefaultPropsfromDocgenInfo(node, context)
      : [];

    // remove outer fragments
    if (isFragment(updatedNode) && !Array.isArray(updatedNode.props.children)) {
      updatedNode = node.props.children;
    }

    // remove inner fragments
    if (
      updatedNode.props?.children &&
      !Array.isArray(updatedNode.props.children) &&
      isFragment(updatedNode.props.children)
    ) {
      updatedNode = {
        ...updatedNode,
        props: {
          ...updatedNode.props,
          children: updatedNode.props.children.props.children,
        },
      };
    }

    // check and resolve props recursively
    // NOTE: we're using any types here as component props can have any type
    const updatedProps = updatedNode.props
      ? Object.keys(updatedNode.props).reduce<{
          [key: string]: any;
        }>((acc, cur) => {
          // filter out default props
          if (defaultProps?.includes(cur)) {
            return acc;
          }
          // check if the story has manual prop overrides that should be
          // used instead of the original value
          if (argsOverride?.[cur]) {
            acc[cur] = argsOverride?.[cur];

            return acc;
          }
          // resolve css Emotion object back to css prop
          // ensures tokens are output as is and not its resolved value
          if (cur === 'css') {
            // example:
            //   css={({ euiTheme }) => ({})}
            if (
              typeof updatedNode.props[cur] === 'function' &&
              euiTheme != null
            ) {
              const styles = updatedNode.props[cur]?.(euiTheme);
              const fnString = String(updatedNode.props[cur]);

              /**
               *  get the style definitions from the function body
               *  example:
               *    "return {
               *      backgroundColor: euiTheme.colors.emptyShade,
               *      minBlockSize: '150vh'
               *     };"
               */
              const regex = /return([\S\s]*?)\{([\S\s]*?)(};?)$/gm;
              const matches = fnString.match(regex);

              if (matches) {
                const rules = matches[0]
                  .replace('return {\n', '')
                  .replace('return{', '')
                  .replace(/(\/\/)([\S\s]*?)$/g, '')
                  .replaceAll(' ', '')
                  .replaceAll('\n', '')
                  .replace(/}}/g, '')
                  .split(',');

                // transform string to styles object
                const cssStyles = rules.reduce((acc, cur) => {
                  const [property, value] = cur.split(':');
                  const isToken = value.includes('euiTheme');
                  const cleanedValue = isToken
                    ? value.replace(/.+?(?=euiTheme)/g, '')
                    : value.replaceAll("'", '').replaceAll('"', '');

                  // if the value is a token, we pass the token name with variable
                  // markers which are removed in a later step.
                  // this way the value won't be coerced to another type when
                  // transforming the element to a jsx string
                  acc[property] = isToken
                    ? `{{${cleanedValue}}}`
                    : cleanedValue;

                  return acc;
                }, {} as Record<string, any>);

                acc[cur] = {
                  ...acc.style,
                  ...cssStyles,
                };

                return acc;
              }

              acc[cur] = {
                ...acc.style,
                ...styles,
              };
            }

            /** resolves Emotion css object styles string to a styles object
             *  example:
             *    styles: "background-color:rgba(0, 119, 204, 0.1);:first-child{min-height:5em;};label:flexItem;"
             *  returns:
             *    {
             *      "backgroundColor": "rgba(0, 119, 204, 0.1)",
             *      ":first-child": {
             *        "min-height": "5em"
             *      }
             *    }
             */
            if (
              typeof updatedNode.props[cur] === 'object' &&
              !Array.isArray(cur)
            ) {
              const styles: string[] = updatedNode.props[cur].styles
                .replace(';};', '};')
                .split(';');

              const styleRules = styles.reduce((acc, cur) => {
                if (cur && !cur.startsWith(':') && !cur.startsWith('label')) {
                  const [property, value] = cur.split(':');
                  const propertyName = camelCase(property);

                  acc[propertyName] = value;
                } else if (cur.startsWith(':')) {
                  const string = cur.replace('{', ';').replace('}', '');
                  const [property, propertyValue] = string.split(';');
                  const [key, value] = propertyValue.split(':');

                  acc[property] = {
                    [key]: value,
                  };
                }

                return acc;
              }, {} as Record<string, any>);

              acc[cur] = {
                ...acc.style,
                ...styleRules,
              };
            }

            return acc;
          }

          if (cur === 'style') {
            return (acc[cur] = {
              // prevent resolving style attribute
              style: {
                ...acc[cur],
                ...updatedNode.props[cur],
              },
            });
          }

          acc[cur] = _simplifyNodeForStringify({
            node: updatedNode.props[cur],
            context,
          });

          return acc;
        }, {} as Record<string, any>)
      : {};

    return {
      ...updatedNode,
      props: updatedProps,
      // Recursively remove "_owner" property from elements to avoid crash on docs page when
      // passing components as an array prop (#17482)
      // Note: It may be better to use this function only in development environment.
      // @ts-expect-error (this is an internal or removed api)
      _owner: null,
    };
  }
  // recursively resolve array or object nodes (e.g. props)
  if (Array.isArray(node)) {
    const children = node.map((child) =>
      _simplifyNodeForStringify({ node: child, context, euiTheme })
    );
    return children.flat();
  }

  // e.g. props of object shape
  // props = { text: 'foobar' color: 'green' }
  if (node && !Array.isArray(node) && typeof node === 'object') {
    const updatedChildren: Record<string, any> = {
      ...node,
    };
    let objectValue: ReactElement | undefined;
    const childrenKeys = Object.keys(updatedChildren);
    const childrenValues = Object.values(updatedChildren);

    for (const [i, n] of childrenValues.entries()) {
      const hasConstructor =
        updatedChildren.hasOwnProperty('_constructor-name_');

      // resolves a prop value that is a class method to a function
      // e.g. query={Query.parse('')}
      if (hasConstructor) {
        objectValue = (() => {}) as unknown as ReactElement;
        break;
      } else {
        updatedChildren[childrenKeys[i]] = _simplifyNodeForStringify({
          node: n,
          context,
        });
      }
    }

    return typeof objectValue === 'function'
      ? (objectValue as ReactNode)
      : (updatedChildren as ReactNode);
  }

  // TODO: handle the case when a prop is a render function

  return node;
};
