/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { _EuiPageOuter as EuiPageOuter } from './page_outer';

describe('_EuiPageOuter', () => {
  shouldRenderCustomStyles(<EuiPageOuter />);

  test('is rendered', () => {
    const { container } = render(<EuiPageOuter {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('grow', () => {
    test('can be false', () => {
      const { container } = render(<EuiPageOuter grow={false} />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('direction', () => {
    test('can be row', () => {
      const { container } = render(<EuiPageOuter direction="row" />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
