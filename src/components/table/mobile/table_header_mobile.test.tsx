import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiTableHeaderMobile } from './table_header_mobile';

describe('EuiTableHeaderMobile', () => {
  test('is rendered', () => {
    const component = render(<EuiTableHeaderMobile {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
