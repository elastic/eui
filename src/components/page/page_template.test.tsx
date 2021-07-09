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
