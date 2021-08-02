/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
