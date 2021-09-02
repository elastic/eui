import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiCodeBlock,
  EuiSpacer,
  EuiCopy,
} from '../../../../src/components';

const iconSizes = ['s', 'm', 'l', 'xl', 'xxl', 'original'];
const iconSizesText = [
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'original',
];

export default () => (
  <>
    <EuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<EuiIcon type="logoElasticsearch" size="xl" />'}
    </EuiCodeBlock>
    <EuiSpacer />
    <EuiFlexGrid direction="column" columns={3}>
      {iconSizes.map((iconSize, index) => (
        <EuiFlexItem key={iconSize}>
          <EuiCopy
            display="block"
            textToCopy={iconSize}
            afterMessage={`${iconSize} copied`}
          >
            {(copy) => (
              <EuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                paddingSize="s"
              >
                <EuiIcon type="logoElasticStack" size={iconSize} /> &emsp;{' '}
                {iconSizesText[index]}
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  </>
);
