/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiFormControlButton } from './form_control_button';

const defaultProps = {
  value: 'Button value',
  'data-test-subj': 'euiFormControlButton',
};

describe('EuiButtonEmpty', () => {
  shouldRenderCustomStyles(<EuiFormControlButton {...defaultProps} />, {
    childProps: ['contentProps', 'textProps'],
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiFormControlButton {...defaultProps} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('placeholder', () => {
      it('is rendered', () => {
        const placeholder = 'Placeholder text';

        const { getByTestSubject } = render(
          <EuiFormControlButton
            data-test-subj={defaultProps['data-test-subj']}
            placeholder={placeholder}
          />
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj'])
        ).toHaveTextContent(placeholder);
      });

      it('renders when only `children` is passed', () => {
        const placeholder = 'Placeholder text';
        const children = 'Button content';

        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps} placeholder={placeholder}>
            {children}
          </EuiFormControlButton>
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj'])
        ).toHaveTextContent(`${defaultProps.value} ${children}`);
      });

      it('does not render `placeholder` when `value` is passed', () => {
        const placeholder = 'Placeholder text';

        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps} placeholder={placeholder} />
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj'])
        ).toHaveTextContent(defaultProps.value);
      });
    });

    describe('value', () => {
      it('is rendered', () => {
        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps} />
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj'])
        ).toHaveTextContent(defaultProps.value);
      });

      it('renders `value` and ` children', () => {
        const children = 'Button content';

        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps}>
            {children}
          </EuiFormControlButton>
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj'])
        ).toHaveTextContent(`${defaultProps.value} ${children}`);
      });
    });

    describe('compressed', () => {
      it('is rendered', () => {
        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps} compressed />
        );

        const classes = Object.values(
          getByTestSubject('euiFormControlButton').classList
        );

        expect(classes.some((clx) => clx.includes('compressed'))).toBe(true);
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps} isDisabled />
        );

        expect(getByTestSubject('euiFormControlButton')).toBeDisabled();
      });
    });

    describe('isInvalid', () => {
      it('is rendered', () => {
        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps} isInvalid />
        );

        const classes = Object.values(
          getByTestSubject('euiFormControlButton').classList
        );

        expect(classes.some((clx) => clx.includes('isInvalid'))).toBe(true);
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps} iconType="user" />
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj']).firstChild
            ?.firstChild
        ).toHaveAttribute('data-euiicon-type', 'user');
      });
    });

    describe('iconSide', () => {
      it('is rendered', () => {
        const { getByTestSubject } = render(
          <EuiFormControlButton
            {...defaultProps}
            iconType="user"
            iconSide="right"
          />
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj']).firstChild?.lastChild
        ).toHaveAttribute('data-euiicon-type', 'user');
      });
    });

    describe('onClick', () => {
      it('fires `onClick` on button click', () => {
        const handler = jest.fn();
        const { container } = render(
          <EuiFormControlButton onClick={handler} />
        );
        fireEvent.click(container.querySelector('button')!);
        expect(handler).toHaveBeenCalledTimes(1);
      });
    });

    describe('contentProps', () => {
      it('applies and merges passed `contentProps` correctly', () => {
        const { getByTestSubject } = render(
          <EuiFormControlButton
            {...defaultProps}
            contentProps={requiredProps}
          />
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj']).firstChild
        ).toHaveClass('euiButtonEmpty__content');
        expect(
          getByTestSubject(defaultProps['data-test-subj']).firstChild
        ).toHaveClass('testClass1');
        expect(
          getByTestSubject(defaultProps['data-test-subj']).firstChild
        ).toHaveAttribute('data-test-subj', requiredProps['data-test-subj']);
      });
    });

    describe('textProps', () => {
      it('applies and merges passed `textProps` correctly', () => {
        const { getByTestSubject } = render(
          <EuiFormControlButton {...defaultProps} textProps={requiredProps} />
        );

        expect(
          getByTestSubject(requiredProps['data-test-subj'])
        ).toBeInTheDocument();
        expect(
          getByTestSubject(requiredProps['data-test-subj'])
        ).toHaveTextContent(defaultProps.value);
        expect(getByTestSubject(requiredProps['data-test-subj'])).toHaveClass(
          'testClass1'
        );
      });
    });
  });
});
