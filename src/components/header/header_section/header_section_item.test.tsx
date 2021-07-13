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

import { EuiHeaderSectionItem } from './header_section_item';

describe('EuiHeaderSectionItem', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderSectionItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <EuiHeaderSectionItem>
        <span>Call me Ishmael.</span>
      </EuiHeaderSectionItem>
    );

    expect(component).toMatchSnapshot();
  });

  describe('border', () => {
    test('defaults to left', () => {
      const component = render(<EuiHeaderSectionItem />);

      expect(component).toMatchSnapshot();
    });

    test('renders right', () => {
      const component = render(<EuiHeaderSectionItem border="right" />);

      expect(component).toMatchSnapshot();
    });
  });
});
