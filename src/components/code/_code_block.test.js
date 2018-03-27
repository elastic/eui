import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCodeBlockImpl } from './_code_block';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlockImpl', () => {
  describe('inline', () => {
    test('renders an inline code tag', () => {
      const component = render(
        <EuiCodeBlockImpl inline={true} {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );

      expect(component).toMatchSnapshot();
    });

    test('highlights javascript code, adding "js" class', () => {
      const component = render(
        <EuiCodeBlockImpl inline={true} language="js" />
      );

      expect(component).toMatchSnapshot();
    });

    test('renders with transparent background', () => {
      const component = render(
        <EuiCodeBlockImpl inline={true} transparentBackground={true} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('block', () => {
    test('renders a pre block tag', () => {
      const component = render(
        <EuiCodeBlockImpl inline={false} {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );

      expect(component).toMatchSnapshot();
    });

    test('highlights javascript code, adding "js" class', () => {
      const component = render(
        <EuiCodeBlockImpl inline={false} language="js" />
      );

      expect(component).toMatchSnapshot();
    });

    test('renders with transparent background', () => {
      const component = render(
        <EuiCodeBlockImpl inline={false} transparentBackground={true} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
