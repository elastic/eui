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
import { EuiTreeView, Node } from './tree_view';

const getItems = (childBranchCallback?: () => string): Node[] => [
  {
    label: 'Root Branch',
    id: 'root_branch',
    isExpanded: true,
    children: [
      {
        label: 'Child Leaf',
        id: 'child_leaf',
      },
      {
        label: 'Child Branch',
        id: 'child_branch',
        callback: childBranchCallback,
        children: [
          {
            label: 'Grandchild Leaf',
            id: 'grandchild_leaf',
          },
        ],
      },
    ],
  },
  {
    label: 'Sibling Branch',
    id: 'sibling_branch',
    children: [
      {
        label: 'Sibling Child',
        id: 'sibling_child',
      },
    ],
  },
  {
    label: 'Root Leaf',
    id: 'root_leaf',
  },
];

const TreeView = ({
  childBranchCallback,
}: {
  childBranchCallback?: () => string;
}) => (
  <div style={{ width: '20rem' }}>
    <EuiTreeView
      id="tree"
      items={getItems(childBranchCallback)}
      aria-label="Sample folder tree"
    />
  </div>
);

const RerenderingTreeView = () => {
  const [label, setLabel] = useState('Sample folder tree');

  return (
    <>
      <TreeView />
      <button
        data-test-subj="rerenderTree"
        onClick={() => setLabel('Updated folder tree')}
      >
        Update
      </button>
      <span>{label}</span>
    </>
  );
};

describe('EuiTreeView', () => {
  describe('vertical keyboard navigation', () => {
    beforeEach(() => {
      cy.realMount(<TreeView />);
    });

    it('moves through visible root and nested buttons in DOM order', () => {
      cy.get('#root_branch').focus().realPress('ArrowDown');
      cy.focused().should('have.id', 'child_leaf').realPress('ArrowDown');
      cy.focused().should('have.id', 'child_branch').realPress('ArrowDown');
      cy.focused().should('have.id', 'sibling_branch').realPress('ArrowDown');
      cy.focused().should('have.id', 'root_leaf');

      cy.realPress('ArrowUp');
      cy.focused().should('have.id', 'sibling_branch').realPress('ArrowUp');
      cy.focused().should('have.id', 'child_branch').realPress('ArrowUp');
      cy.focused().should('have.id', 'child_leaf').realPress('ArrowUp');
      cy.focused().should('have.id', 'root_branch');
    });

    it('includes newly mounted descendants and does not change the active item', () => {
      cy.get('#child_branch').focus().realPress('ArrowRight');
      cy.get('#child_branch')
        .should('have.attr', 'aria-expanded', 'true')
        .and('have.class', 'euiTreeView__node--active')
        .realPress('ArrowDown');

      cy.focused()
        .should('have.id', 'grandchild_leaf')
        .and('not.have.class', 'euiTreeView__node--active')
        .realPress('ArrowDown');
      cy.focused().should('have.id', 'sibling_branch');
      cy.get('#child_branch').should('have.class', 'euiTreeView__node--active');
    });

    it('does not wrap at the first or final visible button', () => {
      cy.get('#root_branch').focus().realPress('ArrowUp');
      cy.focused().should('have.id', 'root_branch');

      cy.get('#root_leaf').focus().realPress('ArrowDown');
      cy.focused().should('have.id', 'root_leaf');
    });
  });

  describe('horizontal keyboard expansion', () => {
    it('ArrowRight opens a branch locally, preserves focus, and skips its callback', () => {
      const callback = cy.stub().returns('');
      cy.realMount(<TreeView childBranchCallback={callback} />);

      cy.get('#child_branch').focus().realPress('ArrowRight');
      cy.focused()
        .should('have.id', 'child_branch')
        .and('have.attr', 'aria-expanded', 'true');
      cy.get('#grandchild_leaf').should('exist');
      cy.wrap(callback).should('not.have.been.called');

      cy.realPress('ArrowRight');
      cy.focused()
        .should('have.id', 'child_branch')
        .and('have.attr', 'aria-expanded', 'true');
      cy.wrap(callback).should('not.have.been.called');
    });

    it('ArrowRight gives a leaf active styling without expansion semantics or a callback', () => {
      const callback = cy.stub().returns('');
      const items = getItems();
      items[0].children![0].callback = callback;
      cy.realMount(<EuiTreeView id="tree" items={items} aria-label="Tree" />);

      cy.get('#child_leaf').focus().realPress('ArrowRight');

      cy.focused()
        .should('have.id', 'child_leaf')
        .and('have.class', 'euiTreeView__node--active')
        .and('not.have.attr', 'aria-expanded');
      cy.wrap(callback).should('not.have.been.called');
    });

    it('ArrowLeft closes an open child locally before a second press bubbles to its parent', () => {
      const callback = cy.stub().returns('');
      cy.realMount(<TreeView childBranchCallback={callback} />);
      cy.get('#child_branch').focus().realPress('ArrowRight');

      cy.realPress('ArrowLeft');
      cy.focused()
        .should('have.id', 'child_branch')
        .and('have.attr', 'aria-expanded', 'false');
      cy.get('#grandchild_leaf').should('not.exist');
      cy.wrap(callback).should('not.have.been.called');

      cy.realPress('ArrowLeft');
      cy.focused().should('have.id', 'root_branch');
      cy.wrap(callback).should('not.have.been.called');
    });
  });

  describe('native button behavior', () => {
    it('Enter toggles a branch, preserves focus, and calls back once per toggle', () => {
      const callback = cy.stub().returns('');
      cy.realMount(<TreeView childBranchCallback={callback} />);

      cy.get('#child_branch').focus().realPress('Enter');
      cy.focused()
        .should('have.id', 'child_branch')
        .and('have.attr', 'aria-expanded', 'true');
      cy.wrap(callback).should('have.been.calledOnce');

      cy.realPress('Enter');
      cy.focused()
        .should('have.id', 'child_branch')
        .and('have.attr', 'aria-expanded', 'false');
      cy.wrap(callback).should('have.been.calledTwice');
    });

    it('Space toggles a branch and calls back exactly once', () => {
      const callback = cy.stub().returns('');
      cy.realMount(<TreeView childBranchCallback={callback} />);

      cy.get('#child_branch').focus().realPress('Space');

      cy.focused()
        .should('have.id', 'child_branch')
        .and('have.attr', 'aria-expanded', 'true');
      cy.wrap(callback).should('have.been.calledOnce');
    });

    it('Tab follows the native order of every visible button', () => {
      cy.realMount(<TreeView />);

      cy.get('#root_branch').focus().realPress('Tab');
      cy.focused().should('have.id', 'child_leaf').realPress('Tab');
      cy.focused().should('have.id', 'child_branch').realPress('Tab');
      cy.focused().should('have.id', 'sibling_branch').realPress('Tab');
      cy.focused().should('have.id', 'root_leaf');
      cy.get('#tree button').should('not.have.attr', 'tabindex');
    });

    it('mouse expansion and collapse preserve focus and call back once per click', () => {
      const callback = cy.stub().returns('');
      cy.realMount(<TreeView childBranchCallback={callback} />);

      cy.get('#child_branch').realClick();
      cy.focused()
        .should('have.id', 'child_branch')
        .and('have.attr', 'aria-expanded', 'true');
      cy.wrap(callback).should('have.been.calledOnce');

      cy.get('#child_branch').realClick();
      cy.focused()
        .should('have.id', 'child_branch')
        .and('have.attr', 'aria-expanded', 'false');
      cy.wrap(callback).should('have.been.calledTwice');
    });
  });

  describe('ID and rerender behavior', () => {
    it('gives independent trees distinct generated root and instruction IDs', () => {
      cy.mount(
        <>
          <EuiTreeView
            items={[{ label: 'First Leaf', id: 'first_leaf' }]}
            aria-label="First tree"
          />
          <EuiTreeView
            items={[{ label: 'Second Leaf', id: 'second_leaf' }]}
            aria-label="Second tree"
          />
        </>
      );

      cy.get('ul.euiTreeView').then(($trees) => {
        const firstId = $trees.eq(0).attr('id');
        const secondId = $trees.eq(1).attr('id');

        expect(firstId).not.to.equal(secondId);
        expect($trees.eq(0)).to.have.attr(
          'aria-describedby',
          `${firstId}--instruction`
        );
        expect($trees.eq(1)).to.have.attr(
          'aria-describedby',
          `${secondId}--instruction`
        );
      });
    });

    it('preserves the focused tree button through an ordinary rerender', () => {
      cy.realMount(<RerenderingTreeView />);
      cy.get('#child_branch').focus();

      cy.get('[data-test-subj="rerenderTree"]').invoke('click');

      cy.contains('Updated folder tree');
      cy.focused().should('have.id', 'child_branch');
    });
  });
});
