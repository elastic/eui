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
import { fireEvent, act, waitFor } from '@testing-library/react';

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
      const { container, queryByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          isLoading={true}
        />
      );

      expect(container.firstChild).toMatchSnapshot();

      expect(container.querySelectorAll('.euiSkeletonRectangle')).toHaveLength(
        2
      );

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
      expect(
        getByTestSubject('euiInlineEditModeCancelButton')
      ).not.toBeDisabled();
    });
  });

  describe('Toggling between readMode and editMode', () => {
    const onSave = jest.fn();
    beforeEach(() => onSave.mockReset());

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
          onSave={onSave}
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
      expect(onSave).toHaveBeenCalledWith('New message!');
    });

    it('cancels text and returns to readMode', () => {
      const { getByTestSubject, getByText } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          onSave={onSave}
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
      expect(onSave).not.toHaveBeenCalled();
    });

    describe('onSave validation', () => {
      it('returns to readMode with updated text when onSave returns true', () => {
        onSave.mockReturnValueOnce(true);

        const { getByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            onSave={onSave}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        act(() => {
          fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));
        });

        expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
        expect(getByText('New message!')).toBeTruthy();
      });

      it('stays in editMode when onSave returns false', () => {
        onSave.mockReturnValueOnce(false);

        const { getByTestSubject, queryByTestSubject } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            onSave={onSave}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        act(() => {
          fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));
        });

        expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
        expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();
      });

      it('handles async promises', async () => {
        onSave.mockImplementation(
          (value) =>
            new Promise((resolve) => {
              setTimeout(resolve, 100);
              return !!value; // returns false if empty string, true if not
            })
        );

        const { getByTestSubject, queryByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            onSave={onSave}
          />
        );

        // Should still be in edit mode after an empty string is submitted
        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: '' },
        });
        await act(async () => {
          fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));
          waitFor(() => setTimeout(() => {}, 100)); // Let the promise finish resolving
        });
        expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
        expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();

        // Should successfully save into read mode
        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'hey there' },
        });
        await act(async () => {
          fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));
        });
        waitFor(() => {
          expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
          expect(getByText('hey there')).toBeTruthy();
        });
      });
    });
  });
});
