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
import { requiredProps } from '../../test/required_props';

import { EuiPageTemplate, TEMPLATES } from './page_template';

describe('EuiPageTemplate', () => {
  test('is rendered', () => {
    const component = render(<EuiPageTemplate {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('restrict width', () => {
    test('can be turned off', () => {
      const component = render(<EuiPageTemplate restrictWidth={false} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(<EuiPageTemplate restrictWidth={1024} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('template', () => {
    TEMPLATES.forEach((template) => {
      describe(`${template}`, () => {
        it('is rendered', () => {
          const component = render(<EuiPageTemplate template={template} />);

          expect(component).toMatchSnapshot();
        });

        it('paddingSize is rendered', () => {
          const component = render(
            <EuiPageTemplate template={template} paddingSize="none" />
          );

          expect(component).toMatchSnapshot();
        });

        it('minHeight is rendered', () => {
          const component = render(
            <EuiPageTemplate template={template} minHeight="40vh" />
          );

          expect(component).toMatchSnapshot();
        });

        it('style is rendered', () => {
          const component = render(
            <EuiPageTemplate
              template={template}
              style={{ maxHeight: '100vh' }}
            />
          );

          expect(component).toMatchSnapshot();
        });

        describe('with pageSideBar', () => {
          test('is rendered', () => {
            const component = render(
              <EuiPageTemplate template={template} pageSideBar="Side Bar" />
            );

            expect(component).toMatchSnapshot();
          });

          test('is rendered with pageSideBarProps', () => {
            const component = render(
              <EuiPageTemplate
                template={template}
                pageSideBar="Side Bar"
                pageSideBarProps={requiredProps}
              />
            );

            expect(component).toMatchSnapshot();
          });
        });

        test('is rendered with pageHeader', () => {
          const component = render(
            <EuiPageTemplate
              template={template}
              pageHeader={{
                title: 'Page title',
                ...requiredProps,
              }}
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageBodyProps', () => {
          const component = render(
            <EuiPageTemplate
              template={template}
              pageBodyProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageContentProps', () => {
          const component = render(
            <EuiPageTemplate
              template={template}
              pageContentProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('is rendered with pageContentBodyProps', () => {
          const component = render(
            <EuiPageTemplate
              template={template}
              pageContentBodyProps={requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('with bottomBar', () => {
    test('is rendered', () => {
      const component = render(
        <EuiPageTemplate
          bottomBar="Bottom Bar"
          bottomBarProps={{ paddingSize: 'none' }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('fullHeight', () => {
    test('is rendered with true', () => {
      const component = render(<EuiPageTemplate fullHeight={true} />);

      expect(component).toMatchSnapshot();
    });

    test('is rendered with noscroll', () => {
      const component = render(<EuiPageTemplate fullHeight={'noscroll'} />);

      expect(component).toMatchSnapshot();
    });
  });
});
