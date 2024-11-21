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

import React, { useState } from 'react';
import { EuiTabbedContent, EuiTabbedContentProps } from './tabbed_content';
import { EuiButton } from '../button';
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

const tabsSecond = [
  {
    id: 'apple',
    name: 'Apple',
    content: <p>Apple</p>,
  },
  {
    id: 'banana',
    name: 'Banana',
    content: <p>Banana</p>,
  },
  {
    id: 'pear',
    name: 'Pear',
    content: <p>Pear</p>,
    disabled: true,
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

const DynamicTabbedContent = () => {
  const [items, setItems] = useState(tabs);

  return (
    <>
      <EuiButton onClick={() => setItems(tabsSecond)}>Change tabs</EuiButton>
      <EuiTabbedContent tabs={items} />
    </>
  );
};

const TabbedContentWithDisabledTabs = () => {
  const tabProps: EuiTabbedContentProps = {
    tabs: tabsSecond,
    initialSelectedTab: tabsSecond[0],
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
  });

  describe('Arrow key navigation', () => {
    it('should navigate the tabs with arrow keys', () => {
      cy.realMount(<TabbedContent />);
      cy.realPress('Tab');
      cy.realPress('ArrowLeft');
      // on enter, should select the first tab
      cy.realPress('Enter');
      cy.get('div[role="tabpanel"]').first().should('exist');
      cy.get('div[role="tabpanel"]').should('have.length', 1);
      cy.focused().should('have.text', 'Cobalt');
      // on arrow right, should navigate to the next tab
      cy.repeatRealPress('ArrowRight', 3);
      cy.focused().should('have.text', 'Monosodium Glutamate');
      // on arrow right, should loop back to the first tab
      cy.realPress('ArrowRight');
      cy.focused().should('have.text', 'Cobalt');
      // on arrow left, should loop back to the last tab
      cy.realPress('ArrowLeft');
      cy.focused().should('have.text', 'Monosodium Glutamate');
      // on enter, should select the last tab
      cy.realPress('Enter');
      cy.get('div[role="tabpanel"]').last().should('exist');
      cy.get('div[role="tabpanel"]').should('have.length', 1);
    });

    it('should navigate dynamic tabs correctly after they changed', () => {
      cy.mount(<DynamicTabbedContent />);
      cy.repeatRealPress('Tab', 2);
      // focus the second tab and assert it is focused
      cy.realPress('ArrowRight');
      cy.focused().should('have.text', 'Dextrose');
      // click the button to change the tabs
      cy.get('button').contains('Change tabs').click();
      // assert that the focus was reset
      cy.realPress('Tab');
      cy.realPress('ArrowRight');
      cy.focused().should('have.text', 'Banana');
      // press ArrowRight to navigate to the first tab and assert it is focused
      cy.realPress('ArrowRight');
      cy.focused().should('have.text', 'Apple');
      // press ArrowRight to navigate back to the second tab and assert it is focused
      cy.realPress('ArrowRight');
      cy.focused().should('have.text', 'Banana');
      // press ArrowLeft to navigate back to the first tab and verify it is focused
      cy.realPress('ArrowLeft');
      cy.focused().should('have.text', 'Apple');
    });

    it('should skip disabled tabs', () => {
      cy.mount(<TabbedContentWithDisabledTabs />);

      // focus the first tab and assert it is focused
      cy.realPress('Tab');
      cy.focused().should('have.text', 'Apple');

      // press ArrowRight to navigate to the second tab and assert it is focused
      cy.realPress('ArrowRight');
      cy.focused().should('have.text', 'Banana');

      // press ArrowRight to navigate to the first tab because the third tab is disabled
      cy.realPress('ArrowRight');
      cy.focused().should('have.text', 'Apple');

      // press ArrowLeft to navigate back to the second tab, skipping the third tab and assert it is focused
      cy.realPress('ArrowLeft');
      cy.focused().should('have.text', 'Banana');
    });
  });
});
