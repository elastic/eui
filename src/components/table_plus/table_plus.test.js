import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTablePlus } from './table_plus';

describe('EuiTablePlus', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTablePlus
        {...requiredProps}
        id="id"
        columns={[{ id: 0 }]}
        rows={[]}
        rowCellRenderer={() => {}}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
