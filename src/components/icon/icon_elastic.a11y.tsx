/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiIcon } from './icon';

describe('EuiIcons', () => {
  describe('Automated accessibility check for Elastic logos', () => {
    const ElasticLogos = [
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
      'logoWorkplaceSearch',
    ];

    const ElasticGrid = () => (
      <div>
        {ElasticLogos.map((glyph) => (
          <EuiIcon className="eui-alignMiddle" type={glyph} />
        ))}
      </div>
    );

    it('has zero violations on first render', () => {
      cy.mount(<ElasticGrid />);
      cy.get('div[data-cy-root]')
        .find('svg', { timeout: 5000 })
        .should('have.length', 19);
      cy.checkAxe();
    });
  });
});
