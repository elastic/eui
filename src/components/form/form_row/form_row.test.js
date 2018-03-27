import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { requiredProps } from '../../../test';
import sinon from 'sinon';

import { EuiFormRow } from './form_row';

jest.mock(`./make_id`, () => () => `generated-id`);

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
      isInvalid: true,
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

    // Input is labeled by the label.
    expect(tree.find(`input`).prop(`id`)).toEqual(`generated-id`);
    expect(tree.find(`EuiFormLabel`).prop(`htmlFor`)).toEqual(`generated-id`);

    // Input is described by help and error text.
    expect(tree.find(`EuiFormHelpText`).prop(`id`)).toEqual(`generated-id-help`);
    expect(tree.find(`EuiFormErrorText`).at(0).prop(`id`)).toEqual(`generated-id-error-0`);
    expect(tree.find(`EuiFormErrorText`).at(1).prop(`id`)).toEqual(`generated-id-error-1`);
    expect(tree.find(`input`).prop(`aria-describedby`))
      .toEqual(`generated-id-help generated-id-error-0 generated-id-error-1`);
  });

  describe('props', () => {
    test('label is rendered', () => {
      const component = shallow(
        <EuiFormRow label="label">
          <input/>
        </EuiFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

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
        <EuiFormRow isInvalid label="label">
          <input/>
        </EuiFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('error as string is rendered', () => {
      const component = render(
        <EuiFormRow error="Error" isInvalid={true}>
          <input/>
        </EuiFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('error as array is rendered', () => {
      const component = render(
        <EuiFormRow error={['Error', 'Error2']} isInvalid={true}>
          <input/>
        </EuiFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('error is not rendered if isInvalid is false', () => {
      const component = render(
        <EuiFormRow error={['Error']} isInvalid={false}>
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

  describe('behavior', () => {
    describe('onFocus', () => {
      test('is called in child', () => {
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

      test('works in parent even if not in child', () => {
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

    describe('onBlur', () => {
      test('is called in child', () => {
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

      test('works in parent even if not in child', () => {
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
