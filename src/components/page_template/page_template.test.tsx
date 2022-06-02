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
import { shouldRenderCustomStyles } from '../../test/internal';
import { PADDING_SIZES } from '../../global_styling';

import { EuiPageTemplate } from './page_template';

describe('_EuiPageSidebar', () => {
  shouldRenderCustomStyles(<EuiPageTemplate />);

  test('is rendered', () => {
    const component = render(<EuiPageTemplate {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('_EuiPageOuterProps is rendered', () => {
    const component = render(
      <EuiPageTemplate grow={false} direction="column" responsive={[]} />
    );

    expect(component).toMatchSnapshot();
  });

  test('_EuiPageInnerProps is rendered', () => {
    const component = render(
      <EuiPageTemplate component="main" contentBorder={true} panelled={false} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(<EuiPageTemplate restrictWidth={true} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(<EuiPageTemplate restrictWidth={1024} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const component = render(<EuiPageTemplate restrictWidth="24rem" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('bottomBorder', () => {
    test('is rendered as true', () => {
      const component = render(<EuiPageTemplate bottomBorder={true} />);

      expect(component).toMatchSnapshot();
    });

    test('is rendered as extended', () => {
      const component = render(<EuiPageTemplate bottomBorder={'extended'} />);

      expect(component).toMatchSnapshot();
    });
  });

  test('minHeight is rendered', () => {
    const component = render(<EuiPageTemplate minHeight={'40vh'} />);

    expect(component).toMatchSnapshot();
  });

  test('offset is rendered', () => {
    const component = render(<EuiPageTemplate offset={100} />);

    expect(component).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPageTemplate paddingSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
