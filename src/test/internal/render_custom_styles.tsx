/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { css } from '@emotion/react';

const customStyles = {
  className: 'hello',
  css: css`
    color: red;
  `,
  style: { content: "'world'" },
};

const assertOutputStyles = (rendered: HTMLElement) => {
  // className
  const componentNode = rendered.querySelector('.hello');
  expect(componentNode).not.toBeNull();
  // css
  expect(componentNode!.getAttribute('class')).toEqual(
    expect.stringMatching(/css-[\d\w-]{6,}-css/) // should have generated an emotion class ending with -css
  );
  // style
  expect(componentNode!.getAttribute('style')).toContain("content: 'world';");
};

/**
 * Use this test helper to quickly check that the component supports custom
 * `className`, `css`, and `style` properties.
 *
 * Use the second childProps arg to ensure that any child component props
 * also correctly accept custom css/classes/styles.
 *
 * Example usage:
 *
 * shouldRenderCustomStyles(<EuiMark {...requiredProps} />Marked</EuiMark>);
 * shouldRenderCustomStyles(<EuiPageSection />, ['contentProps']);
 */
export const shouldRenderCustomStyles = (
  component: ReactElement,
  childProps?: string[]
) => {
  it('should render custom classNames, css, and styles', () => {
    const { baseElement } = render(
      <div>{React.cloneElement(component, customStyles)}</div>
    );
    assertOutputStyles(baseElement);
  });

  if (childProps) {
    childProps.forEach((_childProps) => {
      it(`should render custom classNames, css, and styles on ${_childProps}`, () => {
        const { baseElement } = render(
          <div>
            {React.cloneElement(component, {
              [_childProps]: {
                ...(component.props[_childProps] || {}),
                ...customStyles,
              },
            })}
          </div>
        );
        assertOutputStyles(baseElement);
      });
    });
  }
};
