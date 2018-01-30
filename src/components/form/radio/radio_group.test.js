import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiRadioGroup } from './radio_group';

jest.mock('../radio', () => ({ EuiRadio: 'eui_radio' }));

describe('EuiRadioGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRadioGroup {...requiredProps} onChange={() => {}} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('options are rendered', () => {
      const component = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' }
          ]}
          onChange={() => {}}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('idSelected is rendered', () => {
      const component = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' }
          ]}
          idSelected="1"
          onChange={() => {}}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
