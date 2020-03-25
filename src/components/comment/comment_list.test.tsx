import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCommentList } from './comment_list';

describe('EuiCommentList', () => {
  test('is rendered', () => {
    const component = render(<EuiCommentList {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
