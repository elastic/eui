/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiCode } from './code';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCode', () => {
  shouldRenderCustomStyles(<EuiCode>{code}</EuiCode>);

  it('renders a code snippet', () => {
    const { container } = render(<EuiCode {...requiredProps}>{code}</EuiCode>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders transparent backgrounds', () => {
    const { container } = render(
      <EuiCode {...requiredProps} transparentBackground>
        {code}
      </EuiCode>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders languages', () => {
    const { container } = render(
      <EuiCode {...requiredProps} language="js">
        {code}
      </EuiCode>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
