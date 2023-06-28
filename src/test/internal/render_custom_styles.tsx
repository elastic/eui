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
      const euiCss = await getEuiEmotionCss();
      const { baseElement } = await renderWith(testProps);
      assertOutputStyles(baseElement, euiCss);
    });
  }

  if (options.childProps) {
    options.childProps.forEach((childProps) => {
      it(`should render custom ${testCases} on ${childProps}`, async () => {
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
    const componentNode = rendered.querySelector('.hello');
    expect(componentNode).not.toBeNull();

    // css
    expect(componentNode!.getAttribute('class')).toContain(
      `${euiCss}-css` // should have generated an Emotion class ending with -css while still maintaining any EUI Emotion CSS already set on the component
    );

    // style
    // skippable as some components explicitly do not accept custom inline styles
    if (!options.skipStyles) {
      expect(componentNode!.getAttribute('style')).toContain(
        "content: 'world';"
      );
    }
  };

  // In order to check that consumer css`` is being merged correctly with EUI css``
  // instead of overriding it, we need to grab the baseline component's classes
  const getEuiEmotionCss = async (childProps?: string) => {
    const testProps = childProps
      ? mergeChildProps(component.props, childProps, {
          className: customStyles.className,
        })
      : { className: customStyles.className };

    const { baseElement, unmount } = await renderWith(testProps);
    const target = baseElement.querySelector(`.${customStyles.className}`)!;
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
    const result = render(<div>{React.cloneElement(component, props)}</div>);
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
