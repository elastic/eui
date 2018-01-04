import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiImage } from './image';

describe('EuiImage', () => {
  test('is rendered', () => {
    const component = render(
      <EuiImage title="title" size="l" {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
