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

import { EuiDescriptionList } from './description_list';
import { TYPES, ALIGNMENTS, GUTTER_SIZES } from './description_list_types';

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
    });

    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const { container } = render(<EuiDescriptionList type={type} />);

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

    describe('gutter', () => {
      GUTTER_SIZES.forEach((gutter) => {
        test(`${gutter} is rendered`, () => {
          const { container } = render(
            <EuiDescriptionList gutterSize={gutter} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
