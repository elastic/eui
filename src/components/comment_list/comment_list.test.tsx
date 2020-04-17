import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCommentList } from './comment_list';

const comments = [
  {
    username: 'janed',
  },
];

describe('EuiCommentList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCommentList comments={comments} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
