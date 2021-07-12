import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiCopy,
} from '../../../../src/components';

const iconTypes = [
  'editorAlignCenter',
  'editorAlignLeft',
  'editorAlignRight',
  'editorBold',
  'editorCodeBlock',
  'editorComment',
  'editorDistributeHorizontal',
  'editorDistributeVertical',
  'editorHeading',
  'editorItalic',
  'editorItemAlignBottom',
  'editorItemAlignCenter',
  'editorItemAlignLeft',
  'editorItemAlignMiddle',
  'editorItemAlignRight',
  'editorItemAlignTop',
  'editorLink',
  'editorOrderedList',
  'editorPositionBottomLeft',
  'editorPositionBottomRight',
  'editorPositionTopLeft',
  'editorPositionTopRight',
  'editorRedo',
  'editorStrike',
  'editorTable',
  'editorUnderline',
  'editorUndo',
  'editorUnorderedList',
];

export default () => (
  <EuiFlexGrid direction="column" columns={3}>
    {iconTypes.map((iconType) => (
      <EuiFlexItem key={iconType}>
        <EuiCopy
          display="block"
          textToCopy={iconType}
          afterMessage={`${iconType} copied`}>
          {(copy) => (
            <EuiPanel
              hasShadow={false}
              hasBorder={false}
              onClick={copy}
              paddingSize="s">
              <EuiIcon className="eui-alignMiddle" type={iconType} /> &emsp;{' '}
              <small>{iconType}</small>
            </EuiPanel>
          )}
        </EuiCopy>
      </EuiFlexItem>
    ))}
  </EuiFlexGrid>
);
