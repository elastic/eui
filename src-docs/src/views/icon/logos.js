import React, { useState } from 'react';
import classNames from 'classnames';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiCodeBlock,
  EuiSpacer,
  EuiCopy,
  EuiSplitPanel,
  EuiButtonGroup,
} from '../../../../src/components';

export const iconTypes = [
  'logoElastic',
  'logoElasticStack',
  'logoElasticsearch',
  'logoAppSearch',
  'logoBeats',
  'logoBusinessAnalytics',
  'logoCloud',
  'logoCloudEnterprise',
  'logoEnterpriseSearch',
  'logoKibana',
  'logoLogging',
  'logoLogstash',
  'logoMaps',
  'logoMetrics',
  'logoObservability',
  'logoSecurity',
  'logoSiteSearch',
  'logoUptime',
  'logoVulnerabilityManagement',
  'logoWorkplaceSearch',
];

export const allowedColors = ['multi', 'ghost', 'text'];

export default () => {
  const [showGhost, setShowGhost] = useState(false);
  const [iconColor, setIconColor] = useState(allowedColors[0]);
  const panelClasses = classNames({
    guideDemo__ghostBackground: showGhost,
  });

  return (
    <EuiSplitPanel.Outer hasBorder>
      <EuiSplitPanel.Inner color="subdued">
        <EuiButtonGroup
          legend="Logo color"
          name="logoColor"
          idSelected={iconColor}
          onChange={(optionId) => {
            setIconColor(optionId);
            setShowGhost(optionId === 'ghost');
          }}
          options={allowedColors.map((color) => {
            return {
              id: color,
              label: color,
            };
          })}
        />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner color="transparent" className={panelClasses}>
        <EuiCodeBlock language="html" isCopyable paddingSize="m">
          {iconColor === 'multi'
            ? '<EuiIcon type="logoElasticsearch" size="xl" />'
            : `<EuiIcon type="logoElasticsearch" size="xl" color="${iconColor}" />`}
        </EuiCodeBlock>
        <EuiSpacer />
        <EuiFlexGrid direction="column" columns={3}>
          {iconTypes.map((iconType) => (
            <EuiFlexItem key={iconType}>
              <EuiCopy
                display="block"
                textToCopy={iconType}
                afterMessage={`${iconType} copied`}
              >
                {(copy) => (
                  <EuiPanel
                    hasShadow={false}
                    hasBorder={false}
                    onClick={copy}
                    paddingSize="s"
                    className={panelClasses}
                  >
                    <EuiIcon
                      className="eui-alignMiddle"
                      type={iconType}
                      size="xl"
                      color={iconColor === 'multi' ? undefined : iconColor}
                    />{' '}
                    &emsp; <small>{iconType}</small>
                  </EuiPanel>
                )}
              </EuiCopy>
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};
