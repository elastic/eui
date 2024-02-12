import React from 'react';

import { EuiPanel, EuiText, EuiTextTruncate } from '../../../../src';

export default () => {
  return (
    <EuiText>
      <EuiPanel css={{ inlineSize: '40ch', maxInlineSize: '100%' }}>
        <EuiTextTruncate
          text="Opinions differ as to how to render ellipses in printed material. According to The Chicago Manual of Style, it should consist of three periods, each separated from its neighbor by a non-breaking space. According to the AP Stylebook, the periods should be rendered with no space between them."
          ellipsis=". . ."
        />
        <EuiTextTruncate
          text="In some legal writing, an ellipsis is written as three asterisks, to make it obvious that text has been omitted or to signal that the omitted text extends beyond the end of the paragraph."
          ellipsis=" ***"
        />
        <EuiTextTruncate
          text="Brackets are often used to indicate that a quotation has been condensed for space, brevity or relevance."
          truncation="middle"
          ellipsis="[...]"
        />
      </EuiPanel>
    </EuiText>
  );
};
