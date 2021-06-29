/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiDescriptionListDescription } from './description_list_description';

describe('EuiDescriptionListDescription', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptionListDescription {...requiredProps}>
        Content
      </EuiDescriptionListDescription>
    );

    expect(component).toMatchSnapshot();
  });
});
