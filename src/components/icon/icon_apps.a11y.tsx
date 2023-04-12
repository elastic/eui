/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../cypress/support" />

import React from 'react';
import { EuiIcon } from './icon';

describe('EuiIcons', () => {
  describe('Automated accessibility check for app icons', () => {
    const AppIcons = [
      'addDataApp',
      'advancedSettingsApp',
      'agentApp',
      'apmApp',
      'appSearchApp',
      'auditbeatApp',
      'canvasApp',
      'casesApp',
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

    const AppGrid = () => (
      <div>
        {AppIcons.map((glyph) => (
          <EuiIcon className="eui-alignMiddle" type={glyph} />
        ))}
      </div>
    );

    it('has zero violations on first render', () => {
      cy.mount(<AppGrid />);
      cy.get('div[data-cy-root]')
        .find('svg', { timeout: 5000 })
        .should('have.length', 49);
      cy.checkAxe();
    });
  });
});
