import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTableOfRecords } from './table_of_records';

describe('EuiTableOfRecords', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTableOfRecords {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
