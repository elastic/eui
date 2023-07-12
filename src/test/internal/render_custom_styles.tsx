/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { JSXElementConstructor, ReactElement } from 'react';
import { css } from '@emotion/react';
import { get, set } from 'lodash';

import { render } from '../rtl';
import { cloneElementWithCss } from '../../services';
import { keysOf } from '../../components';

export const customStyles = {
  className: 'hello',
  css: css`
    color: red;
  `,
  style: { content: "'world'" },
};

/**
 * Use this test helper to quickly check that the component supports custom
 * `className`, `css`, and `style` properties.
 *
 * Example usage:
 *
 * shouldRenderCustomStyles(<EuiMark {...requiredProps} />Marked</EuiMark>);
 * shouldRenderCustomStyles(<EuiPageSection />, { childProps: ['contentProps'] });
 */
type ShouldRenderCustomStylesOptions = {
  /**
   * Used to test that child component props correctly accept custom styles
   * e.g., `iconProps`, `wrapperProps`, `labelProps`, etc.
   */
  childProps?: string[];
  /**
   * If a more specific selector needs to be passed for any reason,
   * e.g. if there are multiple copies of the element on the page, or
   * if the node to examine isn't the same one that `className` is applied to
   */
  targetSelector?: string;
  /**
   * Allows configuring specific assertions skips
   */
  skip?: {
    /**
     * Useful for, e.g. components that do not allow custom inline styles
     * or components where `style` isn't on the same DOM node as `className`
     */
    style?: boolean;
    className?: boolean;
    css?: boolean;
    /**
     * Useful for running separate parent and `childProps` tests/setups
     */
    parentTest?: boolean;
  };
  /**
   * Passed directly to RTL's `options.wrapper
   * Used for components that need (e.g.) a context wrapper
   */
  wrapper?: JSXElementConstructor<any>;
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
  // Account for any skipped props
  const testProps = keysOf(customStyles).reduce((map, key) => {
    return options.skip?.[key] ? map : { ...map, [key]: customStyles[key] };
  }, {} as Partial<typeof customStyles>);

  // Generate a grammatically excellent list of props being tested
  let propsToTest = '';
  const propsToTestArr = Object.keys(testProps);
  switch (propsToTestArr.length) {
    case 1:
      propsToTest = propsToTestArr[0];
      break;
    case 2:
      propsToTest = `${propsToTestArr[0]} and ${propsToTestArr[1]}`;
      break;
    // You'll pry the oxford comma from my cold dead hands
    default:
      propsToTest = `${propsToTestArr
        .slice(0, -1)
        .join(', ')}, and ${propsToTestArr.slice(-1)}`;
      break;
  }

  // Some tests run separate child props tests with different settings & don't need
  // to run the base parent test multiple times. If so, allow skipping this test
  if (!(options.skip?.parentTest && options.childProps)) {
    it(`should render custom ${propsToTest}`, async () => {
      const euiCss = await getEuiEmotionCss();
      const { baseElement } = await renderWith(testProps);
      assertOutputStyles(baseElement, euiCss);
    });
  }

  if (options.childProps) {
    options.childProps.forEach((childProps) => {
      it(`should render custom ${propsToTest} on ${childProps}`, async () => {
        const euiCss = await getEuiEmotionCss(childProps);

        const mergedChildProps = mergeChildProps(
          component.props,
          childProps,
          testProps
        );
        const { baseElement } = await renderWith(mergedChildProps);

        assertOutputStyles(baseElement, euiCss);
      });
    });
  }

  /**
   * Internal utils
   */

  const assertOutputStyles = (rendered: HTMLElement, euiCss: string = '') => {
    // className
    const renderedClassName = rendered.querySelector('.hello');
    if (!options?.skip?.className) {
      expect(renderedClassName).not.toBeNull();
    }

    // Set remaining assertions to use `options.targetSelector` if it exists,
    // or fall back to the className selector if not
    const componentNode = options.targetSelector
      ? rendered.querySelector(options.targetSelector)
      : renderedClassName;

    // css
    if (!options?.skip?.css) {
      expect(componentNode!.getAttribute('class')).toContain(
        `${euiCss}-css` // should have generated an Emotion class ending with -css while still maintaining any EUI Emotion CSS already set on the component
      );
    }

    // style
    if (!options.skip?.style) {
      expect(componentNode!.getAttribute('style')).toContain(
        "content: 'world';"
      );
    }
  };

  // In order to check that consumer css`` is being merged correctly with EUI css``
  // instead of overriding it, we need to grab the baseline component's classes
  const getEuiEmotionCss = async (childProps?: string) => {
    if (options.skip?.css) return;

    const testProps = childProps
      ? mergeChildProps(component.props, childProps, {
          className: customStyles.className,
        })
      : { className: customStyles.className };

    const { baseElement, unmount } = await renderWith(testProps);
    const target = baseElement.querySelector(
      options.targetSelector || `.${customStyles.className}`
    )!;
    const classes = target.getAttribute('class')?.split(' ');
    unmount(); // Ensure this baseline render doesn't pollute following renders

    let euiCss = '';
    classes?.forEach((classString: string) => {
      if (!classString.startsWith('css-')) return;

      const matches = classString.match(/css-[\d\w-]{4,12}-(?<euiCss>eui.+)/);
      if (matches?.groups?.euiCss) {
        euiCss = matches.groups.euiCss;
      }
    });
    return euiCss;
  };

  // Render element with specified props (merging CSS correctly as Emotion does)
  // and DRYing out `options` handling
  const renderWith = async (props: unknown) => {
    const result = render(<div>{cloneElementWithCss(component, props)}</div>, {
      wrapper: options.wrapper,
    });
    await options.renderCallback?.(result);

    return result;
  };

  const mergeChildProps = (props: any, key: string, nestedProps: any) => {
    return set({ ...props }, key, {
      ...get(props, key),
      ...nestedProps,
    });
  };
};
