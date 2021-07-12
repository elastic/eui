/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageBody } from './page_body';
import { TEMPLATES } from '../_template';

describe('EuiPageBody', () => {
  describe('template', () => {
    TEMPLATES.forEach((template) => {
      describe(`${template}`, () => {
        test('is rendered', () => {
          const component = render(<EuiPageBody {...requiredProps} />);

          expect(component).toMatchSnapshot();
        });
        it('paddingSize is rendered', () => {
          const component = render(
            <EuiPageBody template={template} paddingSize="none" />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageHeader', () => {
          const component = render(
            <EuiPageBody
              template={template}
              pageHeader={{
                title: 'Page title',
                ...requiredProps,
              }}
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageContentProps', () => {
          const component = render(
            <EuiPageBody template={template} pageContentProps={requiredProps} />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageContentBodyProps', () => {
          const component = render(
            <EuiPageBody
              template={template}
              pageContentBodyProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with bottomBar', () => {
          const component = render(
            <EuiPageBody template={template} bottomBar="Bottom bar" />
          );

          expect(component).toMatchSnapshot();
        });

        describe('panelled', () => {
          test('can be set to true', () => {
            const component = render(<EuiPageBody panelled={true} />);

            expect(component).toMatchSnapshot();
          });

          test('also accepts panelProps', () => {
            const component = render(
              <EuiPageBody panelled={true} panelProps={{ color: 'subdued' }} />
            );

            expect(component).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(
        <EuiPageBody {...requiredProps} restrictWidth={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(
        <EuiPageBody {...requiredProps} restrictWidth={1024} />
      );

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const component = render(
        <EuiPageBody {...requiredProps} restrictWidth="24rem" />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
