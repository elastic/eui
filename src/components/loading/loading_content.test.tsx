/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiLoadingContent, LineRange } from './loading_content';

const lines: LineRange[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('EuiLoadingContent', () => {
  test('is rendered', () => {
    const component = render(<EuiLoadingContent {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('lines', () => {
    lines.forEach((line) => {
      test(`${line} is rendered`, () => {
        const component = render(<EuiLoadingContent lines={line} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
