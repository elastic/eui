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

import {
  EuiPageTemplate_Deprecated as EuiPageTemplate,
  TEMPLATES,
} from './page_template';

describe('EuiPageTemplate_Deprecated', () => {
  test('is rendered', () => {
    const { container } = render(<EuiPageTemplate {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('restrict width', () => {
    test('can be turned off', () => {
      const { container } = render(<EuiPageTemplate restrictWidth={false} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const { container } = render(<EuiPageTemplate restrictWidth={1024} />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('template', () => {
    TEMPLATES.forEach((template) => {
      describe(`${template}`, () => {
        it('is rendered', () => {
          const { container } = render(<EuiPageTemplate template={template} />);

          expect(container.firstChild).toMatchSnapshot();
        });

        it('paddingSize is rendered', () => {
          const { container } = render(
            <EuiPageTemplate template={template} paddingSize="none" />
          );

          expect(container.firstChild).toMatchSnapshot();
        });

        it('minHeight is rendered', () => {
          const { container } = render(
            <EuiPageTemplate template={template} minHeight="40vh" />
          );

          expect(container.firstChild).toMatchSnapshot();
        });

        it('style is rendered', () => {
          const { container } = render(
            <EuiPageTemplate
              template={template}
              style={{ maxHeight: '100vh' }}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });

        describe('with pageSideBar', () => {
          test('is rendered', () => {
            const { container } = render(
              <EuiPageTemplate template={template} pageSideBar="Side Bar" />
            );

            expect(container.firstChild).toMatchSnapshot();
          });

          test('is rendered with pageSideBarProps', () => {
            const { container } = render(
              <EuiPageTemplate
                template={template}
                pageSideBar="Side Bar"
                pageSideBarProps={requiredProps}
              />
            );

            expect(container.firstChild).toMatchSnapshot();
          });
        });

        test('is rendered with pageHeader', () => {
          const { container } = render(
            <EuiPageTemplate
              template={template}
              pageHeader={{
                title: 'Page title',
                ...requiredProps,
              }}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });

        test('is rendered with pageBodyProps', () => {
          const { container } = render(
            <EuiPageTemplate
              template={template}
              pageBodyProps={requiredProps}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });

        test('is rendered with pageContentProps', () => {
          const { container } = render(
            <EuiPageTemplate
              template={template}
              pageContentProps={requiredProps}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });

        test('is rendered with pageContentBodyProps', () => {
          const { container } = render(
            <EuiPageTemplate
              template={template}
              pageContentBodyProps={requiredProps}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });

  describe('with bottomBar', () => {
    test('is rendered', () => {
      const { container } = render(
        <EuiPageTemplate
          bottomBar="Bottom Bar"
          bottomBarProps={{ paddingSize: 'none' }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('fullHeight', () => {
    test('is rendered with true', () => {
      const { container } = render(<EuiPageTemplate fullHeight={true} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is rendered with noscroll', () => {
      const { container } = render(<EuiPageTemplate fullHeight={'noscroll'} />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
