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

    test('readModeProps', () => {
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

    test('sizes', () => {
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

    test('editModeProps.inputProps', () => {
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

    test('editModeProps.formRowProps', () => {
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

    test('editModeProps.saveButtonProps', () => {
      const { container, getByLabelText } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          editModeProps={{
            saveButtonProps: {
              'aria-label': "Yes! Let's save.",
              color: 'primary',
            },
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(getByLabelText("Yes! Let's save.")).toBeTruthy();
    });

    test('editModeProps.cancelButtonProps', () => {
      const { container, getByLabelText } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          editModeProps={{
            cancelButtonProps: {
              'aria-label': 'Uh no. Do not save.',
              disabled: true,
            },
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(getByLabelText('Uh no. Do not save.')).toBeDisabled();
    });

    test('isLoading', () => {
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

    test('isInvalid', () => {
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
    });
  });

  describe('Toggling between readMode and editMode', () => {
    const onClick = jest.fn();
    const onSave = jest.fn();
    beforeEach(() => jest.resetAllMocks());

    it('toggles to editMode when the readModeButton is clicked', () => {
      const { getByTestSubject, queryByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          readModeProps={{ onClick }}
        />
      );

      fireEvent.click(getByTestSubject('euiInlineReadModeButton'));
      expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();
      expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('saves text and returns to readMode', () => {
      const { getByTestSubject, getByText } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          onSave={onSave}
          editModeProps={{ saveButtonProps: { onClick } }} // Consumers might call this over onSave for, e.g. tracking invalid vs valid saves
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
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('cancels text and returns to readMode', () => {
      const { getByTestSubject, getByText } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          onSave={onSave}
          editModeProps={{ cancelButtonProps: { onClick } }}
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
      expect(onClick).toHaveBeenCalledTimes(1);
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

    describe('keyboard events', () => {
      test('hitting enter saves saves text and returns to readMode', () => {
        const { getByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            onSave={onSave}
            startWithEditOpen={true}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        fireEvent.keyDown(getByTestSubject('euiInlineEditModeInput'), {
          key: 'Enter',
        });

        expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
        expect(getByText('New message!')).toBeTruthy();
        expect(onSave).toHaveBeenCalledWith('New message!');
      });

      test('hitting escape cancels text and returns to readMode', () => {
        const { getByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            onSave={onSave}
            startWithEditOpen={true}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        fireEvent.keyDown(getByTestSubject('euiInlineEditModeInput'), {
          key: 'Escape',
        });

        expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
        expect(getByText('Hello World!')).toBeTruthy();
        expect(onSave).not.toHaveBeenCalled();
      });

      test('hitting unmapped keys like shift and delete do not change the state of the component', () => {
        const { getByTestSubject, queryByTestSubject } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            onSave={onSave}
            startWithEditOpen={true}
          />
        );

        fireEvent.keyDown(getByTestSubject('euiInlineEditModeInput'), {
          key: 'Shift',
        });
        fireEvent.keyDown(getByTestSubject('euiInlineEditModeInput'), {
          key: 'Delete',
        });

        expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
        expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();
        expect(onSave).not.toHaveBeenCalled();
      });

      test('calls a custom keyDown function passed in with editModeProps overrides the default event', () => {
        const onKeyDown = jest.fn();

        const { getByTestSubject } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            onSave={onSave}
            startWithEditOpen={true}
            editModeProps={{ inputProps: { onKeyDown: onKeyDown } }}
          />
        );

        fireEvent.keyDown(getByTestSubject('euiInlineEditModeInput'), {
          key: 'Enter',
        });

        // If a keyDown event is mapped to Enter/Escape, it should override the default save/cancel event
        expect(onKeyDown).toHaveBeenCalled();
        expect(onSave).not.toHaveBeenCalled();
      });
    });
  });
});
