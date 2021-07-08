/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPage, SIZES } from './page';

describe('EuiPage', () => {
  test('is rendered', () => {
    const component = render(<EuiPage {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPage paddingSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('grow', () => {
    test('can be false', () => {
      const component = render(<EuiPage grow={false} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('direction', () => {
    test('can be row', () => {
      const component = render(<EuiPage direction="row" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(<EuiPage restrictWidth={true} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(<EuiPage restrictWidth={1024} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and does not override custom style', () => {
      const component = render(
        <EuiPage restrictWidth="24rem" style={{ color: 'red ' }} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
