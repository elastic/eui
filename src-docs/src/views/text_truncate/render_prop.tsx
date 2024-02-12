import React, { useState } from 'react';

import {
  EuiText,
  EuiFormRow,
  EuiFieldText,
  EuiSpacer,
  EuiPanel,
  EuiHighlight,
  EuiMark,
  EuiTextTruncate,
} from '../../../../src';

const text =
  "But the dog wasn't lazy, it was just practicing mindfulness, so it had a greater sense of life-satisfaction than that fox with all its silly jumping.";

export default () => {
  const [highlight, setHighlight] = useState('');
  const highlightStartPosition = text
    .toLowerCase()
    .indexOf(highlight.toLowerCase());
  const highlightCenterPosition =
    highlightStartPosition + Math.floor(highlight.length / 2);

  return (
    <EuiText>
      <EuiFormRow label="Type to highlight text">
        <EuiFieldText
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
          placeholder={
            'For example, try typing "lazy", "mindful", "life", or "silly"'
          }
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiPanel css={{ inlineSize: '40ch', maxInlineSize: '100%' }}>
        <EuiTextTruncate
          text={text}
          truncation="startEnd"
          truncationPosition={highlightCenterPosition}
        >
          {(truncatedText) => (
            <>
              {truncatedText.length > highlight.length ? (
                <EuiHighlight search={highlight}>{truncatedText}</EuiHighlight>
              ) : (
                // Highlight everything if the search match is greater than the visible text
                <EuiMark>{truncatedText}</EuiMark>
              )}
            </>
          )}
        </EuiTextTruncate>
      </EuiPanel>
    </EuiText>
  );
};
