import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiSuperSelect } from './super_select';

jest.mock(`../form_row/make_id`, () => () => `generated-id`);

describe('EuiSuperSelect', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuperSelect {...requiredProps} onChange={() => {}} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('options are rendered', () => {
      const component = render(
        <EuiSuperSelect
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' }
          ]}
          onChange={() => {}}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('valueSelected is rendered', () => {
      const component = render(
        <EuiSuperSelect
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' }
          ]}
          valueOfSelected="1"
          onChange={() => {}}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('custom display is propagated to dropdown', () => {
      const component = render(
        <EuiSuperSelect
          options={[
            { value: '1', inputDisplay: 'Option #1', dropdownDisplay: 'Custom Display #1' },
            { value: '2', inputDisplay: 'Option #2', dropdownDisplay: 'Custom Display #2' }
          ]}
          onChange={() => {}}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
