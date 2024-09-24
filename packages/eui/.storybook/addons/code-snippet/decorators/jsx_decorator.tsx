/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* DISCLAIMER: This file was originally copied from Storybook jsxDecorator and then adjusted for more specific needs.
https://github.com/storybookjs/storybook/blob/2bff7a1c156bbd42ab381f84b8a55a07694e7e53/code/renderers/react/src/docs/jsxDecorator.tsx#L224 */

import type { ReactRenderer } from '@storybook/react';
import type {
  StoryContext,
  ArgsStoryFn,
  PartialStoryFn,
} from '@storybook/types';
import {
  addons,
  useEffect as useStorybookEffect,
} from '@storybook/preview-api';
import { logger } from '@storybook/client-logger';

import { useEuiTheme } from '../../../../src/services';
import {
  ADDON_ERROR,
  CODE_FORMATTING_ERROR,
  EVENTS,
  SPREAD_STORY_ARGS_MARKER,
  STORY_ARGS_MARKER,
} from '../constants';
import { AddonError } from '../types';
import {
  getDefaultPropsfromDocgenInfo,
  getFormattedCode,
  skipJsxRender,
} from './utils';
import { JSXOptions, renderJsx } from './render_jsx';

const defaultJsxOptions = {
  skip: 0,
  showFunctions: false,
  enableBeautify: true,
  showDefaultProps: false,
};

/**
 * main jsx decorator function that transforms the story react element to a jsx string
 * - checks if a manual code snippet is provided or code snippet should be generated
 *   - if a snippet is available it replaces args and returns the snippet
 *   - if a snippet should be generated, it:
 *     - determines what should be used as story element (e.g. skip wrappers and resolve elements)
 *     - adds displayName overwrites (e.g. for Emotion or Stateful wrappers)
 *     - passes story react element to reactElementToJSXString
 *     - filters the returned string from reactElementToJSXString for expected formatting
 *     - runs prettier on the output for expected formatting
 */
export const customJsxDecorator = (
  storyFn: PartialStoryFn<ReactRenderer>,
  context: StoryContext<ReactRenderer>
) => {
  const story = storyFn();
  const channel = addons.getChannel();
  const codeSnippet: string = context?.parameters?.codeSnippet?.snippet;
  const skip = skipJsxRender(context) && !codeSnippet;

  let jsx = '';
  let error: AddonError | false = false;

  const emitChannel = (
    jsx: string,
    skip: boolean,
    shouldSkip = false,
    error?: AddonError
  ) => {
    const { id, unmappedArgs } = context;
    if (skip || shouldSkip) {
      channel.emit(EVENTS.SNIPPET_RENDERED, {
        id,
        source: '',
        error: false,
        args: unmappedArgs,
      });
    } else if (error) {
      channel.emit(EVENTS.SNIPPET_RENDERED, {
        id,
        source: '',
        error,
        args: unmappedArgs,
      });
    } else {
      channel.emit(EVENTS.SNIPPET_RENDERED, {
        id,
        source: jsx,
        error: false,
        args: unmappedArgs,
      });
    }
  };

  // disabling this rule as this is how Storybook handles it
  // they export their own hook wrappers and have the eslint rule disabled completely
  // https://github.com/storybookjs/storybook/blob/2bff7a1c156bbd42ab381f84b8a55a07694e7e53/code/renderers/react/src/docs/jsxDecorator.tsx#L233
  // https://github.com/storybookjs/storybook/blob/4c1d585ca07db5097f01a84bc6a4092ada33629b/code/lib/preview-api/src/modules/addons/hooks.ts#L474
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useStorybookEffect(() => {
    if (error) {
      emitChannel(jsx, skip, false, error);
    } else if (jsx !== '' && !error) {
      emitChannel(jsx, skip);
    } else if (skip) {
      emitChannel(jsx, skip, true);
    }
  }, [jsx, error, skip, emitChannel]);

  // We only need to render JSX if the source block is actually going to
  // consume it. Otherwise it's just slowing us down.
  if (skip) {
    return story;
  }

  // use manually provided code snippet and replace args if available
  if (codeSnippet) {
    const args: typeof context.args = { ...context.args };
    const defaultProps = getDefaultPropsfromDocgenInfo(story, context);

    for (const key of Object.keys(context.args)) {
      // checks story args for:
      //   - remove if no value (but allow `false`)
      //   - remove if `children`
      //   - remove if arg is a default prop
      if (
        context.args[key] == null ||
        key === 'children' ||
        defaultProps?.includes(key)
      ) {
        delete args[key];
      }
    }

    // add the story args/props to the manual code snippet
    // by replacing the {{STORY_ARGS}} || {{...STORY_ARGS}} marker
    let outputArgs = JSON.stringify(args);
    const shouldSpread = codeSnippet.includes(SPREAD_STORY_ARGS_MARKER);
    const argsMarker = shouldSpread
      ? SPREAD_STORY_ARGS_MARKER
      : STORY_ARGS_MARKER;

    // if the spread marker is used, resolve the props object to the first level values
    // e.g. { foo: 'bar' } => foo="bar"
    //      { a: { b: 'B' } } => a={{ b: 'B' }}
    if (shouldSpread) {
      outputArgs = Object.entries(args)
        .map(([key, value]) => {
          const formattedValue =
            typeof value === 'function' ? `() => {}` : JSON.stringify(value);
          const formattedOutput =
            typeof value === 'string'
              ? `${[key, formattedValue].join('=')}`
              : `${[key, formattedValue].join('={')}}`;

          return formattedOutput;
        })
        .join(' ');
    }

    const code = codeSnippet.replace(argsMarker, outputArgs);

    getFormattedCode(code)
      .then((res: string) => {
        jsx = res.replace(';\n', '\n');
        error = false;
      })
      .catch((err: Error): void => {
        logger.error(CODE_FORMATTING_ERROR, err);

        error = { reason: CODE_FORMATTING_ERROR, body: err };
        jsx = code;
      });

    // return story from decorator to be rendered
    return story;
  }

  const options = {
    ...defaultJsxOptions,
    ...(context?.parameters.jsx || {}),
  } as Required<JSXOptions>;

  // Exclude decorators from source code snippet by default
  const storyJsx = context?.parameters.docs?.source?.excludeDecorators
    ? (context.originalStoryFn as ArgsStoryFn<ReactRenderer>)(
        context.args,
        context
      )
    : story;

  // NOTE: euiTheme is defined on global level to prevent errors on conditionally rendered hooks
  // when stories have conditionally rendered components (via mapping) that rely on euiTheme
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const euiTheme = useEuiTheme();

  try {
    // generate JSX from the story
    const renderedJsx = renderJsx(storyJsx, context, options, euiTheme);
    if (renderedJsx) {
      getFormattedCode(renderedJsx)
        .then((res: string) => {
          // prettier adds a semicolon due to semi: true but semi:false adds one at the beginning ¯\_(ツ)_/¯
          jsx = res.replace(';\n', '\n');
          error = false;
        })
        .catch((err: Error): void => {
          logger.error(CODE_FORMATTING_ERROR, err);

          error = { reason: CODE_FORMATTING_ERROR, body: err };
          jsx = renderedJsx;
        });
    }
  } catch (err) {
    logger.error(ADDON_ERROR, err);

    error = { reason: ADDON_ERROR, body: err as Error };
  }

  // return story from decorator to be rendered
  return story;
};
