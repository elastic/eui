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

import React, { useState } from 'react';
import { EuiCheckboxGroup, EuiCheckboxGroupProps } from './checkbox_group';

const CheckBoxGroup = () => {
  const checkboxGroupItemId__1 = 'cy-group-id-1';
  const checkboxGroupItemId__2 = 'cy-group-id-2';
  const checkboxGroupItemId__3 = 'cy-group-id-3';
  const checkboxGroupItemId__4 = 'cy-group-id-4';

  const checkboxes: EuiCheckboxGroupProps['options'] = [
    {
      id: checkboxGroupItemId__1,
      label: 'Option one',
      'data-test-subj': 'cy-checkbox-1',
    },
    {
      id: checkboxGroupItemId__2,
      label: 'Option two is checked by default',
      className: 'classNameTest',
      'data-test-subj': 'cy-checkbox-2',
    },
    {
      id: checkboxGroupItemId__3,
      label: 'Option three is disabled',
      'data-test-subj': 'cy-checkbox-3',
      disabled: true,
    },
    {
      id: checkboxGroupItemId__4,
      label: 'Option four',
      'data-test-subj': 'cy-checkbox-4',
    },
  ];
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState<
    EuiCheckboxGroupProps['idToSelectedMap']
  >({
    [checkboxGroupItemId__2]: true,
  });

  const onChange: EuiCheckboxGroupProps['onChange'] = (optionId) => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };

  return (
    <EuiCheckboxGroup
      options={checkboxes}
      idToSelectedMap={checkboxIdToSelectedMap}
      onChange={(id) => onChange(id)}
    />
  );
};

describe('EuiCheckBoxGroup', () => {
  beforeEach(() => {
    cy.realMount(<CheckBoxGroup />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when rendered', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('has zero violations after traversing checkboxes', () => {
      cy.realPress('Tab');
      cy.get('[data-test-subj="cy-checkbox-1"]').should('have.focus');
      cy.realPress('Space');
      cy.get('[data-test-subj="cy-checkbox-1"]').should('be.checked');
      cy.realPress('Tab');
      cy.get('[data-test-subj="cy-checkbox-2"]').should('have.focus');
      cy.realPress('Space');
      cy.get('[data-test-subj="cy-checkbox-2"]').should('not.be.checked');
      cy.realPress('Tab');
      cy.get('[data-test-subj="cy-checkbox-4"]').should('have.focus');
      cy.checkAxe();
    });
  });

  describe('Disabled checkbox accessibility', () => {
    it('affects no change after clicking the disabled checkbox', () => {
      cy.get('[data-test-subj="cy-checkbox-3"]').realClick();
      cy.get('[data-test-subj="cy-checkbox-3"]').should('not.be.checked');
      cy.checkAxe();
    });
  });
});
