/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { _EuiPageOuter as EuiPageOuter } from './page_outer';

describe('_EuiPageOuter', () => {
  shouldRenderCustomStyles(<EuiPageOuter />);

  test('is rendered', () => {
    const component = render(<EuiPageOuter {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('grow', () => {
    test('can be false', () => {
      const component = render(<EuiPageOuter grow={false} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('direction', () => {
    test('can be row', () => {
      const component = render(<EuiPageOuter direction="row" />);

      expect(component).toMatchSnapshot();
    });
  });
});
