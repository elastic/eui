import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import sinon from 'sinon';

import { EuiFormRow } from './form_row';

jest.mock(`./make_id`, () => () => `generated-id`);
jest.mock('../form_help_text', () => ({ EuiFormHelpText: 'eui_form_help_text' }));
jest.mock('../form_error_text', () => ({ EuiFormErrorText: 'eui_form_error_text' }));
jest.mock('../form_label', () => ({ EuiFormLabel: 'eui_form_label' }));

describe('EuiFormRow', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormRow {...requiredProps}>
        <input />
      </EuiFormRow>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const props = {
      label: `Label`,
      helpText: `Help text`,
      error: [
        `Error one`,
        `Error two`
      ]
    };

    const tree = shallow(
      <EuiFormRow {...requiredProps} {...props}>
        <input />
      </EuiFormRow>
    );

    expect(tree.find(`eui_form_label`).prop(`htmlFor`)).toEqual(`generated-id`);
    expect(tree.find(`eui_form_help_text`).prop(`id`)).toEqual(`generated-id-help`);
    expect(tree.find(`eui_form_error_text`).at(0).prop(`id`)).toEqual(`generated-id-error-0`);
    expect(tree.find(`eui_form_error_text`).at(1).prop(`id`)).toEqual(`generated-id-error-1`);

    expect(tree.find(`input`).prop(`id`)).toEqual(`generated-id`);
    expect(tree.find(`input`).prop(`aria-describedby`))
      .toEqual(`generated-id-help generated-id-error-0 generated-id-error-1`);
  });

  describe('props', () => {
    test('label is rendered', () => {
      console.error = jest.fn();
      const component = render(
        <EuiFormRow label="label">
          <input/>
        </EuiFormRow>
      );

      expect(component)
        .toMatchSnapshot();
      // These errors are generated and it'd be nice if we did not see them
      // but since we can't avoid it (for now at least), let's just ensure
      // they are the only ones logged
      expect(console.error.mock.calls.length).toBe(2);
      expect(console.error.mock.calls[0][0].indexOf('React does not recognize the `isFocused` prop on a DOM element')).toBeGreaterThan(-1);
      expect(console.error.mock.calls[1][0].indexOf('React does not recognize the `isInvalid` prop on a DOM element')).toBeGreaterThan(-1);
    });

    describe('props', () => {
      test('id is rendered', () => {
        const component = render(
          <EuiFormRow id="id">
            <input/>
          </EuiFormRow>
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('isInvalid is rendered', () => {
        const component = render(
          <EuiFormRow isInvalid>
            <input/>
          </EuiFormRow>
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('error as string is rendered', () => {
        const component = render(
          <EuiFormRow error="Error">
            <input/>
          </EuiFormRow>
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('error as array is rendered', () => {
        const component = render(
          <EuiFormRow error={['Error', 'Error2']}>
            <input/>
          </EuiFormRow>
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('helpText is rendered', () => {
        const component = render(
          <EuiFormRow helpText={<span>This is help text.</span>}>
            <input/>
          </EuiFormRow>
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('hasEmptyLabelSpace is rendered', () => {
        const component = render(
          <EuiFormRow hasEmptyLabelSpace>
            <input/>
          </EuiFormRow>
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('fullWidth is rendered', () => {
        const component = render(
          <EuiFormRow fullWidth>
            <input/>
          </EuiFormRow>
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('onFocus behavior', () => {
      test('onFocus is called in child', () => {
        const focusMock = sinon.stub();

        const component = mount(
          <EuiFormRow label={<span>Label</span>}>
            <input onFocus={focusMock}/>
          </EuiFormRow>
        );

        component.find('input').simulate('focus');

        sinon.assert.calledOnce(focusMock);

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the EuiFormLabel
        expect(component)
          .toMatchSnapshot();
      });

      test('onFocus works in parent even if not in child', () => {
        const component = mount(
          <EuiFormRow label={<span>Label</span>}>
            <input/>
          </EuiFormRow>
        );

        component.find('input').simulate('focus');

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the EuiFormLabel
        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('onBlur behavior', () => {
      test('onBlur is called in child', () => {
        const blurMock = sinon.stub();

        const component = mount(
          <EuiFormRow label={<span>Label</span>}>
            <input onBlur={blurMock}/>
          </EuiFormRow>
        );

        component.find('input').simulate('blur');

        sinon.assert.calledOnce(blurMock);

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the EuiFormLabel
        expect(component)
          .toMatchSnapshot();
      });

      test('onBlur works in parent even if not in child', () => {
        const component = mount(
          <EuiFormRow label={<span>Label</span>}>
            <input/>
          </EuiFormRow>
        );

        component.find('input').simulate('blur');

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the EuiFormLabel
        expect(component)
          .toMatchSnapshot();
      });
    });
  });
});
