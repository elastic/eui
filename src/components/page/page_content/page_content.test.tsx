/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageContent } from './page_content';

describe('EuiPageContent', () => {
  test('is rendered', () => {
    const component = render(<EuiPageContent {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('verticalPosition is rendered', () => {
    const component = render(<EuiPageContent verticalPosition="center" />);

    expect(component).toMatchSnapshot();
  });

  test('horizontalPosition is rendered', () => {
    const component = render(<EuiPageContent horizontalPosition="center" />);

    expect(component).toMatchSnapshot();
  });

  test('role can be removed', () => {
    const component = render(<EuiPageContent role={null} />);

    expect(component).toMatchSnapshot();
  });

  test('accepts panel props', () => {
    const component = render(
      <EuiPageContent
        borderRadius="none"
        hasShadow={false}
        paddingSize="none"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
