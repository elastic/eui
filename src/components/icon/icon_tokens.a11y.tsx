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
  describe('Automated accessibility check for token icons', () => {
    const TokenIcons = [
      'tokenAlias',
      'tokenAnnotation',
      'tokenArray',
      'tokenBinary',
      'tokenBoolean',
      'tokenClass',
      'tokenCompletionSuggester',
      'tokenConstant',
      'tokenDate',
      'tokenDenseVector',
      'tokenElement',
      'tokenEnum',
      'tokenEnumMember',
      'tokenEvent',
      'tokenException',
      'tokenField',
      'tokenFile',
      'tokenFlattened',
      'tokenFunction',
      'tokenGeo',
      'tokenHistogram',
      'tokenInterface',
      'tokenIP',
      'tokenJoin',
      'tokenKey',
      'tokenKeyword',
      'tokenMethod',
      'tokenMetricCounter',
      'tokenMetricGauge',
      'tokenModule',
      'tokenNamespace',
      'tokenNested',
      'tokenNull',
      'tokenNumber',
      'tokenObject',
      'tokenOperator',
      'tokenPackage',
      'tokenParameter',
      'tokenPercolator',
      'tokenProperty',
      'tokenRange',
      'tokenRankFeature',
      'tokenRankFeatures',
      'tokenRepo',
      'tokenSearchType',
      'tokenShape',
      'tokenString',
      'tokenStruct',
      'tokenSymbol',
      'tokenTag',
      'tokenText',
      'tokenTokenCount',
      'tokenVariable',
    ];

    const TokenGrid = () => (
      <div>
        {TokenIcons.map((glyph) => (
          <EuiIcon className="eui-alignMiddle" type={glyph} />
        ))}
      </div>
    );

    it('has zero violations on first render', () => {
      cy.mount(<TokenGrid />);
      cy.get('div[data-cy-root]')
        .find('svg', { timeout: 5000 })
        .should('have.length', 53);
      cy.checkAxe();
    });
  });
});
