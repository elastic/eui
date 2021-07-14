/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiRadio } from './radio';

describe('EuiRadio', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRadio id="id" onChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('checked is rendered', () => {
      const component = render(
        <EuiRadio id="id" onChange={() => {}} checked />
      );

      expect(component).toMatchSnapshot();
    });

    test('label is rendered', () => {
      const component = render(
        <EuiRadio id="id" onChange={() => {}} label={<span>Label</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('value is rendered', () => {
      const component = render(
        <EuiRadio id="id" onChange={() => {}} value={'bobbins'} />
      );

      expect(component).toMatchSnapshot();
    });

    test('disabled is rendered', () => {
      const component = render(
        <EuiRadio id="id" onChange={() => {}} disabled />
      );

      expect(component).toMatchSnapshot();
    });

    test('labelProps is rendered', () => {
      const component = render(
        <EuiRadio
          id="id"
          onChange={() => {}}
          label="Label"
          labelProps={requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
