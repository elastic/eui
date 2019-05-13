import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSideNav } from './side_nav';

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

    describe('items', () => {
      test('is rendered', () => {
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

        const renderItem = ({ href, className, children }) => (
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
