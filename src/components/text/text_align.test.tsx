import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTextAlign, TextAlignment } from './text_align';

describe('EuiTextAlign', () => {
  test('is rendered', () => {
    const component = render(<EuiTextAlign {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  ['left', 'right', 'center'].forEach(direction => {
    test(`in ${direction} direction`, () => {
      const component = render(
        <EuiTextAlign
          {...requiredProps}
          textAlign={direction as TextAlignment}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
