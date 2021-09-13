import React from 'react';

import { EuiMarkdownFormat } from '../../../../src';

const markdownContent = `Beyond Remark's base syntax, **EuiMarkdownFormat** bundles these abilities by default:

\`:smile:\` we support emojis :smile:! But not :)

\`!{tooltip[anchor text](Tooltip content)}\` syntax can render !{tooltip[tooltips like this](I am Jack's helpful tooltip content)}

We also support checkboxes so that

\`\`\`
- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty
\`\`\`

turns into

- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty

Note that you'll need to use *EuiMarkdownEditor* to make those checkboxes dynamic.
`;

export default () => {
  return <EuiMarkdownFormat>{markdownContent}</EuiMarkdownFormat>;
};
