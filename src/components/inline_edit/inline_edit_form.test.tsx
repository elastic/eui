/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';
import { fireEvent } from '@testing-library/dom';

import {
  EuiInlineEditForm,
  EuiInlineEditFormProps,
  SMALL_SIZE_FORM,
  MEDIUM_SIZE_FORM,
} from './inline_edit_form';

describe('EuiInlineEditForm', () => {
  const commonInlineEditFormProps: EuiInlineEditFormProps = {
    ...requiredProps,
    defaultValue: 'Hello World!',
    inputAriaLabel: 'Edit inline',
    sizes: MEDIUM_SIZE_FORM,
    isLoading: false, // TODO: Remove once EUI loading components are fixed
    children: (readModeValue) => readModeValue,
  };

  describe('Read Mode', () => {
    it('renders', () => {
      const { container } = render(
        <EuiInlineEditForm {...commonInlineEditFormProps} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders readModeProps onto the button', () => {
      const { container, getByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          readModeProps={{
            color: 'primary',
            iconSide: 'left',
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
    });

    it('renders small size', () => {
      const { container } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          sizes={SMALL_SIZE_FORM}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Edit Mode', () => {
    it('renders', () => {
      const { container } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders editModeProps.inputProps', () => {
      const { container, getByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          editModeProps={{
            inputProps: {
              prepend: 'Prepend Example',
              'data-test-subj': 'customInput',
            },
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(getByTestSubject('customInput')).toBeTruthy();
    });

    it('renders editModeProps.formRowProps', () => {
      const { container, getByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          editModeProps={{
            formRowProps: {
              error: ['This is an error'],
              'data-test-subj': 'customErrorText',
            },
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(getByTestSubject('customErrorText')).toBeTruthy();
    });

    it('renders save button and cancel button aria-labels', () => {
      const { container, getByLabelText } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          saveButtonAriaLabel="Yes! Let's save."
          cancelButtonAriaLabel="Uh no. Do not save."
        />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(getByLabelText("Yes! Let's save.")).toBeTruthy();
      expect(getByLabelText('Uh no. Do not save.')).toBeTruthy();
    });

    it('renders EuiSkeletonRectangles in place of editMode buttons when loading', () => {
      const { container, getByTestSubject, queryByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          isLoading={true}
        />
      );

      expect(container.firstChild).toMatchSnapshot();

      expect(getByTestSubject('euiInlineEditModeSaveLoading')).toBeTruthy();
      expect(getByTestSubject('euiInlineEditModeCancelLoading')).toBeTruthy();

      expect(queryByTestSubject('euiInlineEditModeSaveButton')).toBeFalsy();
      expect(queryByTestSubject('euiInlineEditModeCancelButton')).toBeFalsy();
    });

    it('disables the save button when input is invalid ', () => {
      const { container, getByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          isInvalid={true}
        />
      );

      expect(container.firstChild).toMatchSnapshot();

      expect(
        getByTestSubject('euiInlineEditModeInput').hasAttribute('aria-invalid')
      ).toBeTruthy();

      expect(getByTestSubject('euiInlineEditModeSaveButton')).toBeDisabled();
      expect(getByTestSubject('euiInlineEditModeCancelButton')).toBeTruthy();
    });

    it('returns the latest value within EuiFieldText upon saving', () => {
      const onSaveFunction = jest.fn();

      const { getByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          onSave={onSaveFunction}
        />
      );

      fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
        target: { value: 'New message!' },
      });
      fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));

      expect(onSaveFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Toggling between readMode and editMode', () => {
    it('clicking on the readModeButton takes us to editMode', () => {
      const { getByTestSubject, queryByTestSubject } = render(
        <EuiInlineEditForm {...commonInlineEditFormProps} />
      );

      fireEvent.click(getByTestSubject('euiInlineReadModeButton'));
      expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();
      expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
    });

    it('saves text and returns to readMode', () => {
      const { getByTestSubject, getByText } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
        />
      );

      fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
        target: { value: 'New message!' },
      });
      expect(
        getByTestSubject('euiInlineEditModeInput').getAttribute('value')
      ).toEqual('New message!');
      fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));

      expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
      expect(getByText('New message!')).toBeTruthy();
    });

    it('cancels text and returns to readMode', () => {
      const { getByTestSubject, getByText } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
        />
      );

      fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
        target: { value: 'New message!' },
      });
      expect(
        getByTestSubject('euiInlineEditModeInput').getAttribute('value')
      ).toEqual('New message!');
      fireEvent.click(getByTestSubject('euiInlineEditModeCancelButton'));

      expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
      expect(getByText('Hello World!')).toBeTruthy();
    });

    describe('onConfirm behavior on save', () => {
      it('returns to readMode with updated text when onConfirm returns true', () => {
        const { getByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            onConfirm={() => true}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));

        expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
        expect(getByText('New message!')).toBeTruthy();
      });

      it('stays in editMode when onConfirm returns false', () => {
        const { getByTestSubject, queryByTestSubject } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            onConfirm={() => false}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));

        expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
        expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();
      });

      it('sends the editMode text to the onConfirm callback', () => {
        const { getByText, getByTestSubject } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            onConfirm={(editModeValue) => {
              return editModeValue === '' ? false : true;
            }}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: '' },
        });
        fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));

        expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'hey there' },
        });
        fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));

        expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
        expect(getByText('hey there')).toBeTruthy();
      });
    });
  });
});
