import React from 'react';

import {
  EuiIcon,
  EuiToolTip,
  EuiLink,
  EuiText,
  EuiFieldText,
  EuiSpacer,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiText>
      <p>
        This tooltip appears on the{' '}
        <EuiToolTip position="top" content="Here is some tooltip text">
          <EuiLink href="#">top</EuiLink>
        </EuiToolTip>
      </p>

      <p>
        This tooltip appears on the{' '}
        <EuiToolTip
          position="left"
          title="Tooltip titles are optional"
          content="Here is some tooltip text. Lets add some more content to see how it wraps.">
          <EuiLink href="#">left</EuiLink>
        </EuiToolTip>{' '}
        and includes the optional title.
      </p>

      <p>
        This tooltip appears on the{' '}
        <EuiToolTip position="right" content="Here is some tooltip text">
          <EuiLink href="#">right</EuiLink>
        </EuiToolTip>
      </p>

      <p>
        This tooltip has a long delay because it might be in a repeatable
        component{' '}
        <EuiToolTip delay="long" content="Here is some tooltip text">
          <EuiLink href="#">wink</EuiLink>
        </EuiToolTip>
      </p>

      <p>
        This tooltip appears on the bottom of this icon:{' '}
        <EuiToolTip position="bottom" content="Here is some tooltip text">
          <EuiIcon tabIndex="0" type="alert" title="Icon with tooltip" />
        </EuiToolTip>
      </p>
    </EuiText>

    <EuiSpacer />

    <EuiToolTip position="right" content="Works on anything">
      <EuiFieldText placeholder="Hover over me" />
    </EuiToolTip>

    <EuiSpacer />

    <EuiToolTip
      position="top"
      content={
        <p>
          Works on any kind of element &mdash; buttons, inputs, you name it!
        </p>
      }>
      <EuiButton
        onClick={() => alert('Buttons are still clickable within tooltips.')}>
        Hover me
      </EuiButton>
    </EuiToolTip>
  </div>
);
