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
    const { baseElement } = render(
      <div>{React.cloneElement(component, customStyles)}</div>
    );

    // className
    const componentNode = baseElement.querySelector('.hello');
    expect(componentNode).not.toBeNull();
    // css
    expect(componentNode!.getAttribute('class')).toEqual(
      expect.stringMatching(/css-[\d\w-]{6,}-css/) // should have generated an emotion class ending with -css
    );
    // style
    expect(componentNode!.getAttribute('style')).toContain("content: 'world';");
  });
};
