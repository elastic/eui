import React, { useState } from 'react';
import {
  EuiLink,
  EuiSwitch,
  EuiTextColor,
  EuiHorizontalRule,
  EuiText,
} from '../../../../src/components';

export const LinkDisable = () => {
  const [disableLink, setDisableLink] = useState(true);

  return (
    <EuiText>
      <EuiSwitch
        compressed
        label="Disable links"
        checked={disableLink}
        onChange={() => setDisableLink(!disableLink)}
      />
      <EuiHorizontalRule margin="m" />
      <p>
        This{' '}
        <EuiLink color="accent" disabled={disableLink} onClick={() => {}}>
          paragraph
        </EuiLink>{' '}
        has two{disableLink ? ' disabled ' : ' enabled '}
        <EuiLink color="warning" disabled={disableLink} onClick={() => {}}>
          links
        </EuiLink>{' '}
        in it.
      </p>
      <p>
        <EuiTextColor color="accent">
          When links are disabled, they inherit the{' '}
          <EuiLink color="success" disabled={disableLink} onClick={() => {}}>
            color
          </EuiLink>{' '}
          of surrounding text.
        </EuiTextColor>
      </p>
    </EuiText>
  );
};
