/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTab } from './tab';

describe('EuiTab', () => {
  test('renders button', () => {
    const component = (
      <EuiTab onClick={() => {}} {...requiredProps}>
        children
      </EuiTab>
    );
    expect(render(component)).toMatchSnapshot();
  });

  test('renders anchor', () => {
    const component = (
      <EuiTab href="/baz/bing" {...requiredProps}>
        children
      </EuiTab>
    );
    expect(render(component)).toMatchSnapshot();
  });

  test('renders isSelected', () => {
    const component = (
      <EuiTab onClick={() => {}} isSelected {...requiredProps}>
        children
      </EuiTab>
    );
    expect(render(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('onClick', () => {
      test('is called when the button is clicked', () => {
        const onClickHandler = jest.fn();

        const $button = shallow(<EuiTab onClick={onClickHandler} />);

        $button.simulate('click');

        expect(onClickHandler).toBeCalled();
      });
    });

    test('is disabled', () => {
      const component = render(<EuiTab disabled>Click Me</EuiTab>);

      expect(component).toMatchSnapshot();
    });
  });
});
