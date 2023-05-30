/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import { render } from 'enzyme';

import { cloneElementWithCss } from './clone_element';

describe('cloneElementWithCss', () => {
  const CloningParent: React.FC<any> = ({ children, ...props }) => {
    return cloneElementWithCss(children, props);
  };

  it('correctly renders css on elements that do not already have a `css` property', () => {
    const component = render(
      <CloningParent css={{ color: 'red' }}>
        <div>hello world</div>
      </CloningParent>
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        class="css-1h3ogp1-component"
      >
        hello world
      </div>
    `);
    expect(component).toHaveStyleRule('color', 'red');
  });

  it('combines css properties on cloned elements that already have a `css` property', () => {
    const component = render(
      <CloningParent css={{ color: 'red' }}>
        <div
          css={[
            css`
              background-color: blue;
            `,
          ]}
        >
          hello world
        </div>
      </CloningParent>
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        class="css-88aly5-component-component-component"
      >
        hello world
      </div>
    `);
    expect(component).toHaveStyleRule('color', 'red');
    expect(component).toHaveStyleRule('background-color', 'blue');
  });

  it('handles components', () => {
    const TestComponent: React.FC = (props) => (
      <div css={{ backgroundColor: 'blue' }} {...props}>
        hello world
      </div>
    );

    const component = render(
      <CloningParent css={{ color: 'red' }}>
        <TestComponent css={{ border: '1px solid black' }} />
      </CloningParent>
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        class="css-1fcrfq4-TestComponent-component-component"
      >
        hello world
      </div>
    `);
    expect(component).toHaveStyleRule('color', 'red');
    expect(component).toHaveStyleRule('background-color', 'blue');
    expect(component).toHaveStyleRule('border', '1px solid black');
  });

  it('does nothing if no css property is set', () => {
    const component = render(
      <CloningParent className="test">
        <div>hello world</div>
      </CloningParent>
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        class="test"
      >
        hello world
      </div>
    `);
    expect(component).not.toHaveStyleRule('color', 'red');
  });
});
