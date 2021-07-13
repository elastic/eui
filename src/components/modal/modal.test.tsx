/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { EuiModal } from './modal';

test('renders EuiModal', () => {
  const component = (
    <EuiModal onClose={() => {}} {...requiredProps}>
      children
    </EuiModal>
  );

  expect(
    takeMountedSnapshot(mount(component), { hasArrayOutput: true })
  ).toMatchSnapshot();
});
