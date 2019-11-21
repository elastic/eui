import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiRadioGroup } from './radio_group';

jest.mock('../radio', () => ({ EuiRadio: 'eui_radio' }));

describe('EuiRadioGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRadioGroup {...requiredProps} options={[]} onChange={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('options are rendered', () => {
      const component = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2', disabled: true },
          ]}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('name is propagated to radios', () => {
      const component = render(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('idSelected is rendered', () => {
      const component = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          idSelected="1"
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('value is propagated to radios', () => {
      const component = render(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1', value: 'Value #1' },
            { id: '2', label: 'Option #2', value: 'Value #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('callbacks', () => {
    test('id is used in callbacks when no value is available', () => {
      const callback = jest.fn();

      const component = mount(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          onChange={callback}
        />
      );

      component.find('input[id="2"]').simulate('change');

      expect(callback).toHaveBeenCalledTimes(1);
      const event = expect.any(Object);
      expect(callback).toHaveBeenCalledWith('2', undefined, event);
    });

    test('value is used in callbacks when available', () => {
      const callback = jest.fn();

      const component = mount(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1', value: 'Value #1' },
            { id: '2', label: 'Option #2', value: 'Value #2' },
          ]}
          onChange={callback}
        />
      );

      component.find('input[id="2"]').simulate('change');

      expect(callback).toHaveBeenCalledTimes(1);
      const event = expect.any(Object);
      expect(callback).toHaveBeenCalledWith('2', 'Value #2', event);
    });
  });
});
