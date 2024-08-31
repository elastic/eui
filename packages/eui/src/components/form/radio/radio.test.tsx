/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiRadio } from './radio';

describe('EuiRadio', () => {
  shouldRenderCustomStyles(
    <EuiRadio onChange={() => {}} id="id" label="test" />,
    { childProps: ['labelProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiRadio id="id" onChange={() => {}} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('checked is rendered', () => {
      const { container } = render(
        <EuiRadio id="id" onChange={() => {}} checked />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('label is rendered', () => {
      const { container } = render(
        <EuiRadio id="id" onChange={() => {}} label={<span>Label</span>} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is rendered', () => {
      const { container } = render(
        <EuiRadio id="id" onChange={() => {}} value={'bobbins'} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled is rendered', () => {
      const { container } = render(
        <EuiRadio id="id" onChange={() => {}} disabled />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('labelProps is rendered', () => {
      const { container } = render(
        <EuiRadio
          id="id"
          onChange={() => {}}
          label="Label"
          labelProps={requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('onChange is fired', () => {
      const onChange = jest.fn();
      const { getByRole } = render(
        <EuiRadio id="id" onChange={onChange} label="test" />
      );
      fireEvent.click(getByRole('radio', { name: 'test' }));

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
