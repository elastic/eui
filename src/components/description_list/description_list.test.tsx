import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiDescriptionList, TYPES, ALIGNMENTS } from './description_list';

describe('EuiDescriptionList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptionList {...requiredProps}>Content</EuiDescriptionList>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('listItems', () => {
      test('is rendered as strings and elements', () => {
        const listItems = [
          {
            title: 'Title 1',
            description: 'Description 1',
          },
          {
            title: <em>Title 2</em>,
            description: <code>Description 2</code>,
          },
          {
            title: 'Title 3',
            description: 'Description 3',
          },
        ];

        const component = render(
          <EuiDescriptionList listItems={listItems}>
            listItems will render instead of this content
          </EuiDescriptionList>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const component = render(<EuiDescriptionList compressed />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      TYPES.forEach(type => {
        test(`${type} is rendered`, () => {
          const component = render(<EuiDescriptionList type={type} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('align', () => {
      ALIGNMENTS.forEach(alignment => {
        test(`${alignment} is rendered`, () => {
          const component = render(<EuiDescriptionList align={alignment} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
