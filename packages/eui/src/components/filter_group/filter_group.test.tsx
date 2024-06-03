/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiFilterGroup } from './filter_group';

describe('EuiFilterGroup', () => {
  shouldRenderCustomStyles(<EuiFilterGroup />);

  it('renders', () => {
    const { container } = render(<EuiFilterGroup {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth', () => {
      const { container } = render(<EuiFilterGroup fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('compressed', () => {
      const { container } = render(<EuiFilterGroup compressed />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
