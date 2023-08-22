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
  const [truncationPosition, setTruncationPosition] = useState(45);
  return (
    <EuiText>
      <EuiFormRow label="Truncation position">
        <EuiFieldNumber
          compressed
          value={truncationPosition}
          onChange={(e) => setTruncationPosition(Number(e.target.value))}
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiPanel css={{ inlineSize: '40ch', maxInlineSize: '100%' }}>
        <EuiTextTruncate
          text="But the dog wasn’t lazy, it was just practicing mindfulness, so it had a greater sense of life-satisfaction than that fox with all its silly jumping."
          truncation="startEnd"
          truncationPosition={truncationPosition}
        />
      </EuiPanel>
    </EuiText>
  );
};
