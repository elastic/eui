import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCommentTimeline } from './comment_timeline';
import { EuiAvatar } from '../avatar';

describe('EuiCommentTimeline', () => {
  test('is rendered', () => {
    const component = render(<EuiCommentTimeline {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      it('is rendered', () => {
        const component = render(<EuiCommentTimeline type="update" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('timelineIcon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentTimeline
            timelineIcon={<EuiAvatar size="l" name="Mario" />}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
