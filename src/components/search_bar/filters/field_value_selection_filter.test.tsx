/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
