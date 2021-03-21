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
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldText } from './field_text';

jest.mock('../validatable_control', () => ({
  EuiValidatableControl: 'eui-validatable-control',
}));

describe('EuiFieldText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldText
        name="elastic"
        id="1"
        value="1"
        inputRef={() => {}}
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('icon is rendered', () => {
      const component = render(<EuiFieldText icon="bolt" />);

      expect(component).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(<EuiFieldText isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<EuiFieldText fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('readOnly is rendered', () => {
      const component = render(<EuiFieldText readOnly />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiFieldText isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const component = render(<EuiFieldText compressed />);

      expect(component).toMatchSnapshot();
    });

    test('controlOnly is rendered', () => {
      const component = render(<EuiFieldText controlOnly />);

      expect(component).toMatchSnapshot();
    });

    test('placeholder is rendered', () => {
      const component = render(<EuiFieldText placeholder="Placeholder" />);

      expect(component).toMatchSnapshot();
    });

    test('prepend is rendered', () => {
      const component = render(<EuiFieldText prepend="prepend" />);

      expect(component).toMatchSnapshot();
    });

    test('append is rendered', () => {
      const component = render(<EuiFieldText append="append" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('form row props', () => {
    test('are rendered', () => {
      const component = render(
        <EuiFieldText
          helpText={'helpText'}
          error={'error'}
          label={'label'}
          labelAppend={'labelAppend'}
          labelProps={requiredProps}
          hasEmptyLabelSpace={true}
          display="columnCompressed"
          fullWidth={true}
          isInvalid={true}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
