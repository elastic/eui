import React from 'react';

import {
  EuiToast,
} from '../../../../src/components';

export default () => (
  <EuiToast
    title="This is an example of a poor toast title. It's way too long."
    color="success"
    iconType="user"
  >
    <p>
      While the layout will adjust properly for wrapping titles, they do not look particularly good.
      Similarily, do not use a whole lot of text in your body either. At a certain point people will not
      have enough time to read these things. Like, you probably are not even reading this now.
    </p>

    <p>
      You should not even need a second paragraph. Again, we are getting long winded here.
    </p>
  </EuiToast>
);
