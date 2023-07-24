/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiHeaderSectionItem } from './header_section_item';

describe('EuiHeaderSectionItem', () => {
  test('is rendered', () => {
    const { container } = render(<EuiHeaderSectionItem {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders children', () => {
    const { container } = render(
      <EuiHeaderSectionItem>
        <span>Call me Ishmael.</span>
      </EuiHeaderSectionItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('border', () => {
    test('defaults to left', () => {
      const { container } = render(
        <EuiHeaderSectionItem>
          <span>Left is default</span>
        </EuiHeaderSectionItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders right', () => {
      const { container } = render(
        <EuiHeaderSectionItem border="right">
          <span>Right section</span>
        </EuiHeaderSectionItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
