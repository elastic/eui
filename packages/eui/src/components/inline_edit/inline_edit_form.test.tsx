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

  describe('read mode', () => {
    it('renders', () => {
      const { container } = render(
        <EuiInlineEditForm {...commonInlineEditFormProps} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isReadOnly', () => {
      const { container, getByTestSubject } = render(
        <EuiInlineEditForm
          isReadOnly={true}
          startWithEditOpen={true}
          {...commonInlineEditFormProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();

      expect(getByTestSubject('euiInlineReadModeButton')).toBeDisabled();
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

    test('placeholder', () => {
      const { container, getByText, getByTitle } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          defaultValue=""
          placeholder="This is a placeholder."
        />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(getByText('This is a placeholder.')).toBeTruthy();
      expect(getByTitle('This is a placeholder.')).toBeTruthy();
    });

    it('renders the read mode value in a title tooltip', () => {
      const { getByTitle } = render(
        <EuiInlineEditForm {...commonInlineEditFormProps} />
      );

      expect(getByTitle('Hello World!')).toBeTruthy();
    });
  });

  describe('edit mode', () => {
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
      const onChange = jest.fn();

      const { container, getByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          editModeProps={{
            inputProps: {
              prepend: 'Prepend Example',
              'data-test-subj': 'customInput',
              onChange,
            },
          }}
        />
      );
      expect(container.firstChild).toMatchSnapshot();

      const mockChangeEvent = { target: { value: 'changed' } };
      fireEvent.change(getByTestSubject('customInput'), mockChangeEvent);
      expect(onChange).toHaveBeenCalled();

      // Consumer `onChange` callbacks should not override EUI's
      expect(
        (getByTestSubject('customInput') as HTMLInputElement).value
      ).toEqual('changed');
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

    test('placeholder', () => {
      const { container, getByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          startWithEditOpen={true}
          defaultValue=""
          placeholder="This is a placeholder."
        />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(
        getByTestSubject('euiInlineEditModeInput').getAttribute('placeholder')
      ).toBeTruthy();
      expect(
        getByTestSubject('euiInlineEditModeInput').getAttribute('value')
      ).toBeFalsy();
    });
  });

  describe('toggling between read mode and edit mode', () => {
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: Function) => cb());

    const onClick = jest.fn();
    const onSave = jest.fn();
    beforeEach(() => {
      onClick.mockReset();
      onSave.mockReset();
    });

    it('activates edit mode when the read mode button is clicked', () => {
      const { getByTestSubject, queryByTestSubject } = render(
        <EuiInlineEditForm
          {...commonInlineEditFormProps}
          readModeProps={{ onClick }}
        />
      );

      fireEvent.click(getByTestSubject('euiInlineReadModeButton'));

      expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
      waitFor(() => {
        expect(document.activeElement).toEqual(
          getByTestSubject('euiInlineEditModeInput')
        );
      });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('saves text and returns to read mode', () => {
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

      waitFor(() => {
        expect(document.activeElement).toEqual(
          getByTestSubject('euiInlineReadModeButton')
        );
      });
      expect(getByText('New message!')).toBeTruthy();
      expect(onSave).toHaveBeenCalledWith('New message!');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('cancels text and returns to read mode', () => {
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

      waitFor(() => {
        expect(document.activeElement).toEqual(
          getByTestSubject('euiInlineReadModeButton')
        );
      });
      expect(getByText('Hello World!')).toBeTruthy();
      expect(onSave).not.toHaveBeenCalled();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    describe('onSave validation', () => {
      it('returns to read mode with updated text when onSave returns true', () => {
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

      it('stays in edit mode when onSave returns false', () => {
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
        let promise: Promise<boolean> | null = null;
        let promiseResolve: (value: boolean) => void;

        onSave.mockImplementation(() => {
          promise = new Promise((resolve) => {
            promiseResolve = resolve;
          });
          return promise;
        });

        const { getByTestSubject, queryByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            onSave={onSave}
          />
        );

        // Should still be in edit mode when onSave promise returns false
        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: '' },
        });

        fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));
        expect(onSave).toHaveBeenCalledTimes(1);

        await act(() => {
          promiseResolve(false);
          return expect(promise).resolves.toBe(false);
        });

        expect(
          queryByTestSubject('euiInlineReadModeButton')
        ).not.toBeInTheDocument();
        expect(getByTestSubject('euiInlineEditModeInput')).toBeInTheDocument();

        // Should successfully save into read mode when onSave promise returns true
        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'hey there' },
        });

        fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));
        expect(onSave).toHaveBeenCalledTimes(2);

        await act(async () => {
          promiseResolve(true);
          return expect(promise).resolves.toBe(true);
        });

        expect(getByTestSubject('euiInlineReadModeButton')).toBeInTheDocument();
        expect(getByText('hey there')).toBeTruthy();
      });
    });

    describe('keyboard events', () => {
      test('pressing the Enter key saves text and returns to read mode', () => {
        const { getByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        fireEvent.keyDown(getByTestSubject('euiInlineEditModeInput'), {
          key: 'Enter',
        });

        waitFor(() => {
          expect(document.activeElement).toEqual(
            getByTestSubject('euiInlineReadModeButton')
          );
        });
        expect(getByText('New message!')).toBeTruthy();
      });

      test('pressing the Escape key cancels text changes and returns to read mode', () => {
        const { getByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        fireEvent.keyDown(getByTestSubject('euiInlineEditModeInput'), {
          key: 'Escape',
        });

        waitFor(() => {
          expect(document.activeElement).toEqual(
            getByTestSubject('euiInlineReadModeButton')
          );
        });
        expect(getByText('Hello World!')).toBeTruthy();
      });

      it('calls passed `inputModeProps.onKeyDown` callbacks', () => {
        const onKeyDown = jest.fn();

        const { getByTestSubject, getByText } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            editModeProps={{ inputProps: { onKeyDown } }}
          />
        );

        fireEvent.change(getByTestSubject('euiInlineEditModeInput'), {
          target: { value: 'New message!' },
        });
        fireEvent.keyDown(getByTestSubject('euiInlineEditModeInput'), {
          key: 'Enter',
        });

        // Both EUI and consumer `onKeyDown` events should have run
        expect(onKeyDown).toHaveBeenCalled();
        expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
        expect(getByText('New message!')).toBeTruthy();
      });

      it('allows overriding `placeholder` with `inputModeProps.placeholder`', () => {
        const { getByTestSubject } = render(
          <EuiInlineEditForm
            {...commonInlineEditFormProps}
            startWithEditOpen={true}
            defaultValue=""
            placeholder="This is A!"
            editModeProps={{
              inputProps: {
                placeholder: 'The real placeholder!',
              },
            }}
          />
        );

        expect(
          getByTestSubject('euiInlineEditModeInput').getAttribute('placeholder')
        ).toEqual('The real placeholder!');
      });
    });
  });

  describe('inline edit as a controlled component', () => {
    const onSave = jest.fn();
    const onChange = jest.fn();
    const onCancel = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    const controlledInlineEditFormProps: EuiInlineEditFormProps = {
      ...requiredProps,
      value: 'Hello World!',
      onChange: onChange,
      onCancel: onCancel,
      inputAriaLabel: 'Edit inline',
      sizes: MEDIUM_SIZE_FORM,
      children: (readModeValue) => readModeValue,
    };

    it('renders the passed value in read mode', () => {
      const { getByTestSubject, getByText } = render(
        <EuiInlineEditForm {...controlledInlineEditFormProps} />
      );

      expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
      expect(getByText('Hello World!')).toBeTruthy();
    });

    it('renders the passed value in edit mode', () => {
      const { getByTestSubject } = render(
        <EuiInlineEditForm
          {...controlledInlineEditFormProps}
          startWithEditOpen={true}
        />
      );

      expect(getByTestSubject('euiInlineEditModeInput')).toHaveValue(
        'Hello World!'
      );
    });

    it('calls controlled onChange when edit mode value changes', () => {
      const { getByTestSubject } = render(
        <EuiInlineEditForm
          {...controlledInlineEditFormProps}
          startWithEditOpen={true}
        />
      );

      const mockChangeEvent = { target: { value: 'changed' } };
      fireEvent.change(
        getByTestSubject('euiInlineEditModeInput'),
        mockChangeEvent
      );
      waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(mockChangeEvent);
      });
    });

    it('calls controlled onCancel when changes are cancelled', () => {
      const { rerender, getByTestSubject } = render(
        <EuiInlineEditForm
          {...controlledInlineEditFormProps}
          startWithEditOpen={true}
          onSave={onSave}
        />
      );
      // Update controlled `value`
      rerender(
        <EuiInlineEditForm
          {...controlledInlineEditFormProps}
          startWithEditOpen={true}
          onSave={onSave}
          value="Updated value"
        />
      );
      fireEvent.click(getByTestSubject('euiInlineEditModeCancelButton'));
      expect(onCancel).toHaveBeenCalledWith('Hello World!');
      expect(onCancel).not.toHaveBeenCalledWith('Updated value');
      expect(onSave).not.toHaveBeenCalled();
    });

    it('calls onSave with the correct value if the passed value changes', () => {
      const { getByTestSubject, rerender } = render(
        <EuiInlineEditForm
          {...controlledInlineEditFormProps}
          startWithEditOpen={true}
          onSave={onSave}
        />
      );

      waitFor(() => {
        rerender(
          <EuiInlineEditForm
            {...controlledInlineEditFormProps}
            value="This is a new value"
            startWithEditOpen={true}
            onSave={onSave}
          />
        );

        fireEvent.click(getByTestSubject('euiInlineEditModeSaveButton'));
        expect(onSave).toHaveBeenCalledWith('This is a new value');
        expect(onSave).not.toHaveBeenCalledWith('Hello World!');
      });
    });
  });
});
