import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiBetaBadge } from './beta_badge';

describe('EuiBetaBadge', () => {
  test('is rendered', () => {
    const component = render(<EuiBetaBadge label="Beta" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
