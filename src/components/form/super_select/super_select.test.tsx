/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen, waitForEuiPopoverOpen } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';

import { EuiSuperSelect } from './super_select';

const options = [
  { value: '1', inputDisplay: 'Option #1' },
  { value: '2', inputDisplay: 'Option #2' },
];

describe('EuiSuperSelect', () => {
  shouldRenderCustomStyles(<EuiSuperSelect options={options} />, {
    childProps: ['popoverProps'],
  });

  const openDropdown = () => {
    fireEvent.click(screen.getByRole('button'));
    waitForEuiPopoverOpen();
  };

  it('renders', () => {
    const { baseElement } = render(
      <EuiSuperSelect {...requiredProps} options={options} />
    );
    openDropdown();

    expect(baseElement).toMatchSnapshot();
  });

  it('does not render options with nullish values', () => {
    // PropTypes complains about the null, but devs may ignore console errors
    silenceErrors();

    const { queryByTestSubject } = render(
      <EuiSuperSelect
        options={[
          // @ts-expect-error - it's possible consumers won't be using TS
          { value: null, 'data-test-subj': 'not-rendered' },
          { value: '', 'data-test-subj': 'rendered' },
        ]}
      />
    );
    openDropdown();

    expect(queryByTestSubject('not-rendered')).not.toBeInTheDocument();
    expect(queryByTestSubject('rendered')).toBeInTheDocument();

    restoreErrors();
  });

  describe('props', () => {
    test('fullWidth', () => {
      const { container } = render(
        <EuiSuperSelect options={options} fullWidth />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('compressed', () => {
      const { container } = render(
        <EuiSuperSelect options={options} compressed />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('prepend and append', () => {
      const { container } = render(
        <EuiSuperSelect options={options} prepend="prepend" append="append" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('valueOfSelected', () => {
      const { getByRole } = render(
        <EuiSuperSelect options={options} valueOfSelected="2" />
      );

      expect(getByRole('button')).toHaveTextContent('Option #2');
    });

    test('options.dropdownDisplay', () => {
      const { queryByText } = render(
        <EuiSuperSelect
          options={[
            {
              value: '1',
              inputDisplay: 'Input display test',
              dropdownDisplay: 'Dropdown display test',
            },
          ]}
          valueOfSelected="1"
        />
      );
      expect(queryByText('Input display test')).toBeInTheDocument();
      expect(queryByText('Dropdown display test')).not.toBeInTheDocument();

      openDropdown();
      expect(queryByText('Dropdown display test')).toBeInTheDocument();
    });

    test('options.rest', () => {
      const { getByTestSubject } = render(
        <EuiSuperSelect
          options={[
            {
              value: '2',
              inputDisplay: 'Option #2',
              'data-test-subj': 'option2',
              disabled: true,
            },
          ]}
        />
      );
      openDropdown();

      expect(getByTestSubject('option2')).toBeDisabled();
    });

    test('popoverProps', () => {
      render(
        <EuiSuperSelect
          options={options}
          popoverProps={{
            className: 'goes-on-outermost-wrapper',
            panelClassName: 'goes-on-popover-panel',
            repositionOnScroll: true,
          }}
        />
      );
      openDropdown();

      expect(
        document.querySelector('.goes-on-outermost-wrapper')
      ).toBeInTheDocument();
      expect(
        document.querySelector('.goes-on-popover-panel')
      ).toBeInTheDocument();
    });

    test('onChange', () => {
      const onChange = jest.fn();

      const { getByTestSubject } = render(
        <EuiSuperSelect
          options={[{ value: 'value1', 'data-test-subj': 'option1' }]}
          onChange={onChange}
        />
      );
      openDropdown();

      fireEvent.click(getByTestSubject('option1'));
      expect(onChange).toHaveBeenCalledWith('value1');
    });
  });

  // No assertions or rendering on these tests - they're here to check that ts/lint passes or fails
  describe('typing', () => {
    // Silence expected propTypes errors
    beforeAll(() => silenceErrors());
    afterAll(() => restoreErrors());

    it('defaults to string values', () => {
      <EuiSuperSelect
        options={[{ value: 'string' }]}
        valueOfSelected="string"
      />;
    });

    it('allows customizing the value type via TS generic', () => {
      <EuiSuperSelect<number> options={[{ value: 2 }]} valueOfSelected={2} />;
      // @ts-expect-error should error since it expects a number
      <EuiSuperSelect<number>
        options={[{ value: 'should error' }]}
        valueOfSelected="2"
      />;

      <EuiSuperSelect<boolean>
        options={[{ value: true }]}
        valueOfSelected={true}
      />;
      // @ts-expect-error should error since it expects a boolean
      <EuiSuperSelect<number>
        options={[{ value: 'should error' }]}
        valueOfSelected="true"
      />;

      <EuiSuperSelect<string | boolean | number>
        options={[{ value: '' }, { value: false }, { value: 0 }]}
        valueOfSelected={false}
      />;
    });

    it('errors on nullish values', () => {
      // @ts-expect-error - 'null is not assignable to never'
      <EuiSuperSelect options={[{ value: null }]} />;
      // @ts-expect-error - 'value is missing'
      <EuiSuperSelect<boolean> options={[{}]} />;
      // @ts-expect-error - should not allow the generic to be nullable
      <EuiSuperSelect<string | undefined> options={[{ value: undefined }]} />;
      // @ts-expect-error - 'null is not assignable to undefined'
      <EuiSuperSelect options={[]} valueOfSelected={null} />;
    });
  });
});

const originalConsoleError = console.error;
const silenceErrors = () => {
  console.error = () => {};
};
const restoreErrors = () => {
  console.error = originalConsoleError;
};
