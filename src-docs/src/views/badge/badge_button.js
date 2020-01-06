import React from 'react';

import { EuiBadge } from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge
      color="primary"
      onClick={() => window.alert('Badge clicked')}
      onClickAriaLabel="Example of onClick event for the button"
      data-test-sub="testExample1">
      onClick on text within badge
    </EuiBadge>

    <EuiBadge
      color="hollow"
      iconType="cross"
      iconSide="right"
      iconOnClick={() => window.alert('Icon inside badge clicked')}
      iconOnClickAriaLabel="Example of onClick event for icon within the button"
      data-test-sub="testExample2">
      onClick on icon within badge
    </EuiBadge>

    <EuiBadge
      color="secondary"
      iconType="cross"
      iconSide="right"
      onClick={() => window.alert('Badge clicked')}
      onClickAriaLabel="Example of onClick event for the button"
      iconOnClick={() => window.alert('Icon inside badge clicked')}
      iconOnClickAriaLabel="Example of onClick event for icon within the button"
      data-test-sub="testExample3">
      onClick on both text and icon within badge
    </EuiBadge>
  </div>
);
