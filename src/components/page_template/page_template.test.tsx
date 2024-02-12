/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import { PADDING_SIZES } from '../../global_styling';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiPageTemplate } from './page_template';

describe('EuiPageTemplate', () => {
  shouldRenderCustomStyles(<EuiPageTemplate />, { childProps: ['mainProps'] });

  test('is rendered', () => {
    const { container } = render(<EuiPageTemplate {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('_EuiPageOuterProps is rendered', () => {
    const { container } = render(
      <EuiPageTemplate grow={false} direction="column" responsive={[]} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('_EuiPageInnerProps', () => {
    it('is rendered', () => {
      const { container } = render(
        <EuiPageTemplate
          component="div"
          contentBorder={true}
          panelled={false}
          mainProps={{ id: 'customID', className: 'customClassName' }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders as panelled', () => {
      const { container } = render(
        <EuiPageTemplate component="div" panelled />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const { container } = render(<EuiPageTemplate restrictWidth={true} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const { container } = render(<EuiPageTemplate restrictWidth={1024} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const { container } = render(<EuiPageTemplate restrictWidth="24rem" />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('bottomBorder', () => {
    test('is rendered as true', () => {
      const { container } = render(<EuiPageTemplate bottomBorder={true} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is rendered as extended', () => {
      const { container } = render(
        <EuiPageTemplate bottomBorder={'extended'} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('minHeight is rendered', () => {
    const { container } = render(<EuiPageTemplate minHeight={'40vh'} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('offset is rendered', () => {
    const { container } = render(<EuiPageTemplate offset={100} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const { container } = render(<EuiPageTemplate paddingSize={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('children', () => {
    it('detects sidebars and does not place them in the main EuiPageInner', () => {
      const { container, getByRole } = render(
        <EuiPageTemplate {...requiredProps}>
          <EuiPageTemplate.Sidebar />
          <EuiPageTemplate.Sidebar
            css={css`
              color: red;
            `}
          />
        </EuiPageTemplate>
      );
      expect(container.firstChild).toMatchSnapshot();
      expect(getByRole('main').childElementCount).toEqual(0);
    });

    it('renders all other types within the main EuiPageInner', () => {
      const { container, getByRole } = render(
        <EuiPageTemplate {...requiredProps}>
          <EuiPageTemplate.Header>A</EuiPageTemplate.Header>
          <EuiPageTemplate.Section>B</EuiPageTemplate.Section>
          <section>C</section>
        </EuiPageTemplate>
      );
      expect(container.firstChild).toMatchSnapshot();
      expect(getByRole('main').childElementCount).toEqual(3);
    });
  });
});
