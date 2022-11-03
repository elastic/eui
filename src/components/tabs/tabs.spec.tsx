/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiTabbedContent, EuiTabbedContentProps } from './tabbed_content';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';

const tabs = [
  {
    id: 'cobalt--id',
    name: 'Cobalt',
    content: (
      <>
        <EuiSpacer />
        <EuiText>
          <p>
            Cobalt is a chemical element with symbol Co and atomic number 27.
            Like nickel, cobalt is found in the Earth&rsquo;s crust only in
            chemically combined form, save for small deposits found in alloys of
            natural meteoric iron. The free element, produced by reductive
            smelting, is a hard, lustrous, silver-gray metal.
          </p>
        </EuiText>
      </>
    ),
  },
  {
    id: 'dextrose--id',
    name: 'Dextrose',
    content: (
      <>
        <EuiSpacer />
        <EuiText>
          <p>
            Intravenous sugar solution, also known as dextrose solution, is a
            mixture of dextrose (glucose) and water. It is used to treat low
            blood sugar or water loss without electrolyte loss.
          </p>
        </EuiText>
      </>
    ),
  },
  {
    id: 'hydrogen--id',
    name: 'Hydrogen',
    content: (
      <>
        <EuiSpacer />
        <EuiText>
          <p>
            Hydrogen is a chemical element with symbol H and atomic number 1.
            With a standard atomic weight of 1.008, hydrogen is the lightest
            element on the periodic table
          </p>
        </EuiText>
      </>
    ),
  },
  {
    id: 'monosodium_glutammate--id',
    name: 'Monosodium Glutamate',
    content: (
      <>
        <EuiSpacer />
        <EuiText>
          <p>
            Monosodium glutamate (MSG, also known as sodium glutamate) is the
            sodium salt of glutamic acid, one of the most abundant naturally
            occurring non-essential amino acids. Monosodium glutamate is found
            naturally in tomatoes, cheese and other foods.
          </p>
        </EuiText>
      </>
    ),
  },
];

const TabbedContent = () => {
  const tabProps: EuiTabbedContentProps = {
    tabs: tabs,
    initialSelectedTab: tabs[1],
    autoFocus: 'selected',
    onTabClick: () => {},
  };

  return <EuiTabbedContent {...tabProps} />;
};

describe('EuiTabs', () => {
  describe('Basic functionality', () => {
    it('renders with required props', () => {
      cy.mount(<TabbedContent />);
      cy.get('div.euiTabs').should('exist');
      cy.checkAxe();
    });

    it('renders tabbed content on click', () => {
      cy.mount(<TabbedContent />);
      cy.get('button[role="tab"]').first().realClick();
      cy.get('div[role="tabpanel"]').first().should('exist');
      cy.get('div[role="tabpanel"]').should('have.length', 1);
    });

    it('handles keypress events', () => {
      cy.realMount(<TabbedContent />);
      cy.realPress('Tab');
      cy.realPress(['Shift', 'Tab']);
      cy.realPress('Enter');
      cy.get('div[role="tabpanel"]').first().should('exist');
      cy.get('div[role="tabpanel"]').should('have.length', 1);
      cy.focused().should('have.text', 'Cobalt');
      cy.repeatRealPress('Tab', 3);
      cy.focused().should('have.text', 'Monosodium Glutamate');
      cy.realPress('Enter');
      cy.get('div[role="tabpanel"]').last().should('exist');
      cy.get('div[role="tabpanel"]').should('have.length', 1);
    });
  });
});
