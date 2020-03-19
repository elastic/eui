import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCode } from './code';

function snapshotCodeBlock(component: ReactWrapper) {
  // Get the Portal's sibling and return its html
  const renderedHtml = component.find('Portal + *').html();
  const container = document.createElement('div');
  container.innerHTML = renderedHtml;
  return container.firstChild;
}

const code = `var some = 'code';
console.log(some);`;

describe('EuiCode', () => {
  test('renders a code snippet', () => {
    const component = mount(<EuiCode {...requiredProps}>{code}</EuiCode>);

    expect(snapshotCodeBlock(component)).toMatchSnapshot();
  });
});
