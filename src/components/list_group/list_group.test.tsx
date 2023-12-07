/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiListGroup, GUTTER_SIZES } from './list_group';
import { EuiListGroupItemProps } from './list_group_item';

const someListItems: EuiListGroupItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Custom extra action',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
      'aria-label': 'bell',
    },
  },
  {
    label: 'Button with onClick',
    onClick: (e) => {
      console.log('Visualize clicked', e);
    },
  },
  {
    label: 'Active link',
    isActive: true,
    href: '#',
  },
  {
    label: 'Link with href',
    href: '#',
  },
];

describe('EuiListGroup', () => {
  shouldRenderCustomStyles(<EuiListGroup {...requiredProps} />);

  test('is rendered', () => {
    const { container } = render(<EuiListGroup {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('listItems', () => {
    test('is rendered', () => {
      const { container } = render(<EuiListGroup listItems={someListItems} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is rendered with color', () => {
      const { container } = render(
        <EuiListGroup color="primary" listItems={someListItems} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is rendered with size', () => {
      const { container } = render(<EuiListGroup color="primary" size="xs" />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('props', () => {
    test('bordered is rendered', () => {
      const { container } = render(<EuiListGroup bordered />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('flush is rendered', () => {
      const { container } = render(<EuiListGroup flush />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('showToolTips is rendered', () => {
      const { container } = render(<EuiListGroup showToolTips />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('wrapText is rendered', () => {
      const { container } = render(<EuiListGroup wrapText />);

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('gutter size', () => {
      GUTTER_SIZES.forEach((gutter) => {
        test(`${gutter} is rendered`, () => {
          const { container } = render(<EuiListGroup gutterSize={gutter} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('maxWidth', () => {
      test('as true is rendered', () => {
        const { container } = render(<EuiListGroup maxWidth={true} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('as a number is rendered', () => {
        const { container } = render(<EuiListGroup maxWidth={300} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('as a string is rendered', () => {
        const { container } = render(<EuiListGroup maxWidth="20em" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
