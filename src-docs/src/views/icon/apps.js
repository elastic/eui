import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
  EuiCopy,
} from '../../../../src/components';

const iconTypes = [
  'addDataApp',
  'advancedSettingsApp',
  'apmApp',
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
  'gisApp',
  'graphApp',
  'grokApp',
  'heartbeatApp',
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
  'uptimeApp',
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
          <EuiCopy
            textToCopy={iconType}
            afterMessage={`${iconType} copied`}
          >
            {(copy) => (
              <EuiPanel
                onClick={copy}
                className="eui-textCenter"
              >
                <EuiIcon
                  type={iconType}
                  size="xl"
                />
                <EuiText size="s">
                  <p>{iconType}</p>
                </EuiText>
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))
    }
  </EuiFlexGrid>
);
