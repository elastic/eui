/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import {
  EuiTabbedContent,
  EuiTabbedContentProps,
  EuiTabbedContentTab,
} from './tabbed_content';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';

const tabs: EuiTabbedContentTab[] = [
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

const defaultTabProps: EuiTabbedContentProps = {
  tabs: tabs,
  initialSelectedTab: tabs[0],
  autoFocus: 'selected',
  onTabClick: () => {},
};

describe('EuiTabs', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations with default props', () => {
      cy.mount(<EuiTabbedContent {...defaultTabProps} />);
      cy.get('div.euiTabs').should('exist');
      cy.checkAxe();
    });

    it('has zero violations with second tab open on render', () => {
      const secondSelectedTab = {
        ...defaultTabProps,
        initialSelectedTab: tabs[1],
      };

      cy.mount(<EuiTabbedContent {...secondSelectedTab} />);
      cy.get('div.euiTabs').should('exist');
      cy.checkAxe();
    });

    it('has zero violations with third tab open on render', () => {
      const thirdSelectedTab = {
        ...defaultTabProps,
        initialSelectedTab: tabs[2],
      };

      cy.mount(<EuiTabbedContent {...thirdSelectedTab} />);
      cy.get('div.euiTabs').should('exist');
      cy.checkAxe();
    });

    it('has zero violations with last tab open on render', () => {
      const lastSelectedTab = {
        ...defaultTabProps,
        initialSelectedTab: tabs[3],
      };

      cy.mount(<EuiTabbedContent {...lastSelectedTab} />);
      cy.get('div.euiTabs').should('exist');
      cy.checkAxe();
    });

    it('has zero violations with all tabs disabled except first', () => {
      const disabledTabs = tabs.map((tab, i) => {
        if (i === 0) {
          return tab;
        }
        return { ...tab, disabled: true };
      });
      const disabledTabProps = {
        ...defaultTabProps,
        tabs: disabledTabs,
      };
      cy.mount(<EuiTabbedContent {...disabledTabProps} />);
      cy.get('div.euiTabs').should('exist');
      cy.checkAxe();
    });
  });
});
