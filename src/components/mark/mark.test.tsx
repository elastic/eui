/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';

import { EuiMark } from './mark';

describe('EuiMark', () => {
  test('is rendered', () => {
    const component = render(<EuiMark>Marked</EuiMark>);
    expect(component).toMatchSnapshot();
  });

  test('is rendered without CSS :before and :after text', () => {
    const component = render(
      <EuiMark hasScreenReaderHelpText={false}>Market</EuiMark>
    );
    expect(component).toMatchSnapshot();
  });
});
