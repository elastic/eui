import React from 'react';
import { shallow, mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFormRow } from '../form_row';
import { EuiDescriptiveFormRow } from './descriptive_form_row';

jest.mock(`../form_row/make_id`, () => () => `generated-id`);

describe('EuiDescriptiveFormRow', () => {
  const props = {
    title: 'Title',
  };

  test('is rendered', () => {
    const component = shallow(
      <EuiDescriptiveFormRow {...requiredProps} {...props}>
        <EuiFormRow>
          <input />
        </EuiFormRow>
      </EuiDescriptiveFormRow>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const descriptiveFormRowProps = {
      id: 'test-id',
      text: 'Test text',
    };

    const formRowProps = {
      label: `Label`,
      helpText: `Help text`,
      isInvalid: true,
      error: [
        `Error one`,
        `Error two`
      ],
      describedByIds: ['test-id-legend-text'],
    };

    const tree = mount(
      <EuiDescriptiveFormRow {...requiredProps} {...props} {...descriptiveFormRowProps}>
        <EuiFormRow {...formRowProps}>
          <input />
        </EuiFormRow>
      </EuiDescriptiveFormRow>
    );

    expect(tree)
      .toMatchSnapshot();

    // Descriptive form row has group role and is labelled by its title and text.
    expect(tree.find(`EuiFlexItem`).at(0).prop(`id`)).toEqual(`test-id-legend`);
    expect(tree.find(`.euiDescriptiveFormRow`).prop(`role`)).toEqual(`group`);
    expect(tree.find(`.euiDescriptiveFormRow`).prop(`aria-labelledby`)).toEqual(`test-id-legend`);

    // Title and text have own IDs.
    expect(tree.find(`.euiDescriptiveFormRow__title`).prop(`id`)).toEqual(`test-id-legend-title`);
    expect(tree.find(`.euiDescriptiveFormRow__text`).prop(`id`)).toEqual(`test-id-legend-text`);

    // Input is labeled by the label.
    expect(tree.find(`input`).prop(`id`)).toEqual(`generated-id`);

    // Input is described by legend text, help text and error text.
    expect(tree.find(`EuiFormHelpText`).prop(`id`)).toEqual(`generated-id-help`);
    expect(tree.find(`EuiFormErrorText`).at(0).prop(`id`)).toEqual(`generated-id-error-0`);
    expect(tree.find(`EuiFormErrorText`).at(1).prop(`id`)).toEqual(`generated-id-error-1`);
    expect(tree.find(`input`).prop(`aria-describedby`))
      .toEqual(`test-id-legend-text generated-id-help generated-id-error-0 generated-id-error-1`);
  });

  describe('props', () => {
    test('title and text is rendered', () => {
      const descriptiveFormRowProps = {
        text: 'Test text',
      };

      const component = shallow(
        <EuiDescriptiveFormRow {...requiredProps} {...props} {...descriptiveFormRowProps}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('id is rendered', () => {
      const descriptiveFormRowProps = {
        id: 'test-id',
      };

      const component = shallow(
        <EuiDescriptiveFormRow {...requiredProps} {...props} {...descriptiveFormRowProps}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const descriptiveFormRowProps = {
        fullWidth: true,
      };

      const component = shallow(
        <EuiDescriptiveFormRow {...requiredProps} {...props} {...descriptiveFormRowProps}>
          <EuiFormRow fullWidth>
            <input />
          </EuiFormRow>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('gutterSize is rendered', () => {
      const descriptiveFormRowProps = {
        gutterSize: 's',
      };

      const component = shallow(
        <EuiDescriptiveFormRow {...requiredProps} {...props} {...descriptiveFormRowProps}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescriptiveFormRow>
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
