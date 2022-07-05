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

import { EuiDescriptionListDescription } from './description_list_description';
import { TYPES } from './description_list_types';
import { shouldRenderCustomStyles } from '../../test/internal';
import { EuiDescriptionListContext } from './description_list_context';

shouldRenderCustomStyles(<EuiDescriptionListDescription />);

describe('EuiDescriptionListDescription', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptionListDescription {...requiredProps}>
        Content
      </EuiDescriptionListDescription>
    );

    expect(component).toMatchSnapshot();
  });

  describe('EuiDescriptionListDescription prop variations', () => {
    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const component = render(
            <EuiDescriptionListContext.Provider value={{ type }}>
              <EuiDescriptionListDescription />
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
            <EuiDescriptionListDescription />
          </EuiDescriptionListContext.Provider>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('text styles', () => {
      test('reversed text is rendered', () => {
        const component = render(
          <EuiDescriptionListContext.Provider value={{ textStyle: 'reverse' }}>
            <EuiDescriptionListDescription />
          </EuiDescriptionListContext.Provider>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const component = render(
          <EuiDescriptionListContext.Provider value={{ compressed: true }}>
            <EuiDescriptionListDescription />
          </EuiDescriptionListContext.Provider>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
