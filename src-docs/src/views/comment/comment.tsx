// import React from 'react';
import React from 'react';

import { EuiComment } from '../../../../src/components/comment';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiAvatar } from '../../../../src/components/avatar';
// import { EuiSpacer } from '../../../../src/components/spacer';

const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar.';

export default () => (
  <div>
    <EuiComment
      user="andread"
      event="added a comment"
      actions={<EuiIcon type="copy" />}
      timeStamp="Jan 1, 2020 @ 22:30:00"
      timelineIcon={<EuiAvatar name="Andrea" />}>
      {body}
    </EuiComment>
    <EuiComment
      user="chandlerp"
      commentStyle="update"
      actions={<EuiIcon type="copy" />}
      event="requested review"
      timeStamp="Jan 1, 2020 @ 22:30:00"
      timelineIcon={<EuiAvatar name="Chandler" />}
    />
    <EuiComment
      user="gregg"
      commentStyle="update"
      event="added a review"
      timeStamp="Jan 1, 2020 @ 22:30:00"
      timelineIcon={<EuiAvatar name="Greg" />}
    />
    <EuiComment
      user="andread"
      event="added a comment"
      actions={<EuiIcon type="copy" />}
      timeStamp="Jan 1, 2020 @ 22:30:00"
      timelineIcon={<EuiAvatar name="Andrea" />}>
      {body}
    </EuiComment>
  </div>
);
