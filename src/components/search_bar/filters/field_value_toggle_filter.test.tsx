/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test';

import { Query } from '../query';
import {
  FieldValueToggleFilter,
  FieldValueToggleFilterProps,
} from './field_value_toggle_filter';

describe('FieldValueToggleFilter', () => {
  it('renders', () => {
    const props: FieldValueToggleFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_toggle',
        field: 'group',
        value: 'kibana',
        name: 'Kibana',
      },
    };

    const { container } = render(<FieldValueToggleFilter {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('render - active', () => {
    const props: FieldValueToggleFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('group:kibana'),
      config: {
        type: 'field_value_toggle',
        field: 'group',
        value: 'kibana',
        name: 'Kibana',
      },
    };

    const { container } = render(<FieldValueToggleFilter {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('render - active negated', () => {
    const props: FieldValueToggleFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('-group:kibana'),
      config: {
        type: 'field_value_toggle',
        field: 'group',
        value: 'kibana',
        name: 'Kibana',
      },
    };

    const { container } = render(<FieldValueToggleFilter {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('render - active negated - custom negated name', () => {
    const props: FieldValueToggleFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('-group:kibana'),
      config: {
        type: 'field_value_toggle',
        field: 'group',
        value: 'kibana',
        name: 'Kibana',
        negatedName: 'Others',
      },
    };

    const { container } = render(<FieldValueToggleFilter {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
