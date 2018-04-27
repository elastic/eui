import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { requiredProps } from '../../../test';
import sinon from 'sinon';

import { EuiDescriptiveFormRow } from './descriptive_form_row';

jest.mock(`../form_row/make_id`, () => () => `generated-id`);

describe('EuiDescriptiveFormRow', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptiveFormRow {...requiredProps}>
        <input />
      </EuiDescriptiveFormRow>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const props = {
      label: `Label`,
      helpTitle: `Help title`,
      helpText: `Help text`,
      isInvalid: true,
      error: [
        `Error one`,
        `Error two`
      ]
    };

    const tree = mount(
      <EuiDescriptiveFormRow {...requiredProps} {...props}>
        <input />
      </EuiDescriptiveFormRow>
    );

    expect(tree)
      .toMatchSnapshot();

    // Input is labeled by the label.
    expect(tree.find(`input`).prop(`id`)).toEqual(`generated-id`);
    tree.find(`EuiFormLabel`).forEach((node) => expect(node.prop(`htmlFor`)).toEqual(`generated-id`));

    // Input is described by help and error text.
    expect(tree.find(`EuiFormHelpText`).prop(`id`)).toEqual(`generated-id-help`);
    expect(tree.find(`EuiFormErrorText`).at(0).prop(`id`)).toEqual(`generated-id-error-0`);
    expect(tree.find(`EuiFormErrorText`).at(1).prop(`id`)).toEqual(`generated-id-error-1`);
    expect(tree.find(`input`).prop(`aria-describedby`))
      .toEqual(`generated-id-help generated-id-error-0 generated-id-error-1`);
  });

  describe('props', () => {
    test('help is rendered', () => {
      const component = shallow(
        <EuiDescriptiveFormRow helpTitle="Help title" helpText="Help text">
          <input/>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('label is rendered', () => {
      const component = shallow(
        <EuiDescriptiveFormRow label="label">
          <input/>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('id is rendered', () => {
      const component = render(
        <EuiDescriptiveFormRow id="id">
          <input/>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(
        <EuiDescriptiveFormRow isInvalid label="label">
          <input/>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('error as string is rendered', () => {
      const component = render(
        <EuiDescriptiveFormRow error="Error" isInvalid={true}>
          <input/>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('error as array is rendered', () => {
      const component = render(
        <EuiDescriptiveFormRow error={['Error', 'Error2']} isInvalid={true}>
          <input/>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('error is not rendered if isInvalid is false', () => {
      const component = render(
        <EuiDescriptiveFormRow error={['Error']} isInvalid={false}>
          <input/>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('hasEmptyLabelSpace is rendered', () => {
      const component = render(
        <EuiDescriptiveFormRow hasEmptyLabelSpace>
          <input/>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(
        <EuiDescriptiveFormRow fullWidth>
          <input/>
        </EuiDescriptiveFormRow>
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
          <EuiDescriptiveFormRow label={<span>Label</span>}>
            <input onFocus={focusMock}/>
          </EuiDescriptiveFormRow>
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
          <EuiDescriptiveFormRow label={<span>Label</span>}>
            <input/>
          </EuiDescriptiveFormRow>
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
          <EuiDescriptiveFormRow label={<span>Label</span>}>
            <input onBlur={blurMock}/>
          </EuiDescriptiveFormRow>
        );

        component.find('input').simulate('blur');

        sinon.assert.calledOnce(blurMock);

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the EuiFormLabels
        expect(component)
          .toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const component = mount(
          <EuiDescriptiveFormRow label={<span>Label</span>}>
            <input/>
          </EuiDescriptiveFormRow>
        );

        component.find('input').simulate('blur');

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the EuiFormLabels
        expect(component)
          .toMatchSnapshot();
      });
    });
  });
});
