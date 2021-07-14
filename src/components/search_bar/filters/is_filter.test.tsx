/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme';
import { IsFilter, IsFilterProps } from './is_filter';
import { Query } from '../query';

describe('IsFilter', () => {
  test('render', () => {
    const props: IsFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'is',
        field: 'open',
        name: 'Open',
      },
    };

    const component = shallow(<IsFilter {...props} />);

    expect(component).toMatchSnapshot();
  });
});
