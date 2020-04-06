import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCommentEvent } from './comment_event';

describe('EuiCommentEvent', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCommentEvent username="someuser" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
