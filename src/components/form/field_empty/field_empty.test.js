import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldEmpty } from './field_empty';

describe('EuiFieldEmpty', () => {
  test('is rendered with text children', () => {
    const component = render(
      <EuiFieldEmpty
        className="some set of classes"
        {...requiredProps}
      >
        foo
      </EuiFieldEmpty>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('is rendered with node children', () => {
    const component = render(
      <EuiFieldEmpty
        className="some set of classes"
        {...requiredProps}
      >
        <div>
          <span>foo</span>
        </div>
      </EuiFieldEmpty>
    );

    expect(component)
      .toMatchSnapshot();
  });
});

