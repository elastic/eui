import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme';
import { Query } from '../query';
import { FieldValueToggleFilter } from './field_value_toggle_filter';

describe('FieldValueToggleFilter', () => {
  test('render', () => {
    const props = {
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

    const component = shallow(<FieldValueToggleFilter {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('render - active', () => {
    const props = {
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

    const component = shallow(<FieldValueToggleFilter {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('render - active negated', () => {
    const props = {
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

    const component = shallow(<FieldValueToggleFilter {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('render - active negated - custom negated name', () => {
    const props = {
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

    const component = shallow(<FieldValueToggleFilter {...props} />);
    expect(component).toMatchSnapshot();
  });
});
