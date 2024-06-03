/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { render } from '../../../test/rtl';
import { EuiProvider } from '../../provider';

import { EuiTableHeaderMobile } from './table_header_mobile';

describe('EuiTableHeaderMobile', () => {
  it('does not render if window size is above the default m breakpoint', () => {
    const { container } = render(<EuiTableHeaderMobile />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders when below the responsive breakpoint', () => {
    const { container } = render(
      <EuiTableHeaderMobile responsiveBreakpoint="xl" {...requiredProps} />
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('respects EuiProvider.componentDefaults', () => {
    const { container } = render(
      <EuiProvider
        componentDefaults={{
          EuiTable: { responsiveBreakpoint: 'xl' },
        }}
      >
        <EuiTableHeaderMobile />
      </EuiProvider>,
      { wrapper: undefined }
    );

    expect(container).not.toBeEmptyDOMElement();
  });
});
