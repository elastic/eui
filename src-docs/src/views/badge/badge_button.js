import React from 'react';

import { EuiBadge } from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge
      color="#333"
      onClick={() => window.alert('Badge clicked')}
      onClickAriaLabel="Example of onclick event for the button"
      data-test-sub="testExample1">
      onClick on badge itself
    </EuiBadge>

    <EuiBadge
      iconType="cross"
      iconSide="right"
      color="#333"
      iconOnClick={() => window.alert('Icon inside badge clicked')}
      iconOnClickAriaLabel="Example of onclick event for icon within the button"
      data-test-sub="testExample2">
      onClick on icon within badge
    </EuiBadge>

    <EuiBadge
      iconType="cross"
      iconSide="right"
      color="#333"
      onClick={() => window.alert('Badge clicked')}
      onClickAriaLabel="Example of onclick event for the button"
      iconOnClick={() => window.alert('Icon inside badge clicked')}
      iconOnClickAriaLabel="Example of onclick event for icon within the button"
      data-test-sub="testExample3">
      onClick on itself and the icon
    </EuiBadge>
  </div>
);
