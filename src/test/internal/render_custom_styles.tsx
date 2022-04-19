/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement } from 'react';
import { render } from 'enzyme';
import { css } from '@emotion/react';

/**
 * Use this test helper to quickly check that the component supports custom
 * `className`, `css`, and `style` properties.
 *
 * Example usage:
 *
 * shouldRenderCustomStyles(<EuiMark {...requiredProps} />Marked</EuiMark>);
 */
export const shouldRenderCustomStyles = (component: ReactElement) => {
  it('should render custom classNames, css, and styles', () => {
    const rendered = render(
      <div>
        {React.cloneElement(component, {
          className: 'hello',
          css: css`
            color: red;
          `,
          style: { content: "'world'" },
        })}
      </div>
    );

    // className
    const componentNode = rendered.find('.hello');
    expect(componentNode).toHaveLength(1);
    // css
    expect(componentNode.attr('class')).toEqual(
      expect.stringMatching(/css-[\d\w]{7}-css/) // should have generated an emotion class ending with -css
    );
    // style
    expect(componentNode.attr('style')).toContain("content:'world'");
  });
};
