/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

jest.mock('../../services', () => ({
  ...jest.requireActual('../../services'),
  useIsWithinBreakpoints: jest.fn(),
}));
import * as services from '../../services';
const mockUseIsWithinBreakpoints = services.useIsWithinBreakpoints as jest.Mock;

import { EuiDescriptionList } from './description_list';
import {
  TYPES,
  ALIGNMENTS,
  ROW_GUTTER_SIZES,
  COLUMN_GUTTER_SIZES,
} from './description_list_types';

describe('EuiDescriptionList', () => {
  shouldRenderCustomStyles(
    <EuiDescriptionList
      listItems={[{ title: 'hello', description: 'world' }]}
    />,
    { childProps: ['titleProps', 'descriptionProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiDescriptionList {...requiredProps}>Content</EuiDescriptionList>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

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

  describe('props', () => {
    describe('listItems', () => {
      const { container } = render(
        <EuiDescriptionList listItems={listItems}>
          listItems will render instead of this content
        </EuiDescriptionList>
      );

      expect(container.firstChild).toMatchSnapshot();

      describe('titleProps', () => {
        test('is rendered', () => {
          const { container } = render(
            <EuiDescriptionList
              listItems={listItems}
              titleProps={requiredProps}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      describe('descriptionProps', () => {
        test('is rendered', () => {
          const { container } = render(
            <EuiDescriptionList
              listItems={listItems}
              descriptionProps={requiredProps}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const { container } = render(<EuiDescriptionList compressed />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it.each([
        ['row', 'normal'],
        ['row', 'reverse'],
        ['column', 'normal'],
        ['column', 'reverse'],
      ] as const)(
        'uses matching font sizes in %s with %s text',
        (type, textStyle) => {
          const { getByText } = render(
            <EuiDescriptionList
              compressed
              type={type}
              textStyle={textStyle}
              listItems={[{ title: 'title', description: 'description' }]}
            />
          );

          expect(getByText('title')).toHaveStyleRule('font-size', '1.0000rem');
          expect(getByText('description')).toHaveStyleRule(
            'font-size',
            '1.0000rem'
          );
        }
      );

      it.each(['normal', 'reverse'] as const)(
        'keeps matching font sizes when responsive columns collapse with %s text',
        (textStyle) => {
          mockUseIsWithinBreakpoints.mockReturnValue(false);
          const props = {
            compressed: true,
            type: 'responsiveColumn' as const,
            textStyle,
            listItems: [{ title: 'title', description: 'description' }],
          };
          const { getByText, rerender } = render(
            <EuiDescriptionList {...props} />
          );

          const text = textStyle === 'normal' ? 'description' : 'title';
          expect(getByText(text)).toHaveStyleRule('font-size', '1.0000rem');
          mockUseIsWithinBreakpoints.mockReturnValue(true);
          rerender(<EuiDescriptionList {...props} />);
          expect(getByText(text)).toHaveStyleRule('font-size', '1.0000rem');
        }
      );

      it.each(['normal', 'reverse'] as const)(
        'preserves the compressed inline font size with %s text',
        (textStyle) => {
          const { getByText } = render(
            <EuiDescriptionList
              compressed
              type="inline"
              textStyle={textStyle}
              listItems={[{ title: 'title', description: 'description' }]}
            />
          );

          expect(getByText('title')).toHaveStyleRule('font-size', '0.8571rem');
          expect(getByText('description')).toHaveStyleRule(
            'font-size',
            '0.8571rem'
          );
        }
      );
    });

    describe('type', () => {
      TYPES.filter((type) => type !== 'responsiveColumn').forEach((type) => {
        test(`${type} is rendered`, () => {
          const { container } = render(<EuiDescriptionList type={type} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      describe('responsiveColumn', () => {
        it('renders a row when the current window is within the responsive breakpoints', () => {
          mockUseIsWithinBreakpoints.mockReturnValue(true);
          const { container } = render(
            <EuiDescriptionList type="responsiveColumn" />
          );

          expect(container.firstElementChild!.className).toContain('row');
          expect(container.firstChild).toMatchSnapshot();
        });

        it('renders a column when the current window is above the responsive breakpoints', () => {
          mockUseIsWithinBreakpoints.mockReturnValue(false);
          const { container } = render(
            <EuiDescriptionList type="responsiveColumn" />
          );

          expect(container.firstElementChild!.className).toContain('column');
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('align', () => {
      ALIGNMENTS.forEach((alignment) => {
        test(`${alignment} is rendered`, () => {
          const { container } = render(
            <EuiDescriptionList align={alignment} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('rowGutterSize', () => {
      ROW_GUTTER_SIZES.forEach((gutter) => {
        test(`${gutter} is rendered`, () => {
          const { container } = render(
            <EuiDescriptionList type="column" rowGutterSize={gutter} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('columnGutterSize', () => {
      COLUMN_GUTTER_SIZES.forEach((columnGutterSize) => {
        test(`${columnGutterSize} is rendered`, () => {
          const { container } = render(
            <EuiDescriptionList
              type="column"
              columnGutterSize={columnGutterSize}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      describe('columnWidths', () => {
        it('renders the passed values as an inline css grid style', () => {
          const { container } = render(
            <EuiDescriptionList
              type="column"
              columnWidths={['100px', 'minmax(200px, auto)']}
            />
          );
          expect(container.firstChild).toHaveStyle(
            'grid-template-columns: 100px minmax(200px, auto)'
          );
        });

        it('converts numbers into fr grid units', () => {
          const { container } = render(
            <EuiDescriptionList type="column" columnWidths={[1, 2]} />
          );
          expect(container.firstChild).toHaveStyle(
            'grid-template-columns: 1fr 2fr'
          );
        });

        it('respects custom styles', () => {
          const { container } = render(
            <EuiDescriptionList
              type="column"
              columnWidths={[3, 4]}
              style={{ color: 'red' }}
            />
          );
          expect(container.firstChild).toHaveStyle('color: rgb(255, 0, 0)');
        });

        it('correctly removes inline styles when responsive columns collapse to rows', () => {
          const { container, rerender } = render(
            <EuiDescriptionList type="responsiveColumn" columnWidths={[3, 4]} />
          );
          expect(container.firstChild).toHaveStyle(
            'grid-template-columns: 3fr 4fr'
          );

          mockUseIsWithinBreakpoints.mockReturnValue(true);
          rerender(
            <EuiDescriptionList type="responsiveColumn" columnWidths={[3, 4]} />
          );
          expect(container.firstChild).toHaveAttribute('style', '');
        });
      });
    });
  });
});
