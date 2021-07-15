/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { EuiPortal } from './portal';

describe('EuiPortal', () => {
  test('is rendered', () => {
    const component = mount(
      <div>
        <EuiPortal>Content</EuiPortal>
      </div>
    );

    expect(component).toMatchSnapshot();
  });
});
