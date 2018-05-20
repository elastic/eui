import React from 'react';

import {
  EuiIcon,
  EuiTooltip,
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
        <EuiTooltip
          position="top"
          content="Here is some tooltip text"
        >
          <EuiLink href="#">top</EuiLink>
        </EuiTooltip>
      </p>

      <p>
        This tooltip appears on the{' '}
        <EuiTooltip
          position="left"
          title="Tooltip titles are optional"
          content="Here is some tooltip text. Lets add some more content to see how it wraps."
        >
          <EuiLink href="#">left</EuiLink>
        </EuiTooltip>
        {' '} and includes the optional title.
      </p>

      <p>
        This tooltip appears on the{' '}
        <EuiTooltip
          position="right"
          content="Here is some tooltip text"
        >
          <EuiLink href="#">right</EuiLink>
        </EuiTooltip>
      </p>

      <p>
        This tooltip appears on the bottom of this icon:{' '}
        <EuiTooltip
          position="bottom"
          content="Here is some tooltip text"
        >
          <EuiIcon tabIndex="0" type="alert" title="Icon with tooltip" />
        </EuiTooltip>
      </p>
    </EuiText>

    <EuiSpacer />

    <EuiTooltip position="right" content="Works on anything">
      <EuiFieldText placeholder="Hover over me" />
    </EuiTooltip>

    <EuiSpacer />

    <EuiTooltip position="top" content={<p>Works on any kind of element &mdash; buttons, inputs, you name it!</p>}>
      <EuiButton onClick={() => alert('Buttons are still clickable within tooltips.')}>Hover me</EuiButton>
    </EuiTooltip>
  </div>
);
