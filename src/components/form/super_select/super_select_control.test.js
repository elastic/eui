import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiSuperSelectControl } from './super_select_control';

jest.mock(`../form_row/make_id`, () => () => `generated-id`);

describe('EuiSuperSelectControl', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuperSelectControl {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = render(
        <EuiSuperSelectControl fullWidth/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const component = render(
        <EuiSuperSelectControl compressed/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(
        <EuiSuperSelectControl isLoading/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(
        <EuiSuperSelectControl isInvalid/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('disabled options are rendered', () => {
      const component = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1', disabled: false },
            { value: '2', inputDisplay: 'Option #2', disabled: true }
          ]}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('value option is rendered', () => {
      const component = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' }
          ]}
          value={'1'}
          onChange={() => {}}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('empty value option is rendered', () => {
      const component = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' }
          ]}
          value={''}
          onChange={() => {}}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
