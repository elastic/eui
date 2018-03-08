import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme';
import { FieldValueSelectionFilter } from './field_value_selection_filter';
import { Query } from '../query';

describe('FieldValueSelectionFilter', () => {

  test('render - options as a function', () => {

    const props = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: () => {}
      }
    };

    const component = shallow(
      <FieldValueSelectionFilter {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - options as an array', () => {

    const props = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: [
          {
            value: 'feature'
          },
          {
            value: 'test',
            name: 'Text'
          },
          {
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>
          }
        ]
      }
    };

    const component = shallow(
      <FieldValueSelectionFilter {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - all configurations', () => {

    const props = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: true,
        available: () => {},
        loadingMessage: 'loading...',
        noOptionsMessage: 'oops...',
        searchThreshold: 5,
        options: () => {}
      }
    };

    const component = shallow(
      <FieldValueSelectionFilter {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - multi-select OR', () => {

    const props = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: 'or',
        available: () => {},
        loadingMessage: 'loading...',
        noOptionsMessage: 'oops...',
        searchThreshold: 5,
        options: () => {}
      }
    };

    const component = shallow(
      <FieldValueSelectionFilter {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
