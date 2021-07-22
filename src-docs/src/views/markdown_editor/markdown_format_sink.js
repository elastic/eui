import React, { useState } from 'react';
import classNames from 'classnames';
import {
  EuiMarkdownFormat,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiFormRow,
  EuiSelect,
  EuiRange,
  EuiColorPicker,
  useColorPickerState,
  EuiButton,
  EuiPopover,
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
  const textSizeArray = ['xs', 's', 'm', 'relative'];

  const textSizeOptions = textSizeArray.map((name) => {
    return {
      value: name,
      text: name,
    };
  });

  const textColorsArray = [
    'default',
    'subdued',
    'success',
    'accent',
    'danger',
    'warning',
    'ghost',
    'inherit',
    'custom',
  ];

  const textColorsOptions = textColorsArray.map((name) => {
    return {
      value: name,
      text: name,
    };
  });

  const [textSize, setTextSize] = useState(textSizeOptions[2].value);
  const [fontSizeScale, setFontSizeScale] = useState(16);
  const [textColor, setTextColor] = useState(textColorsOptions[0].value);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onChangeTextSize = (e) => {
    setTextSize(e.target.value);
  };

  const onChangeFontSizeScale = (e) => {
    console.log(fontSizeScale);
    setFontSizeScale(e.target.value);
  };

  const onChangeTextColor = (e) => {
    setTextColor(e.target.value);
  };

  const panelClasses = classNames({
    guideDemo__ghostBackground: textColor === 'ghost',
  });

  const [color, setColor, colorErrors] = useColorPickerState('#c561dc');

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButton onClick={onButtonClick} iconType="controlsVertical" size="s">
      Customize props
    </EuiButton>
  );

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiPopover
            panelStyle={{ minWidth: 380 }}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}>
            <EuiFormRow label="Color">
              <EuiSelect
                options={textColorsOptions}
                value={textColor}
                onChange={(e) => onChangeTextColor(e)}
              />
            </EuiFormRow>

            <EuiFormRow
              label="Custom color"
              isInvalid={!!colorErrors}
              error={colorErrors}>
              <EuiColorPicker
                onChange={setColor}
                color={color}
                isInvalid={!!colorErrors}
                disabled={textColor !== 'custom'}
              />
            </EuiFormRow>

            <EuiFormRow label="Text size">
              <EuiSelect
                options={textSizeOptions}
                value={textSize}
                onChange={(e) => onChangeTextSize(e)}
              />
            </EuiFormRow>

            <EuiFormRow label="Relative text size">
              <EuiRange
                min={12}
                max={24}
                value={fontSizeScale}
                onChange={onChangeFontSizeScale}
                showValue
                showLabels
                disabled={textSize !== 'relative'}
              />
            </EuiFormRow>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="s" />

      <EuiPanel hasBorder={false} hasShadow={false} className={panelClasses}>
        <EuiMarkdownFormat
          textSize={textSize}
          color={textColor === 'custom' ? color : textColor}
          style={{
            fontSize: textSize === 'relative' && `${fontSizeScale}px`,
          }}>
          {markdownContent}
        </EuiMarkdownFormat>
      </EuiPanel>
    </>
  );
};
