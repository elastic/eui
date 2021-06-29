/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableMessage } from './selectable_message';

describe('EuiSelectableMessage', () => {
  test('is rendered', () => {
    const component = render(<EuiSelectableMessage {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('bordered is rendered', () => {
    const component = render(<EuiSelectableMessage bordered={true} />);

    expect(component).toMatchSnapshot();
  });
});
