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

import { EuiPopover, EuiPopoverTitle } from '../popover';
import { EuiSelectable, EuiSelectableOption } from '../selectable';
import { useGeneratedHtmlId } from '../../services';

import { EuiFilterGroup, EuiFilterButton } from './index';

describe('EuiFilterGroup single filter example', () => {
  const SingleFilter = () => {
    const [isFilterOn, setIsFilterOn] = useState(false);

    const toggleFilter = () => {
      setIsFilterOn(!isFilterOn);
    };

    return (
      <EuiFilterGroup>
        <EuiFilterButton hasActiveFilters={isFilterOn} onClick={toggleFilter}>
          Single filter
        </EuiFilterButton>
      </EuiFilterGroup>
    );
  };

  beforeEach(() => {
    cy.realMount(<SingleFilter />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when toggled on', () => {
      cy.get('button.euiButtonEmpty').first().realClick();
      cy.get('button.euiButtonEmpty')
        .first()
        .should('have.class', 'euiFilterButton-hasActiveFilters');
      cy.checkAxe();
    });
  });
});

describe('EuiFilterGroup filter with long name example', () => {
  const LongNameFilter = () => {
    const [isFilterOn, setIsFilterOn] = useState(false);

    const toggleFilter = () => {
      setIsFilterOn(!isFilterOn);
    };

    return (
      <EuiFilterGroup>
        <EuiFilterButton
          hasActiveFilters={isFilterOn}
          numFilters={12}
          onClick={toggleFilter}
        >
          Filter with a very long name
        </EuiFilterButton>
      </EuiFilterGroup>
    );
  };

  beforeEach(() => {
    cy.realMount(<LongNameFilter />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when toggled on', () => {
      cy.get('button.euiButtonEmpty').first().realClick();
      cy.get('button.euiButtonEmpty')
        .first()
        .should('have.class', 'euiFilterButton-hasActiveFilters');
      cy.checkAxe();
    });
  });
});

describe('EuiFilterGroup two filter example', () => {
  const ThreeOptionFilter = () => {
    const [isOnFilterOn, setIsOnFilterOn] = useState(false);
    const [isOffFilterOn, setIsOffFilterOn] = useState(false);

    const toggleOnFilter = () => {
      setIsOnFilterOn(!isOnFilterOn);
      setIsOffFilterOn(isOffFilterOn && !isOnFilterOn ? false : isOffFilterOn);
    };

    const toggleOffFilter = () => {
      setIsOffFilterOn(!isOffFilterOn);
      setIsOnFilterOn(isOnFilterOn && !isOffFilterOn ? false : isOnFilterOn);
    };

    return (
      <EuiFilterGroup>
        <EuiFilterButton
          withNext
          hasActiveFilters={isOnFilterOn}
          onClick={toggleOnFilter}
        >
          Yes
        </EuiFilterButton>
        <EuiFilterButton
          withNext
          hasActiveFilters={isOffFilterOn}
          onClick={toggleOffFilter}
        >
          No
        </EuiFilterButton>
      </EuiFilterGroup>
    );
  };

  beforeEach(() => {
    cy.realMount(<ThreeOptionFilter />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when toggled on', () => {
      cy.get('button.euiButtonEmpty').first().realClick();
      cy.get('button.euiButtonEmpty')
        .first()
        .should('have.class', 'euiFilterButton-hasActiveFilters');
      cy.checkAxe();
    });
  });
});

describe('EuiFilterGroup multiselect example', () => {
  const MultiSelectFilter = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [withLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onButtonClick = () => {
      if (withLoading && !isPopoverOpen) {
        setIsLoading(true);
      }
      setIsPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
      setIsPopoverOpen(false);
    };

    const filterGroupPopoverId = useGeneratedHtmlId({
      prefix: 'filterGroupPopover',
    });

    const [items, setItems] = useState<EuiSelectableOption[]>([
      { label: 'Johann Sebastian Bach', checked: 'on' },
      { label: 'Wolfgang Amadeus Mozart', checked: 'on' },
      { label: 'Antonín Dvořák', checked: 'off' },
      { label: 'Dmitri Shostakovich' },
      { label: 'Felix Mendelssohn-Bartholdy' },
      { label: 'Franz Liszt' },
      { label: 'Franz Schubert' },
      { label: 'Frédéric Chopin' },
      { label: 'Georg Friedrich Händel' },
      { label: 'Giuseppe Verdi' },
    ]);

    const button = (
      <EuiFilterButton
        iconType="arrowDown"
        onClick={onButtonClick}
        isSelected={isPopoverOpen}
        numFilters={items.filter((item) => item.checked !== 'off').length}
        hasActiveFilters={!!items.find((item) => item.checked === 'on')}
        numActiveFilters={items.filter((item) => item.checked === 'on').length}
      >
        Composers
      </EuiFilterButton>
    );

    return (
      <EuiFilterGroup>
        <EuiPopover
          id={filterGroupPopoverId}
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none"
        >
          <EuiSelectable
            allowExclusions
            searchable
            searchProps={{
              placeholder: 'Filter list',
              compressed: true,
            }}
            aria-label="Composers"
            options={items}
            onChange={(newOptions) => setItems(newOptions)}
            isLoading={isLoading}
            loadingMessage="Loading filters"
            emptyMessage="No filters available"
            noMatchesMessage="No filters found"
          >
            {(list, search) => (
              <div style={{ width: 300 }}>
                <EuiPopoverTitle paddingSize="s">{search}</EuiPopoverTitle>
                {list}
              </div>
            )}
          </EuiSelectable>
        </EuiPopover>
      </EuiFilterGroup>
    );
  };

  beforeEach(() => {
    cy.realMount(<MultiSelectFilter />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when toggled on', () => {
      cy.get('button.euiButtonEmpty').first().realClick();
      cy.get('div[data-test-subj="euiSelectableList"]').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when filtering by keyboard interaction', () => {
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.get('div[data-test-subj="euiSelectableList"]').should('exist');
      cy.realPress('Tab');
      cy.repeatRealPress('ArrowDown', 4);
      cy.realPress('Enter');
      cy.get('li[aria-selected="true"]')
        .find('span.euiSelectableListItem__text')
        .should(
          'have.text',
          'Dmitri Shostakovich. Checked option. To exclude this option, press Enter.'
        );
      cy.realPress('ArrowDown');
      cy.repeatRealPress('Enter');
      cy.get('li[aria-selected="true"]')
        .find('span.euiSelectableListItem__text')
        .should(
          'have.text',
          'Felix Mendelssohn-Bartholdy. Excluded option. To uncheck this option, press Enter.'
        );
      cy.checkAxe();
    });

    it('has zero violations when filtering by searchbox', () => {
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.get('div[data-test-subj="euiSelectableList"]').should('exist');
      cy.realPress('Tab');
      cy.realPress(['m', 'a', 'r', 'k']);
      cy.get('div[data-test-subj="euiSelectableMessage"]')
        .find('p')
        .contains('No filters found')
        .should('exist');
      cy.checkAxe();
    });
  });
});
