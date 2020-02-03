import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCodeBlockImpl } from './_code_block';

function snapshotCodeBlock(component) {
  // Get the Portal's sibling and return its html
  const renderedHtml = component.find('Portal + *').html();
  const container = document.createElement('div');
  container.innerHTML = renderedHtml;
  return container.firstChild;
}

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlockImpl', () => {
  describe('inline', () => {
    test('renders an inline code tag', () => {
      const component = mount(
        <EuiCodeBlockImpl inline={true} {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('highlights javascript code, adding "js" class', () => {
      const component = mount(<EuiCodeBlockImpl inline={true} language="js" />);

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('renders with transparent background', () => {
      const component = mount(
        <EuiCodeBlockImpl inline={true} transparentBackground={true} />
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });
  });

  describe('block', () => {
    test('renders a pre block tag', () => {
      const component = mount(
        <EuiCodeBlockImpl inline={false} {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('highlights javascript code, adding "js" class', () => {
      const component = mount(
        <EuiCodeBlockImpl inline={false} language="js" />
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });

    test('renders with transparent background', () => {
      const component = mount(
        <EuiCodeBlockImpl inline={false} transparentBackground={true} />
      );

      expect(snapshotCodeBlock(component)).toMatchSnapshot();
    });
  });
});
