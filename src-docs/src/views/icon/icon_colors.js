import React from 'react';

import classNames from 'classnames';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiSpacer,
  EuiCodeBlock,
  EuiCopy,
} from '../../../../src/components';

const iconColors = [
  'default',
  'inherit',
  'primary',
  'success',
  'accent',
  'warning',
  'danger',
  'text',
  'subdued',
  'ghost',
  '#DA8B45',
  '#DDDDDD',
];

export default () => (
  <>
    <EuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<EuiIcon type="brush" color="primary" />'}
    </EuiCodeBlock>
    <EuiSpacer />
    <EuiFlexGrid direction="column" columns={3}>
      {iconColors.map((iconColor) => (
        <EuiFlexItem key={iconColor}>
          <EuiCopy display="block" textToCopy={`color="${iconColor}"`}>
            {(copy) => (
              <EuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                className={classNames({
                  guideDemo__ghostBackground: iconColor === 'ghost',
                })}
                paddingSize="s">
                <EuiIcon type="brush" color={iconColor} />
                &emsp; <small>{iconColor}</small>
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  </>
);
