/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiModalHeaderTitle } from './modal_header_title';

test('renders EuiModalHeaderTitle', () => {
  const component = (
    <EuiModalHeaderTitle {...requiredProps}>children</EuiModalHeaderTitle>
  );
  expect(render(component)).toMatchSnapshot();
});
