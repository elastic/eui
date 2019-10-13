import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test';

import { LoadingTableBody } from './loading_table_body';

describe('LoadingTableBody', () => {
  test('render', () => {
    const props = {
      ...requiredProps,
    };
    const component = mount(
      <table>
        <LoadingTableBody {...props} />
      </table>
    );

    expect(component).toMatchSnapshot();
  });
});
