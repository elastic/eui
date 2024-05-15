/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../../cypress/support" />

import React from 'react';
import { EuiSelectableTemplateSitewide } from './selectable_template_sitewide';

describe('SelectableTemplateSitewide', () => {
  beforeEach(() => {
    cy.viewport(500, 300);
  });
  const props = {
    options: [
      {
        label: 'Basic data application',
        avatar: {
          name: 'Default Space',
        },
        meta: [
          {
            text: 'Application',
            type: 'application',
          },
        ],
        url: 'welcome-dashboards',
        'data-test-subj': 'test-this',
      },
      {
        label: 'Platform with deployment highlighted',
        icon: {
          type: 'user',
        },
        meta: [
          {
            text: 'Account',
            type: 'platform',
          },
          {
            text: 'personal-databoard',
            type: 'deployment',
            highlightSearchString: true,
          },
        ],
      },
      {
        label: 'Other metas',
        searchableLabel: 'Totally custom with pink metadata',
        icon: {
          type: 'warning',
          color: 'accent',
        },
        meta: [
          {
            text: 'Meta 1',
            type: 'meta',
          },
          {
            text: 'Meta 2',
            type: 'meta',
          },
        ],
      },
    ],
  };

  it('uses a custom no match message if provided', () => {
    cy.realMount(
      <EuiSelectableTemplateSitewide
        options={props.options}
        noMatchesMessage={<span>THIS IS A CUSTOM MESSAGE</span>}
      />
    );
    cy.get('[data-test-subj="nav-search-input"]').realClick();
    cy.realType('adsdfadvs');
    cy.wait(500); // need the popover to generate the message
    cy.get('[data-test-subj="nav-search-popover"]').contains(
      'THIS IS A CUSTOM MESSAGE'
    );
  });
});
