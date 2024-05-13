/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiSearchBox } from './search_box';

describe('EuiSearchBox', () => {
  test('render - no config', () => {
    const props = {
      ...requiredProps,
      query: '',
      onSearch: () => {},
    };

    const { container } = render(<EuiSearchBox {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('render - custom placeholder and incremental', () => {
    const props = {
      ...requiredProps,
      query: '',
      onSearch: () => {},
      placeholder: '...',
      incremental: true,
    };

    const { container } = render(<EuiSearchBox {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
