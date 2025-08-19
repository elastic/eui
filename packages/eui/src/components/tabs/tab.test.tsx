/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiTab } from './tab';

describe('EuiTab', () => {
  shouldRenderCustomStyles(<EuiTab onClick={() => {}}>children</EuiTab>);

  describe('props', () => {
    describe('onClick', () => {
      test('renders button', () => {
        const { container } = render(
          <EuiTab onClick={() => {}} {...requiredProps}>
            children
          </EuiTab>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      test('is called when the button is clicked', () => {
        const onClickHandler = jest.fn();
        const { getByText } = render(
          <EuiTab onClick={onClickHandler}>children</EuiTab>
        );
        fireEvent.click(getByText('children'));
        expect(onClickHandler).toHaveBeenCalled();
      });
    });

    test('href renders anchor', () => {
      const { container } = render(
        <EuiTab href="/baz/bing" {...requiredProps}>
          children
        </EuiTab>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled is rendered', () => {
      const { container } = render(<EuiTab disabled>Click Me</EuiTab>);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isSelected is rendered', () => {
      const { container } = render(
        <EuiTab onClick={() => {}} isSelected>
          children
        </EuiTab>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled and selected', () => {
      const { container } = render(
        <EuiTab disabled isSelected>
          Click Me
        </EuiTab>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('prepend is rendered', () => {
      const { container } = render(
        <EuiTab onClick={() => {}} prepend="Prepend">
          children
        </EuiTab>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('append is rendered', () => {
      const { container } = render(
        <EuiTab onClick={() => {}} append="Append">
          children
        </EuiTab>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
