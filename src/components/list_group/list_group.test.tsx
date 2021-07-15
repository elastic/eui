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
  test('is rendered', () => {
    const component = render(<EuiListGroup {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('listItems', () => {
    test('is rendered', () => {
      const component = render(<EuiListGroup listItems={someListItems} />);

      expect(component).toMatchSnapshot();
    });

    test('is rendered with color', () => {
      const component = render(
        <EuiListGroup color="primary" listItems={someListItems} />
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered with size', () => {
      const component = render(<EuiListGroup color="primary" size="xs" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('props', () => {
    test('bordered is rendered', () => {
      const component = render(<EuiListGroup bordered />);

      expect(component).toMatchSnapshot();
    });

    test('flush is rendered', () => {
      const component = render(<EuiListGroup flush />);

      expect(component).toMatchSnapshot();
    });

    test('showToolTips is rendered', () => {
      const component = render(<EuiListGroup showToolTips />);

      expect(component).toMatchSnapshot();
    });

    test('wrapText is rendered', () => {
      const component = render(<EuiListGroup wrapText />);

      expect(component).toMatchSnapshot();
    });

    describe('gutter size', () => {
      GUTTER_SIZES.forEach((gutter) => {
        test(`${gutter} is rendered`, () => {
          const component = render(<EuiListGroup gutterSize={gutter} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('maxWidth', () => {
      test('as true is rendered', () => {
        const component = render(<EuiListGroup maxWidth={true} />);

        expect(component).toMatchSnapshot();
      });

      test('as a number is rendered', () => {
        const component = render(<EuiListGroup maxWidth={300} />);

        expect(component).toMatchSnapshot();
      });

      test('as a string is rendered', () => {
        const component = render(<EuiListGroup maxWidth="20em" />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
