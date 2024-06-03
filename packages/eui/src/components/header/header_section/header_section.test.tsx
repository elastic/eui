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
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiHeaderSection } from './header_section';

describe('EuiHeaderSection', () => {
  shouldRenderCustomStyles(<EuiHeaderSection />);

  it('renders', () => {
    const { container } = render(
      <EuiHeaderSection {...requiredProps}>
        <span>Some years ago never mind how long precisely...</span>
      </EuiHeaderSection>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('grow', () => {
    it('renders true', () => {
      const { container } = render(<EuiHeaderSection grow />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('side', () => {
    it('renders left', () => {
      const { container } = render(<EuiHeaderSection side="left" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders right', () => {
      const { container } = render(<EuiHeaderSection side="right" />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
