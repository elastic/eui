import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTextFontFamily } from './text_font_family';

describe('EuiTextFontFamily', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTextFontFamily fontFamily="code" {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
