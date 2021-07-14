import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiCodeBlock,
  EuiCopy,
  EuiSpacer,
} from '../../../../src/components';

const iconTypes = [
  'dataVisualizer',
  'createAdvancedJob',
  'classificationJob',
  'createMultiMetricJob',
  'outlierDetectionJob',
  'createPopulationJob',
  'regressionJob',
  'createSingleMetricJob',
];

export default () => (
  <>
    <EuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<EuiIcon type="dataVisualizer" size="xl" />'}
    </EuiCodeBlock>
    <EuiSpacer />
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
                <EuiIcon
                  className="eui-alignMiddle"
                  type={iconType}
                  size="xl"
                />{' '}
                &emsp; <small>{iconType}</small>
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  </>
);
