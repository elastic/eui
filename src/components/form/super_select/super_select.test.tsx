/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, render } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../../test';

import { EuiSuperSelect } from './super_select';

jest.mock('../../portal', () => ({
  EuiPortal: ({ children }: any) => children,
}));

const options = [
  { value: '1', inputDisplay: 'Option #1' },
  { value: '2', inputDisplay: 'Option #2' },
];

describe('EuiSuperSelect', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuperSelect
        {...requiredProps}
        options={options}
        onChange={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = render(
        <EuiSuperSelect
          {...requiredProps}
          options={options}
          onChange={() => {}}
          fullWidth
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const component = render(
        <EuiSuperSelect
          {...requiredProps}
          options={options}
          onChange={() => {}}
          compressed
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered with a prepend and append', () => {
      const component = render(
        <EuiSuperSelect
          {...requiredProps}
          options={options}
          onChange={() => {}}
          prepend="prepend"
          append="append"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('select component is rendered', () => {
      const component = render(
        <EuiSuperSelect
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('options are rendered when select is open', () => {
      const component = mount(
        <EuiSuperSelect
          options={options}
          onChange={() => {}}
          data-test-subj="superSelect"
        />
      );

      component.find('button[data-test-subj="superSelect"]').simulate('click');

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });

    test('valueSelected is rendered', () => {
      const component = render(
        <EuiSuperSelect
          options={options}
          valueOfSelected="2"
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('custom display is propagated to dropdown', () => {
      const component = mount(
        <EuiSuperSelect
          options={[
            {
              value: '1',
              inputDisplay: 'Option #1',
              dropdownDisplay: 'Custom Display #1',
            },
            {
              value: '2',
              inputDisplay: 'Option #2',
              dropdownDisplay: 'Custom Display #2',
            },
          ]}
          onChange={() => {}}
          data-test-subj="superSelect"
        />
      );

      component.find('button[data-test-subj="superSelect"]').simulate('click');

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });

    test('more props are propogated to each option', () => {
      const component = mount(
        <EuiSuperSelect
          options={[
            { value: '1', inputDisplay: 'Option #1', disabled: true },
            {
              value: '2',
              inputDisplay: 'Option #2',
              'data-test-subj': 'option two',
            },
          ]}
          valueOfSelected="1"
          onChange={() => {}}
          data-test-subj="superSelect"
        />
      );

      component.find('button[data-test-subj="superSelect"]').simulate('click');

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });
  });
});
