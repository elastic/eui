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

import { EuiHeaderSection } from './header_section';

describe('EuiHeaderSection', () => {
  test('is rendered', () => {
    const { container } = render(<EuiHeaderSection {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders optional params', () => {
    const { container } = render(
      <EuiHeaderSection style={{ color: 'blue' }}>
        <span>Some years ago never mind how long precisely...</span>
      </EuiHeaderSection>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('grow', () => {
    test('defaults to false', () => {
      const { container } = render(<EuiHeaderSection />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders true', () => {
      const { container } = render(<EuiHeaderSection grow />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('side', () => {
    test('defaults to left', () => {
      const { container } = render(<EuiHeaderSection />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders right', () => {
      const { container } = render(<EuiHeaderSection side="right" />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
