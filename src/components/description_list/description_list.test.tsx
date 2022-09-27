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
    const component = render(
      <EuiDescriptionList {...requiredProps}>Content</EuiDescriptionList>
    );

    expect(component).toMatchSnapshot();
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
      const component = render(
        <EuiDescriptionList listItems={listItems}>
          listItems will render instead of this content
        </EuiDescriptionList>
      );

      expect(component).toMatchSnapshot();

      describe('titleProps', () => {
        test('is rendered', () => {
          const component = render(
            <EuiDescriptionList
              listItems={listItems}
              titleProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });

      describe('descriptionProps', () => {
        test('is rendered', () => {
          const component = render(
            <EuiDescriptionList
              listItems={listItems}
              descriptionProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const component = render(<EuiDescriptionList compressed />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const component = render(<EuiDescriptionList type={type} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('align', () => {
      ALIGNMENTS.forEach((alignment) => {
        test(`${alignment} is rendered`, () => {
          const component = render(<EuiDescriptionList align={alignment} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('gutter', () => {
      GUTTER_SIZES.forEach((gutter) => {
        test(`${gutter} is rendered`, () => {
          const component = render(<EuiDescriptionList gutterSize={gutter} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
