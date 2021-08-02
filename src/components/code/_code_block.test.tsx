/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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

    test('gracefully falls back to `text` language', () => {
      const component = render(
        <EuiCodeBlockImpl language="nonsense">{code}</EuiCodeBlockImpl>
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

    test('renders a pre block tag with a css class modifier', () => {
      const component = render(
        <EuiCodeBlockImpl inline={false} whiteSpace="pre" {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );
      expect(component).toMatchSnapshot();
    });

    test('renders a virtualized code block', () => {
      const component = render(
        <EuiCodeBlockImpl
          inline={false}
          isVirtualized={true}
          overflowHeight={300}
          {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );
      expect(component).toMatchSnapshot();
    });
  });
});
