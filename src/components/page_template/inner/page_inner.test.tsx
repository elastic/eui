/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { PADDING_SIZES } from '../../../global_styling';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { _EuiPageInner as EuiPageInner } from './page_inner';

describe('_EuiPageInner', () => {
  shouldRenderCustomStyles(<EuiPageInner />);

  test('is rendered', () => {
    const component = render(<EuiPageInner {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('panelled is rendered', () => {
    const component = render(<EuiPageInner panelled={true} />);

    expect(component).toMatchSnapshot();
  });

  test('border is rendered', () => {
    const component = render(<EuiPageInner border={true} />);

    expect(component).toMatchSnapshot();
  });

  describe('component', () => {
    it('renders HTML tag strings', () => {
      const component = render(<EuiPageInner component="div" />);

      expect(component).toMatchSnapshot();
    });

    it('renders custom React components', () => {
      const TestComponent: React.FC<{ test?: boolean }> = ({ test }) => (
        <div>{test ? 'hello' : 'world'}</div>
      );

      const component = render(
        <>
          <EuiPageInner component={TestComponent} test />
          <EuiPageInner component={TestComponent} />
        </>
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPageInner paddingSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
