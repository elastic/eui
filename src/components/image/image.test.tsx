import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiImage } from './image';

describe('EuiImage', () => {
  test('is rendered', () => {
    const component = render(
      <EuiImage alt="alt" size="l" url="/cat.jpg" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered and allows full screen', () => {
    const component = render(
      <EuiImage
        alt="alt"
        size="l"
        url="/cat.jpg"
        allowFullScreen
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
