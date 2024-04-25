/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import { render } from '../../test/rtl';

import { cloneElementWithCss } from './clone_element';

describe('cloneElementWithCss', () => {
  const CloningParent: React.FC<any> = ({ children, ...props }) => {
    return cloneElementWithCss(children, props);
  };

  it('correctly renders css on elements that do not already have a `css` property', () => {
    const { container } = render(
      <CloningParent css={{ color: 'red' }}>
        <div>hello world</div>
      </CloningParent>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="css-hwfcu5"
      >
        hello world
      </div>
    `);
    expect(container.firstChild).toHaveStyleRule('color', 'red');
  });

  it('combines css properties on cloned elements that already have a `css` property', () => {
    const { container } = render(
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

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="css-1x864jj-CloningParent"
      >
        hello world
      </div>
    `);
    expect(container.firstChild).toHaveStyleRule('color', 'red');
    expect(container.firstChild).toHaveStyleRule('background-color', 'blue');
  });

  it('handles components', () => {
    const TestComponent: React.FC = (props) => (
      <div css={{ backgroundColor: 'blue' }} {...props}>
        hello world
      </div>
    );

    const { container } = render(
      <CloningParent css={{ color: 'red' }}>
        <TestComponent css={{ border: '1px solid black' }} />
      </CloningParent>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="css-pie7sa-TestComponent-CloningParent"
      >
        hello world
      </div>
    `);
    expect(container.firstChild).toHaveStyleRule('color', 'red');
    expect(container.firstChild).toHaveStyleRule('background-color', 'blue');
    expect(container.firstChild).toHaveStyleRule('border', '1px solid black');
  });

  it('does nothing if no css property is set', () => {
    const { container } = render(
      <CloningParent className="test">
        <div>hello world</div>
      </CloningParent>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="test"
      >
        hello world
      </div>
    `);
    expect(container.firstChild).not.toHaveStyleRule('color', 'red');
  });
});
