import React from 'react';
import { mount, render } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../../test';

import { EuiSuperSelect } from './super_select';

jest.mock('../form_row/make_id', () => () => 'generated-id');

jest.mock('../../portal', () => ({
  EuiPortal: ({ children }) => children,
}));

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
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

      expect(component).toMatchSnapshot();
    });
  });
});
