import React, { useState } from 'react';

import {
  EuiMarkdownFormat,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  useColorPickerState,
  EuiColorPicker,
  EuiFormRow,
  EuiSelect,
} from '../../../../src';

const markdownContent = `# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


### Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


### Horizontal Rules

___

---

***


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b

Ordered

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b


## Task Lists

- [x] Create a new project
- [x] Give your project a name
- [ ] Add a new column

## Another Task Lists

* [x] Create a new project
* [x] Give your project a name
* [ ] Add a new column


## Code

Inline \`<Code />\` is awesome!

Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting JS

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

Syntax highlighting Java

\`\`\` java
package l2f.gameserver.model;

public abstract class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Kibana](https://user-images.githubusercontent.com/2750668/74490344-2f271800-4ec0-11ea-8614-8651cd47eab1.png)


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :cry: :laughing: :yum:
`;

export default () => {
  const sizingMethodOptions = [
    {
      value: 'em',
      text: 'em',
    },
    {
      value: 'rem',
      text: 'rem',
    },
  ];

  const percentages = ['33%', '50%', '66%', '100%', '150%', '200%'];

  const fontSizeScaleOptions = percentages.map((item) => {
    return { value: item, text: item };
  });

  const [textColor, setTextColor, textColorErrors] = useColorPickerState(
    '#343741'
  );

  const [sizingMethod, setSizingMethod] = useState(
    sizingMethodOptions[0].value
  );
  const [fontSizeScale, setFontSizeScale] = useState(
    fontSizeScaleOptions[3].value
  );

  const onChangeSizingMethod = (e) => {
    setSizingMethod(e.target.value);
  };

  const onChangeFontSizeScale = (e) => {
    setFontSizeScale(e.target.value);
  };

  return (
    <>
      <EuiFlexGroup style={{ maxWidth: 600 }}>
        <EuiFlexItem>
          <EuiFormRow
            label="Text color"
            isInvalid={!!textColorErrors}
            error={textColorErrors}>
            <EuiColorPicker
              onChange={setTextColor}
              color={textColor}
              isInvalid={!!textColorErrors}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiFormRow label="Sizing method">
            <EuiSelect
              options={sizingMethodOptions}
              value={sizingMethod}
              onChange={(e) => onChangeSizingMethod(e)}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiFormRow label="Font size">
            <EuiSelect
              options={fontSizeScaleOptions}
              value={fontSizeScale}
              onChange={(e) => onChangeFontSizeScale(e)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />
      <EuiPanel
        hasBorder={true}
        style={{
          fontSize: '16px',
        }}>
        <EuiMarkdownFormat
          sizingMethod={sizingMethod}
          style={{
            fontSize: fontSizeScale,
            color: textColor,
          }}>
          {markdownContent}
        </EuiMarkdownFormat>
      </EuiPanel>
    </>
  );
};
