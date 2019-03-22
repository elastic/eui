import React from 'react';
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
    lines.forEach(line => {
      test(`${line} is rendered`, () => {
        const component = render(<EuiLoadingContent lines={line} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
