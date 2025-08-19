/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { render } from '../../../test/rtl';
import { fireEvent } from '@testing-library/react';

import { EuiRadioGroup } from './radio_group';

jest.mock('../radio', () => ({ EuiRadio: 'eui_radio' }));

describe('EuiRadioGroup', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiRadioGroup {...requiredProps} options={[]} onChange={() => {}} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('options are rendered', () => {
      const { container } = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2', disabled: true },
          ]}
          onChange={() => {}}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('name is propagated to radios', () => {
      const { container } = render(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('idSelected is rendered', () => {
      const { container } = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          idSelected="1"
          onChange={() => {}}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is propagated to radios', () => {
      const { container } = render(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1', value: 'Value #1' },
            { id: '2', label: 'Option #2', value: 'Value #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('legend is rendered', () => {
      const { container } = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          onChange={() => {}}
          legend={{
            children: 'A legend',
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('callbacks', () => {
    test('id is used in callbacks when no value is available', () => {
      const callback = jest.fn();

      const { getByLabelText } = render(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          onChange={callback}
        />
      );

      fireEvent.click(getByLabelText('Option #2'));

      expect(callback).toHaveBeenCalledTimes(1);
      const event = expect.any(Object);
      expect(callback).toHaveBeenCalledWith('2', undefined, event);
    });

    test('value is used in callbacks when available', () => {
      const callback = jest.fn();

      const { getByLabelText } = render(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1', value: 'Value #1' },
            { id: '2', label: 'Option #2', value: 'Value #2' },
          ]}
          onChange={callback}
        />
      );

      fireEvent.click(getByLabelText('Option #2'));

      expect(callback).toHaveBeenCalledTimes(1);
      const event = expect.any(Object);
      expect(callback).toHaveBeenCalledWith('2', 'Value #2', event);
    });
  });
});
