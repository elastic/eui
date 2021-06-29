/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageContentHeader } from './page_content_header';

describe('EuiPageContentHeader', () => {
  test('is rendered', () => {
    const component = render(<EuiPageContentHeader {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
