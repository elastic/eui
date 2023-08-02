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

import { EuiPageContent_Deprecated as EuiPageContent } from './page_content';

describe('EuiPageContent', () => {
  test('is rendered', () => {
    const { container } = render(<EuiPageContent {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('verticalPosition is rendered', () => {
    const { container } = render(<EuiPageContent verticalPosition="center" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('horizontalPosition is rendered', () => {
    const { container } = render(
      <EuiPageContent horizontalPosition="center" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('role can be removed', () => {
    const { container } = render(<EuiPageContent role={null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts panel props', () => {
    const { container } = render(
      <EuiPageContent
        borderRadius="none"
        hasShadow={false}
        paddingSize="none"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
