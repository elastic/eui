import React, { useState } from 'react';

import {
  EuiPanel,
  EuiFormRow,
  EuiFieldNumber,
  EuiSpacer,
  EuiText,
  EuiTextTruncate,
} from '../../../../src';

export default () => {
  const [truncationOffset, setTruncationOffset] = useState(3);
  return (
    <EuiText>
      <EuiFormRow label="Truncation offset">
        <EuiFieldNumber
          compressed
          value={truncationOffset}
          onChange={(e) => setTruncationOffset(Number(e.target.value))}
          max={30}
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiPanel css={{ inlineSize: '40ch', maxInlineSize: '100%' }}>
        <EuiTextTruncate
          text="But the dog wasn’t lazy, it was just practicing mindfulness, so it had a greater sense of life-satisfaction than that fox with all its silly jumping."
          truncation="start"
          truncationOffset={truncationOffset}
        />
        <EuiTextTruncate
          text="And from the fox’s perspective, life was full of hoops to jump through, low-hanging fruit to jump for, and dead car batteries to jump-start."
          truncation="end"
          truncationOffset={truncationOffset}
        />
      </EuiPanel>
    </EuiText>
  );
};
