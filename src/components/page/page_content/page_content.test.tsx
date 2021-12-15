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

import { EuiPageContent, EuiPageContentProps } from './page_content';
import { TEMPLATES } from '../_template';

describe('EuiPageContent', () => {
  describe('template', () => {
    TEMPLATES.forEach((template) => {
      test('is rendered', () => {
        const component = render(<EuiPageContent {...requiredProps} />);

        expect(component).toMatchSnapshot();
      });

      it('accepts EuiPanel props', () => {
        const component = render(
          <EuiPageContent
            template={template}
            paddingSize={'s'}
            color="danger"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('border', () => {
    ['top', 'topExtended', 'bottom', 'bottomExtended'].forEach((border) => {
      test('is rendered', () => {
        const component = render(<EuiPageContent {...requiredProps} />);

        expect(component).toMatchSnapshot();
      });

      it('accepts EuiPanel props', () => {
        const component = render(
          <EuiPageContent
            border={border as EuiPageContentProps['border']}
            paddingSize={'s'}
            color="danger"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  // test('verticalPosition is rendered', () => {
  //   const component = render(<EuiPageContent verticalPosition="center" />);

  //   expect(component).toMatchSnapshot();
  // });

  // test('horizontalPosition is rendered', () => {
  //   const component = render(<EuiPageContent horizontalPosition="center" />);

  //   expect(component).toMatchSnapshot();
  // });

  test('role can be removed', () => {
    const component = render(<EuiPageContent role={null} />);

    expect(component).toMatchSnapshot();
  });
});
