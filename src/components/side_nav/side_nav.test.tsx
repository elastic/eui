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

import { EuiSideNav } from './side_nav';
import { RenderItem } from './side_nav_item';

describe('EuiSideNav', () => {
  shouldRenderCustomStyles(<EuiSideNav heading="Test" />, {
    childProps: ['headingProps'],
  });

  test('is rendered', () => {
    const { container } = render(<EuiSideNav {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isOpenOnMobile', () => {
      test('defaults to false', () => {
        const { container } = render(<EuiSideNav />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered when specified as true', () => {
        const { container } = render(<EuiSideNav isOpenOnMobile />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('mobileBreakpoints can be adjusted', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiSideNav mobileBreakpoints={['xs', 's', 'm', 'l', 'xl']} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('null is rendered', () => {
        const { container } = render(
          <EuiSideNav mobileBreakpoints={undefined} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('heading', () => {
      test('is rendered', () => {
        const { container } = render(<EuiSideNav heading="Side Nav Heading" />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is hidden with screenReaderOnly', () => {
        const { container } = render(
          <EuiSideNav
            heading="Side Nav Heading"
            headingProps={{ screenReaderOnly: true }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('accepts more headingProps', () => {
        const { container } = render(
          <EuiSideNav
            heading="Side Nav Heading"
            headingProps={{ ...requiredProps, id: 'testID', element: 'h3' }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('items', () => {
      test('is rendered', () => {
        const sideNav = [
          {
            name: 'A',
            id: 0,
            items: [
              {
                name: 'B',
                className: 'class',
                'data-test-sub': 'dts',
                'aria-label': 'aria',
                id: 1,
              },
              {
                name: 'C',
                truncate: false,
                emphasize: true,
                id: 2,
                items: [
                  {
                    name: 'D',
                    id: 3,
                  },
                  {
                    name: 'E',
                    disabled: true,
                    id: 4,
                  },
                ],
              },
            ],
          },
        ];

        const { container } = render(<EuiSideNav items={sideNav} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders items which are links', () => {
        const sideNav = [
          {
            name: 'A',
            id: 0,
            href: 'http://www.elastic.co',
            items: [
              {
                name: 'B',
                id: 1,
              },
              {
                name: 'C',
                id: 2,
                items: [
                  {
                    name: 'D',
                    id: 3,
                  },
                  {
                    name: 'E',
                    id: 4,
                  },
                ],
              },
            ],
          },
        ];

        const { container } = render(<EuiSideNav items={sideNav} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders items using a specified callback', () => {
        const sideNav = [
          {
            name: 'A',
            id: 0,
            href: 'http://www.elastic.co',
            items: [
              {
                name: 'B',
                id: 1,
              },
            ],
          },
        ];

        // eslint-disable-next-line local/href-with-rel
        const renderItem: RenderItem<{}> = ({ href, className, children }) => (
          <a data-test-id="my-custom-element" href={href} className={className}>
            {children}
          </a>
        );

        const { container } = render(
          <EuiSideNav items={sideNav} renderItem={renderItem} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders selected item and automatically opens parent items', () => {
        const sideNav = [
          {
            name: 'A',
            id: 0,
            items: [
              {
                name: 'B',
                id: 1,
              },
              {
                name: 'C',
                id: 2,
                items: [
                  {
                    name: 'D',
                    id: 3,
                    isSelected: true,
                  },
                  {
                    name: 'E',
                    id: 4,
                  },
                ],
              },
            ],
          },
        ];

        const { container } = render(<EuiSideNav items={sideNav} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders items having { forceOpen: true } in open state, and automatically opens parent items', () => {
        const sideNav = [
          {
            name: 'A',
            id: 0,
            items: [
              {
                name: 'B',
                id: 1,
              },
              {
                name: 'C',
                id: 2,
                items: [
                  {
                    name: 'D',
                    id: 3,
                    forceOpen: true,
                    items: [
                      {
                        name: 'E',
                        id: 4,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ];

        const { container } = render(<EuiSideNav items={sideNav} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
