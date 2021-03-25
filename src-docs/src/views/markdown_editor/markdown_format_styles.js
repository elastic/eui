import React, { useState } from 'react';

import {
  EuiMarkdownFormat,
  EuiPanel,
  EuiSelect,
  EuiSpacer,
} from '../../../../src';

const markdownContent = `## This is the first section

The first **paragraph** of copy is where readers will skim to see if they’re on the right page, and if you have anything of value to say:

* Item 1
* Item 2

___

## This is the second section

Where I can quote this :laughing:

> Blockquotes can also be nested


## Task Lists

- [x] Create a new project
- [x] Give your project a name
- [ ] Add a new column


## Code

Inline \`<Code />\` is awesome!

Block code "fences"

Syntax highlighting JS

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

`;

export default () => {
  const bgColors = [
    'subdued',
    'accent',
    'danger',
    'warning',
    'primary',
    'success',
    'plain',
    'transparent',
  ];

  const options = bgColors.map((item) => {
    return { value: item, text: item[0].toUpperCase() + item.substring(1) };
  });

  const [value, setValue] = useState(options[1].value);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <EuiSelect
        id="selectDocExample"
        options={options}
        value={value}
        onChange={(e) => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
      <EuiSpacer />
      <EuiPanel hasBorder={true} color={value}>
        <EuiMarkdownFormat>{markdownContent}</EuiMarkdownFormat>
      </EuiPanel>
    </div>
  );
};
