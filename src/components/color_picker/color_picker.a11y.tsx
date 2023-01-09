/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiColorPicker } from './color_picker';
import { EuiFormRow } from '../form';
import { useColorPickerState } from '../../services';

const ColorPicker = () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');
  return (
    <EuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
      <EuiColorPicker onChange={setColor} color={color} isInvalid={!!errors} />
    </EuiFormRow>
  );
};

beforeEach(() => {
  cy.realMount(<ColorPicker />);
});

describe('EuiColorPicker', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on render', () => {
      cy.checkAxe();
    });

    it('has zero violations when the picker is opened', () => {
      cy.get('input[data-test-subj="euiColorPickerAnchor"]').realClick();
      cy.get('div[data-test-subj="euiColorPickerPopover"]').should('exist');
      cy.checkAxe();
      cy.realPress('Escape');
      cy.get('div[data-test-subj="euiColorPickerPopover"]').should('not.exist');
      cy.checkAxe();
    });

    it('has zero violations after keyboard interaction', () => {
      cy.realPress('Tab');
      cy.get('input[data-test-subj="euiColorPickerAnchor"]').should(
        'have.focus'
      );
      cy.realPress('Enter');
      cy.repeatRealPress('ArrowDown', 5);
      cy.repeatRealPress('ArrowRight', 3);
      cy.realPress('Escape');
      cy.get('input[data-test-subj="euiColorPickerAnchor"]').should(
        'have.focus'
      );
      cy.get('input[data-test-subj="euiColorPickerAnchor"]').should(
        'have.attr',
        'value',
        '#C9557B'
      );
      cy.checkAxe();
    });
  });
});
