import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme';
import { Query } from '../query';
import { FieldValueToggleGroupFilter } from './field_value_toggle_group_filter';

describe('TermToggleGroupFilter', () => {
  test('render', () => {
    const props = {
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
    const props = {
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
    const props = {
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
    const props = {
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
