import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCommentTimeline } from './comment_timeline';

describe('EuiCommentTimeline', () => {
  test('is rendered', () => {
    const component = render(<EuiCommentTimeline {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
