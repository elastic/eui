import React, { useState } from 'react';

import {
  EuiMarkdownEditor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '../../../../src/components';

const initialContent1 = `## Hello world!

I'm a **EuiMarkdownEditor** with a \`height\` set to \`400\`. My parent container is a flex item with a height set to \`600\`.
`;

const initialContent2 = `## Hello world!

I'm a **EuiMarkdownEditor** with a \`height\` set to \`"full"\`. My parent container is a flex item with a \`height\` set to \`600\`.
`;

const initialContent3 = `## Hello world!

I'm a **EuiMarkdownEditor** with a \`height\` set to \`"full"\`. My parent container is a div with a \`height\` set to \`600\`.
`;

export default () => {
  const [value1, setValue1] = useState(initialContent1);
  const [value2, setValue2] = useState(initialContent2);
  const [value3, setValue3] = useState(initialContent3);

  return (
    <div className="guideDemo__highlightGrid">
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiMarkdownEditor
            aria-label="EUI markdown editor demo"
            initialViewMode="viewing"
            value={value1}
            onChange={setValue1}
            height={400}
            maxHeight={440}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ height: '600px' }}>
          <EuiMarkdownEditor
            aria-label="EUI markdown editor demo"
            initialViewMode="viewing"
            value={value2}
            onChange={setValue2}
            height="full"
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <div style={{ height: '600px', background: 'aliceblue' }}>
        <EuiMarkdownEditor
          aria-label="EUI markdown editor demo"
          initialViewMode="viewing"
          value={value3}
          onChange={setValue3}
          height="full"
        />
      </div>
    </div>
  );
};
