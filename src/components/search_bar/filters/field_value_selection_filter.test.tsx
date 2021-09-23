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
import {
  FieldValueSelectionFilter,
  FieldValueSelectionFilterProps,
} from './field_value_selection_filter';
import { Query } from '../query';

describe('FieldValueSelectionFilter', () => {
  test('render - options as a function', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: () => Promise.resolve([]),
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - options as an array', () => {
    const props: FieldValueSelectionFilterProps = {
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
            value: 'feature',
          },
          {
            value: 'test',
            name: 'Text',
          },
          {
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - fields in options', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        name: 'Tag',
        options: [
          {
            field: 'tag',
            value: 'feature',
          },
          {
            field: 'tag_2',
            value: 'test',
            name: 'Text',
          },
          {
            field: 'tag_3',
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - all configurations', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: true,
        available: () => false,
        loadingMessage: 'loading...',
        noOptionsMessage: 'oops...',
        searchThreshold: 5,
        options: () => Promise.resolve([]),
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - multi-select OR', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: 'or',
        available: () => false,
        loadingMessage: 'loading...',
        noOptionsMessage: 'oops...',
        searchThreshold: 5,
        options: () => Promise.resolve([]),
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('inactive - field is global', () => {
    const props: FieldValueSelectionFilterProps = {
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
            value: 'feature',
          },
          {
            value: 'test',
            name: 'Text',
          },
          {
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('active - field is global', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('tag:bug'),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: [
          {
            value: 'feature',
          },
          {
            value: 'test',
            name: 'Text',
          },
          {
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('inactive - fields in options', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        name: 'Tag',
        options: [
          {
            field: 'tag',
            value: 'feature',
          },
          {
            field: 'tag_2',
            value: 'test',
            name: 'Text',
          },
          {
            field: 'tag_3',
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('active - fields in options', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('tag_3:bug'),
      config: {
        type: 'field_value_selection',
        name: 'Tag',
        options: [
          {
            field: 'tag',
            value: 'feature',
          },
          {
            field: 'tag_2',
            value: 'test',
            name: 'Text',
          },
          {
            field: 'tag_3',
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    const component = shallow(<FieldValueSelectionFilter {...props} />);

    expect(component).toMatchSnapshot();
  });
});
