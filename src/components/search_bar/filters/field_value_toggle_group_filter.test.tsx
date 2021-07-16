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
import { Query } from '../query';
import {
  FieldValueToggleGroupFilter,
  FieldValueToggleGroupFilterProps,
} from './field_value_toggle_group_filter';

describe('TermToggleGroupFilter', () => {
  test('render', () => {
    const props: FieldValueToggleGroupFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_toggle_group',
        field: 'group',
        items: [
          {
            value: 'kibana',
            name: 'Kibana',
          },
          {
            value: 'es',
            name: 'Elasticsearch',
          },
        ],
      },
    };

    const component = shallow(<FieldValueToggleGroupFilter {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('render - active', () => {
    const props: FieldValueToggleGroupFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('group:kibana'),
      config: {
        type: 'field_value_toggle_group',
        field: 'group',
        items: [
          {
            value: 'kibana',
            name: 'Kibana',
          },
          {
            value: 'es',
            name: 'Elasticsearch',
          },
        ],
      },
    };

    const component = shallow(<FieldValueToggleGroupFilter {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('render - active negated', () => {
    const props: FieldValueToggleGroupFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('-group:kibana'),
      config: {
        type: 'field_value_toggle_group',
        field: 'group',
        items: [
          {
            value: 'kibana',
            name: 'Kibana',
          },
          {
            value: 'es',
            name: 'Elasticsearch',
          },
        ],
      },
    };

    const component = shallow(<FieldValueToggleGroupFilter {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('render - active negated - custom negated name', () => {
    const props: FieldValueToggleGroupFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('-group:kibana'),
      config: {
        type: 'field_value_toggle_group',
        field: 'group',
        items: [
          {
            value: 'kibana',
            name: 'Kibana',
            negatedName: '-Kibana',
          },
          {
            value: 'es',
            name: 'Elasticsearch',
          },
        ],
      },
    };

    const component = shallow(<FieldValueToggleGroupFilter {...props} />);
    expect(component).toMatchSnapshot();
  });
});
