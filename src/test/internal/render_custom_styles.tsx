/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
import { get, set } from 'lodash';
import { render } from '../rtl';

export const customStyles = {
  className: 'hello',
  css: css`
    color: red;
  `,
  style: { content: "'world'" },
};

const assertOutputStyles = (
  rendered: HTMLElement,
  { skipStyles }: { skipStyles?: boolean }
) => {
  // className
  const componentNode = rendered.querySelector('.hello');
  expect(componentNode).not.toBeNull();
  // css
  expect(componentNode!.getAttribute('class')).toEqual(
    expect.stringMatching(/css-[\d\w-]{6,}-css/) // should have generated an emotion class ending with -css
  );
  // style
  // skippable as some components explicitly do not accept custom inline styles
  if (!skipStyles) {
    expect(componentNode!.getAttribute('style')).toContain("content: 'world';");
  }
};

/**
 * Use this test helper to quickly check that the component supports custom
 * `className`, `css`, and `style` properties.
 *
 * Example usage:
 *
 * shouldRenderCustomStyles(<EuiMark {...requiredProps} />Marked</EuiMark>);
 * shouldRenderCustomStyles(<EuiPageSection />, { childProps: ['contentProps'] });
 * shouldRenderCustomStyles(<EuiPopover />, { childProps: ['panelProps'], skipStyles: true });
 */
type ShouldRenderCustomStylesOptions = {
  /**
   * Used to test that child component props correctly accept custom styles
   * e.g., `iconProps`, `wrapperProps`, `labelProps`, etc.
   */
  childProps?: string[];
  /**
   * Used for components that do not allow custom inline styles, or
   * components where `style` isn't on the same DOM node as `className`
   */
  skipStyles?: boolean;
  /**
   * Useful for running separate parent and `childProps` tests/setups
   */
  skipParentTest?: boolean;
  /**
   * Optional callback to fire after component renders
   * Used for components that only render certain elements on, e.g. hover or click
   */
  renderCallback?: (result: ReturnType<typeof render>) => void;
};

export const shouldRenderCustomStyles = (
  component: ReactElement,
  options: ShouldRenderCustomStylesOptions = {}
) => {
  const testCases = options.skipStyles
    ? 'classNames and css'
    : 'classNames, css, and styles';
  const testProps = options.skipStyles
    ? { className: customStyles.className, css: customStyles.css }
    : customStyles;

  // Some tests run separate child props tests with different settings & don't need
  // to run the base parent test multiple times. If so, allow skipping this test
  if (!(options.skipParentTest === true && options.childProps)) {
    it(`should render custom ${testCases}`, async () => {
      const result = render(
        <div>{React.cloneElement(component, testProps)}</div>
      );
      await options.renderCallback?.(result);
      assertOutputStyles(result.baseElement, options);
    });
  }

  if (options.childProps) {
    options.childProps.forEach((childProps) => {
      it(`should render custom ${testCases} on ${childProps}`, async () => {
        const mergedChildProps = set({ ...component.props }, childProps, {
          ...get(component.props, childProps),
          ...testProps,
        });
        const result = render(
          <div>{React.cloneElement(component, mergedChildProps)}</div>
        );
        await options.renderCallback?.(result);
        assertOutputStyles(result.baseElement, options);
      });
    });
  }
};
