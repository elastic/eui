import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiCopy,
  EuiCodeBlock,
  EuiSpacer,
} from '../../../../src/components';

const iconTypes = [
  'addDataApp',
  'advancedSettingsApp',
  'agentApp',
  'apmApp',
  'appSearchApp',
  'auditbeatApp',
  'canvasApp',
  'codeApp',
  'consoleApp',
  'crossClusterReplicationApp',
  'dashboardApp',
  'devToolsApp',
  'discoverApp',
  'emsApp',
  'filebeatApp',
  'fleetApp',
  'gisApp',
  'graphApp',
  'grokApp',
  'heartbeatApp',
  'indexManagementApp',
  'indexPatternApp',
  'indexRollupApp',
  'lensApp',
  'logsApp',
  'machineLearningApp',
  'managementApp',
  'metricbeatApp',
  'metricsApp',
  'monitoringApp',
  'notebookApp',
  'packetbeatApp',
  'pipelineApp',
  'recentlyViewedApp',
  'reportingApp',
  'savedObjectsApp',
  'searchProfilerApp',
  'securityAnalyticsApp',
  'securityApp',
  'spacesApp',
  'sqlApp',
  'timelionApp',
  'upgradeAssistantApp',
  'uptimeApp',
  'usersRolesApp',
  'visualizeApp',
  'watchesApp',
  'workplaceSearchApp',
];

export default () => (
  <>
    <EuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<EuiIcon type="addDataApp" size="xl" />'}
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
