/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiSelectable, EuiSelectableProps } from './selectable';

const options: EuiSelectableProps['options'] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
];

describe('EuiSelectable', () => {
  describe('with a `searchable` configuration', () => {
    it('filters the list with search', () => {
      cy.realMount(
        <EuiSelectable searchable options={options}>
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );

      // Focus the second option
      cy.get('input')
        .realClick()
        .realPress('{downarrow}')
        .realPress('{downarrow}')
        .then(() => {
          cy.get('li[role=option]')
            .eq(1)
            .should('have.attr', 'aria-selected', 'true');
        });

      // Focus remains on the second option
      cy.get('input')
        .realClick()
        .realPress('Alt')
        .realPress('Control')
        .realPress('Meta')
        .realPress('Shift')
        .then(() => {
          cy.get('li[role=option]')
            .eq(1)
            .should('have.attr', 'aria-selected', 'true');
        });

      // Filter the list
      cy.get('input')
        .realClick()
        .realType('enc')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Enceladus');
        });
    });

    it('can clear the input', () => {
      cy.realMount(
        <EuiSelectable searchable options={options}>
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );

      cy.get('input')
        .realClick()
        .realType('enc')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Enceladus');
        });

      // Using ENTER
      cy.get('[data-test-subj="clearSearchButton"]')
        .focus()
        .realPress('{enter}')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Titan');
        });

      cy.get('input')
        .realClick()
        .realType('enc')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Enceladus');
        });

      // Using SPACE
      cy.get('[data-test-subj="clearSearchButton"]')
        .focus()
        .realPress('Space')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Titan');
        });
    });

    it('allows pressing the Enter key to select an item', () => {
      const onChange = cy.stub();
      cy.realMount(
        <EuiSelectable searchable options={options} onChange={onChange}>
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );

      cy.realPress('Tab');
      cy.realPress('Enter').then(() => {
        expect(onChange).to.have.been.calledWith([
          { ...options[0], checked: 'on' },
          options[1],
          options[2],
        ]);
      });
    });

    it('does not allow pressing the Space key to select an item while in the searchbox (should filter instead)', () => {
      const onItemChange = cy.stub();
      const onSearchChange = cy.stub();
      cy.realMount(
        <EuiSelectable
          searchable
          options={options}
          onChange={onItemChange}
          searchProps={{ onChange: onSearchChange }}
        >
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );

      cy.realPress('Tab');
      cy.realPress('Space').then(() => {
        expect(onItemChange).not.have.been.called;
        expect(onSearchChange).to.have.been.calledWith(' ');
      });
    });

    // mouse+keyboard combo users
    it('allows users to click into an list item and still press Enter or Space to toggle list items', () => {
      const onChange = cy.stub();
      cy.realMount(
        <EuiSelectable searchable options={options} onChange={onChange}>
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );

      cy.get('li[role=option]')
        .first()
        .click()
        .then(() => {
          expect(onChange).to.have.been.calledWith([
            { ...options[0], checked: 'on' },
            options[1],
            options[2],
          ]);
        });
      cy.realPress('ArrowDown')
        .realPress('Enter')
        .then(() => {
          expect(onChange).to.have.been.calledWith([
            options[0], // FYI: doesn't remain `on` because `options` is not controlled to remember state
            { ...options[1], checked: 'on' },
            options[2],
          ]);
        });
      cy.realPress('ArrowDown')
        .realPress('Space')
        .then(() => {
          expect(onChange).to.have.been.calledWith([
            options[0],
            options[1],
            { ...options[2], checked: 'on' },
          ]);
        });
    });
  });

  describe('without a `searchable` configuration', () => {
    it('allows pressing the Enter key to select an item', () => {
      const onChange = cy.stub();
      cy.realMount(
        <EuiSelectable options={options} onChange={onChange}>
          {(list) => <>{list}</>}
        </EuiSelectable>
      );

      cy.realPress('Tab');
      cy.realPress('ArrowDown');
      cy.realPress('Enter').then(() => {
        expect(onChange).to.have.been.calledWith([
          options[0],
          { ...options[1], checked: 'on' },
          options[2],
        ]);
      });
    });

    it('allows pressing the Space key to select an item', () => {
      const onChange = cy.stub();
      cy.realMount(
        <EuiSelectable options={options} onChange={onChange}>
          {(list) => <>{list}</>}
        </EuiSelectable>
      );
      cy.realPress('Tab');
      cy.repeatRealPress('ArrowDown', 2);
      cy.realPress('Space').then(() => {
        expect(onChange).to.have.been.calledWith([
          options[0],
          options[1],
          { ...options[2], checked: 'on' },
        ]);
      });
    });
  });
});
