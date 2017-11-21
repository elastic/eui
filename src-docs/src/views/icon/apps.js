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
  'consoleApp',
  'dashboardApp',
  'devToolsApp',
  'discoverApp',
  'graphApp',
  'grokApp',
  'indexPatternApp',
  'loggingApp',
  'machineLearningApp',
  'managementApp',
  'monitoringApp',
  'pipelineApp',
  'reportingApp',
  'savedObjectsApp',
  'searchProfilerApp',
  'securityApp',
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
