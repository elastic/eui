/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

const CONTAINER_TYPES = ['normal', 'size', 'inline-size'] as const;

/**
 * Type of container context used in container queries.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type}
 */
export type EuiContainerType = (typeof CONTAINER_TYPES)[number];

/**
 * Establish element as a query container.
 * The scroll state is applied through the `scrollState` argument
 * and not the `type` argument.
 *
 * @example
 * // Export container name to use across the application
 * export const PAGE_CONTENT_CONTAINER_NAME = 'my-app-page-content';
 * const pageContentStyles = css`
 *   ${euiContainer('inline-size', PAGE_CONTENT_CONTAINER_NAME)}
 *   margin: 0 auto;
 * `;
 *
 * @returns A style string to be used inside Emotion's `css` template literal
 * @beta
 */
export const euiContainer = (
  type: EuiContainerType,
  name?: string,
  scrollState?: boolean
): string => {
  let finalType = '';
  if (type !== 'normal') {
    finalType += type;
  }
  if (scrollState) {
    if (finalType.length) {
      finalType += ' ';
    }

    finalType += 'scroll-state';
  }

  return [
    !!name && `container-name: ${name}`,
    !!finalType && `container-type: ${finalType}`,
  ]
    .filter(Boolean)
    .join(';');
};

/**
 * Establish element as a query container.
 * The scroll state is applied through the `scrollState` argument
 * and not the `type` argument.
 *
 * @example
 * // Export container name to use across the application
 * export const PAGE_CONTENT_CONTAINER_NAME = 'my-app-page-content';
 * const PageContent = ({ children }: PropsWithChildren) => (
 *   <main css={euiContainerCSS('inline-size', PAGE_CONTENT_CONTAINER_NAME)}>
 *     {children}
 *   </main>
 * );
 * @returns Emotion's `SerializedStyles` object to be passed to the `css` prop
 *   of a React component.
 * @beta
 */
export const euiContainerCSS = (
  type: EuiContainerType,
  name?: string,
  scrollState?: boolean
) => {
  return css(euiContainer(type, name, scrollState));
};

/**
 * Get a @container rule for given conditions and an optional container name.
 *
 * Container queries can be used to apply conditional styles based on container
 * size, its scroll state or even its styles.
 *
 * It's hugely useful to conditionally show or hide information based
 * on the **container** dimensions instead of the **viewport** dimensions.
 *
 * When container name is provided, it will be used to target the containment
 * context. When skipped, it will target the nearest ancestor with containment.
 *
 * @example
 * const itemDetailsStyles = css`
 *   background: red;
 *
 *   ${euiContainerQuery('(width > 250px)')} {
 *     background: blue;
 *   }
 * `;
 *
 * @param conditions one or many conditions to query the container with.
 *   Similarly to media queries, you can use
 *   size queries (e.g., `(width > 300px)`),
 *   scroll state queries (e.g., `(scroll-state(scrollable: top))`),
 *   or even style queries.
 *   You can use the `and`, `or` and `not` logical keywords to define container
 *   conditions. Note that all conditions must be wrapped in parentheses.
 *
 * @param containerName When provided, it will be used to target
 *   the containment context and run queries against it. Otherwise, the nearest
 *   ancestor with containment will be queried instead.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container}
 * @beta
 */
export const euiContainerQuery = (
  conditions: string,
  containerName?: string
): string => {
  return `@container ${containerName ?? ''}${
    containerName ? ' ' : ''
  }${conditions}`;
};
