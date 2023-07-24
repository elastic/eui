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

import { EuiDescriptionListTitle } from './description_list_title';
import { TYPES } from './description_list_types';
import {
  EuiDescriptionListContext,
  contextDefaults,
} from './description_list_context';

describe('EuiDescriptionListTitle', () => {
  shouldRenderCustomStyles(<EuiDescriptionListTitle />);

  test('is rendered', () => {
    const { container } = render(
      <EuiDescriptionListTitle {...requiredProps}>
        Content
      </EuiDescriptionListTitle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('EuiDescriptionListTitle prop variations', () => {
    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const { container } = render(
            <EuiDescriptionListContext.Provider
              value={{ ...contextDefaults, type }}
            >
              <EuiDescriptionListTitle />
            </EuiDescriptionListContext.Provider>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('align', () => {
      test('center alignment is rendered', () => {
        const { container } = render(
          <EuiDescriptionListContext.Provider
            value={{ ...contextDefaults, align: 'center' }}
          >
            <EuiDescriptionListTitle />
          </EuiDescriptionListContext.Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('text styles', () => {
      test('reversed text is rendered', () => {
        const { container } = render(
          <EuiDescriptionListContext.Provider
            value={{ ...contextDefaults, textStyle: 'reverse' }}
          >
            <EuiDescriptionListTitle />
          </EuiDescriptionListContext.Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiDescriptionListContext.Provider
            value={{ ...contextDefaults, compressed: true }}
          >
            <EuiDescriptionListTitle />
          </EuiDescriptionListContext.Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
