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
