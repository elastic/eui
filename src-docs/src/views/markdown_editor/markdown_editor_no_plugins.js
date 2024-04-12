import React, { useState, useMemo } from 'react';

import {
  EuiMarkdownEditor,
  getDefaultEuiMarkdownPlugins,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
} from '../../../../src/components';

const initialContent = `
### tooltip

When disabled, the button in the toolbar and the help syntax won't be displayed, and the following syntax will no longer works.

!{tooltip[anchor text](Tooltip content)}

### checkbox

When disabled, a EuiCheckbox will no longer render.

- [ ] TODO: Disable some default plugins

### emoji

When disabled, text will render instead of an emoji.

:smile:

### linkValidator

When disabled, all links will render as links instead of as text.

[This is a sus link](file://)

### lineBreaks

When disabled, these sentence will be in the same line.
When enabled, these sentences will be separated by a line break.

Two blank lines in a row will create a new paragraph as usual.
`;

export default () => {
  const [value, setValue] = useState(initialContent);

  const [tooltip, excludeTooltips] = useState(false);
  const [checkbox, excludeCheckboxes] = useState(true);
  const [emoji, excludeEmojis] = useState(true);
  const [linkValidator, excludeLinkValidator] = useState(true);
  const [lineBreaks, excludeLineBreaks] = useState(false);

  const { parsingPlugins, processingPlugins, uiPlugins } = useMemo(() => {
    const excludedPlugins = [];
    if (!tooltip) excludedPlugins.push('tooltip');
    if (!checkbox) excludedPlugins.push('checkbox');
    if (!emoji) excludedPlugins.push('emoji');
    if (!linkValidator) excludedPlugins.push('linkValidator');
    if (!lineBreaks) excludedPlugins.push('lineBreaks');

    return getDefaultEuiMarkdownPlugins({
      exclude: excludedPlugins,
    });
  }, [tooltip, checkbox, emoji, linkValidator, lineBreaks]);

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={false} css={{ gap: 20 }}>
          <EuiSwitch
            label="tooltip"
            checked={tooltip}
            onChange={() => excludeTooltips(!tooltip)}
          />
          <EuiSwitch
            label="checkbox"
            checked={checkbox}
            onChange={() => excludeCheckboxes(!checkbox)}
          />
          <EuiSwitch
            label="emoji"
            checked={emoji}
            onChange={() => excludeEmojis(!emoji)}
          />
          <EuiSwitch
            label="linkValidator"
            checked={linkValidator}
            onChange={() => excludeLinkValidator(!linkValidator)}
          />
          <EuiSwitch
            label="lineBreaks"
            checked={lineBreaks}
            onChange={() => excludeLineBreaks(!lineBreaks)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiMarkdownEditor
            aria-label="Demo with excluded default plugins"
            value={value}
            onChange={setValue}
            parsingPluginList={parsingPlugins}
            processingPluginList={processingPlugins}
            uiPlugins={uiPlugins}
            initialViewMode="viewing"
            autoExpandPreview={false}
            height={400}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
