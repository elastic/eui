/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableMessage } from './selectable_message';

describe('EuiSelectableMessage', () => {
  test('is rendered', () => {
    const { container } = render(<EuiSelectableMessage {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('bordered is rendered', () => {
    const { container } = render(<EuiSelectableMessage bordered={true} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
