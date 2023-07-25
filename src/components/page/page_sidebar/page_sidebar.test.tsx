/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { PADDING_SIZES } from '../../../global_styling';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiPageSidebar } from './page_sidebar';

describe('EuiPageSidebar', () => {
  shouldRenderCustomStyles(<EuiPageSidebar />);

  test('is rendered', () => {
    const { container } = render(<EuiPageSidebar {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('minWidth is rendered', () => {
    const { container } = render(<EuiPageSidebar minWidth={400} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('sticky is rendered', () => {
    const { container } = render(<EuiPageSidebar sticky={{ offset: 100 }} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const { container } = render(<EuiPageSidebar paddingSize={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('inline styles', () => {
    it('updates correctly when `sticky` is not set', () => {
      const component = mount(<EuiPageSidebar data-test-subj="sidebar" />);

      expect(
        component.find('[data-test-subj="sidebar"]').last().prop('style')
      ).toEqual({ minInlineSize: 248 });

      component.setProps({ minWidth: 100 });
      component.update();

      expect(
        component.find('[data-test-subj="sidebar"]').last().prop('style')
      ).toEqual({ minInlineSize: 100 });
    });

    it('updates correctly when `sticky` is set', () => {
      const component = mount(
        <EuiPageSidebar sticky data-test-subj="sidebar" />
      );

      expect(
        component.find('[data-test-subj="sidebar"]').last().prop('style')
      ).toEqual({
        insetBlockStart: 0,
        maxBlockSize: 'calc(100vh - 0px)',
        minInlineSize: 248,
      });

      component.setProps({ style: { color: 'red' } });
      component.update();

      expect(
        component.find('[data-test-subj="sidebar"]').last().prop('style')
      ).toEqual({
        color: 'red',
        insetBlockStart: 0,
        maxBlockSize: 'calc(100vh - 0px)',
        minInlineSize: 248,
      });
    });
  });
});
