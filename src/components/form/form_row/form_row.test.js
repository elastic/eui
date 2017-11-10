import React from 'react';
import { shallow, render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

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

    expect(tree.find(`EuiFormLabel`).prop(`htmlFor`)).toEqual(`generated-id`);
    expect(tree.find(`EuiFormHelpText`).prop(`id`)).toEqual(`generated-id-help`);
    expect(tree.find(`EuiFormErrorText`).at(0).prop(`id`)).toEqual(`generated-id-error-0`);
    expect(tree.find(`EuiFormErrorText`).at(1).prop(`id`)).toEqual(`generated-id-error-1`);

    expect(tree.find(`input`).prop(`id`)).toEqual(`generated-id`);
    expect(tree.find(`input`).prop(`aria-describedby`))
      .toEqual(`generated-id-help generated-id-error-0 generated-id-error-1`);
  });
});
