/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSideNav } from './side_nav';
import { RenderItem } from './side_nav_item';

describe('EuiSideNav', () => {
  test('is rendered', () => {
    const component = render(<EuiSideNav {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isOpenOnMobile', () => {
      test('defaults to false', () => {
        const component = render(<EuiSideNav />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered when specified as true', () => {
        const component = render(<EuiSideNav isOpenOnMobile />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('mobileBreakpoints can be adjusted', () => {
      test('is rendered', () => {
        const component = render(
          <EuiSideNav mobileBreakpoints={['xs', 's', 'm', 'l', 'xl']} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('heading', () => {
      test('is rendered', () => {
        const component = render(<EuiSideNav heading="Side Nav Heading" />);

        expect(component).toMatchSnapshot();
      });

      test('is hidden with screenReaderOnly', () => {
        const component = render(
          <EuiSideNav
            heading="Side Nav Heading"
            headingProps={{ screenReaderOnly: true }}
          />
        );

        expect(component).toMatchSnapshot();
      });

      test('accepts more headingProps', () => {
        const component = render(
          <EuiSideNav
            heading="Side Nav Heading"
            headingProps={{ ...requiredProps, id: 'testID', element: 'h3' }}
          />
        );

        expect(component).toMatchSnapshot();
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

        const component = render(<EuiSideNav items={sideNav} />);

        expect(component).toMatchSnapshot();
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

        const component = render(<EuiSideNav items={sideNav} />);

        expect(component).toMatchSnapshot();
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

        const component = render(
          <EuiSideNav items={sideNav} renderItem={renderItem} />
        );

        expect(component).toMatchSnapshot();
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

        const component = render(<EuiSideNav items={sideNav} />);

        expect(component).toMatchSnapshot();
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

        const component = render(<EuiSideNav items={sideNav} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
