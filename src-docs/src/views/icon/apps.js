import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
} from '../../../../src/components';

const iconTypes = [
  'addDataApp',
  'advancedSettingsApp',
  'apmApp',
  'auditBeatApp',
  'canvasApp',
  'consoleApp',
  'crossClusterReplicationApp',
  'dashboardApp',
  'devToolsApp',
  'discoverApp',
  'emsApp',
  'filebeatApp',
  'gisApp',
  'graphApp',
  'grokApp',
  'heartBeatApp',
  'indexManagementApp',
  'indexPatternApp',
  'indexRollupApp',
  'infraApp',
  'loggingApp',
  'machineLearningApp',
  'managementApp',
  'metricbeatApp',
  'monitoringApp',
  'notebookApp',
  'packetbeatApp',
  'pipelineApp',
  'reportingApp',
  'savedObjectsApp',
  'searchProfilerApp',
  'securityAnalyticsApp',
  'securityApp',
  'spacesApp',
  'sqlApp',
  'timelionApp',
  'upgradeAssistantApp',
  'usersRolesApp',
  'visualizeApp',
  'watchesApp',
];

export default () => (
  <EuiFlexGrid columns={4}>
    {
      iconTypes.map(iconType => (
        <EuiFlexItem
          className="guideDemo__icon"
          key={iconType}
          style={{ width: '200px' }}
        >
          <EuiPanel>
            <EuiIcon
              type={iconType}
              size="xl"
            />
            <EuiText size="s">
              <p>{iconType}</p>
            </EuiText>
          </EuiPanel>
        </EuiFlexItem>
      ))
    }
  </EuiFlexGrid>
);
