import React, { useState } from 'react';

import {
  EuiMarkdownEditor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '../../../../src/components';

const initialContent1 = `## 👋 Hello there!

I'm a **EuiMarkdownEditor** with:

- a \`height\` set to \`200\`
- my parent container is a flex item


### Things you should know 

When my content is very long 😅

The preview height is automatically adjusted 😉

To avoid a scrollbar 😌

### That's why I look good 😍

`;

const initialContent2 = `## 👋 Hello again!

I'm a **EuiMarkdownEditor** with:
- a \`height\` set to \`"full"\`
- my parent container is a flex item with a \`height\` set to \`600\`
`;

const initialContent3 = `## 👋 Hi!

I'm a **EuiMarkdownEditor** with:
- a \`height\` set to \`200\`
- my parent container is a flex item. 
- the \`autoExpandPreview\` is set to \`false\` 

### Things you should know 

When the content grows the preview height is not automatically adjusted. Just because the \`autoExpandPreview\` is set to \`false\` 😉 
`;

const initialContent4 = `## 👋 Hello again!

I'm just a **EuiMarkdownEditor** with:
- a \`height\` set to \`200\`
- a \`maxHeight\` set to \`300\`
`;

export default () => {
  const [value1, setValue1] = useState(initialContent1);
  const [value2, setValue2] = useState(initialContent2);
  const [value3, setValue3] = useState(initialContent3);
  const [value4, setValue4] = useState(initialContent4);

  return (
    <div className="guideDemo__highlightGrid">
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiMarkdownEditor
            aria-label="EUI markdown editor demo"
            initialViewMode="viewing"
            value={value1}
            onChange={setValue1}
            height={200}
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

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiMarkdownEditor
            aria-label="EUI markdown editor demo"
            initialViewMode="viewing"
            value={value3}
            onChange={setValue3}
            height={200}
            autoExpandPreview={false}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiMarkdownEditor
            aria-label="EUI markdown editor demo"
            initialViewMode="viewing"
            value={value4}
            onChange={setValue4}
            height={200}
            maxHeight={300}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
