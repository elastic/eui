/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiModalHeaderTitle } from './modal_header_title';

describe('EuiModalHeaderTitle', () => {
  shouldRenderCustomStyles(<EuiModalHeaderTitle>children</EuiModalHeaderTitle>);

  test('is rendered', () => {
    const { container } = render(
      <EuiModalHeaderTitle {...requiredProps}>children</EuiModalHeaderTitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('component', () => {
    const { container } = render(
      <EuiModalHeaderTitle component="div">children</EuiModalHeaderTitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('allows passing any props that EuiTitle accepts', () => {
    const { container } = render(
      <EuiModalHeaderTitle size="s" textTransform="uppercase">
        children
      </EuiModalHeaderTitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
