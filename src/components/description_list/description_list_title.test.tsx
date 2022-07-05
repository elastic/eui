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

import { EuiDescriptionListTitle } from './description_list_title';
import { shouldRenderCustomStyles } from '../../test/internal';
import { TYPES } from './description_list_types';
import { EuiDescriptionListContext } from './description_list_context';

shouldRenderCustomStyles(<EuiDescriptionListTitle />);

describe('EuiDescriptionListTitle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptionListTitle {...requiredProps}>
        Content
      </EuiDescriptionListTitle>
    );

    expect(component).toMatchSnapshot();
  });

  describe('EuiDescriptionListTitle prop variations', () => {
    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const component = render(
            <EuiDescriptionListContext.Provider value={{ type }}>
              <EuiDescriptionListTitle />
            </EuiDescriptionListContext.Provider>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('align', () => {
      test('center alignment is rendered', () => {
        const component = render(
          <EuiDescriptionListContext.Provider value={{ align: 'center' }}>
            <EuiDescriptionListTitle />
          </EuiDescriptionListContext.Provider>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('text styles', () => {
      test('reversed text is rendered', () => {
        const component = render(
          <EuiDescriptionListContext.Provider value={{ textStyle: 'reverse' }}>
            <EuiDescriptionListTitle />
          </EuiDescriptionListContext.Provider>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const component = render(
          <EuiDescriptionListContext.Provider value={{ compressed: true }}>
            <EuiDescriptionListTitle />
          </EuiDescriptionListContext.Provider>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
