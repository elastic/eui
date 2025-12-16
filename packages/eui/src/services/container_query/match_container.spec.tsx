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

import {
  matchContainer,
  ContainerQueryList,
  ContainerQueryListChangeEvent,
} from './match_container';

describe('matchContainer', () => {
  before(() => {
    cy.document().then((doc) => {
      // create container element
      const parent = doc.createElement('div');
      parent.setAttribute('data-test-subj', 'container');
      parent.style.containerType = 'inline-size';

      // create child
      const child = doc.createElement('div');
      child.setAttribute('data-test-subj', 'child');
      child.textContent = 'Child element text';
      child.style.outline = '1px solid cyan';
      parent.appendChild(child);

      doc.body.appendChild(parent);
    });
  });

  beforeEach(() => {
    cy.get('[data-test-subj="container"]')
      .should('exist')
      .as('container')
      .invoke('css', 'width', '250px');
    cy.get('[data-test-subj="child"]').should('exist').as('child');
  });

  it('returns a ContainerQueryList instance', () => {
    const condition = '(width > 100px)';

    cy.get('@child').then(($child) => {
      const cql = matchContainer($child[0], condition);
      expect(cql).to.be.instanceOf(ContainerQueryList);
      expect(cql).to.have.property('matches');
      expect(cql).to.have.property('container');
      expect(cql.container).to.equal(condition);
      cql.dispose();
    });
  });

  it('matches is true when container query condition is met', () => {
    cy.get('@child').then(($child) => {
      const cql = matchContainer($child[0], '(width > 100px)');
      expect(cql.matches).to.equal(true);
      cql.dispose();
    });
  });

  it('matches is false when container query condition is not met', () => {
    cy.get('@child').then(($child) => {
      const cql = matchContainer($child[0], '(width > 1000px)');
      expect(cql.matches).to.equal(false);
      cql.dispose();
    });
  });

  it('matches is updated when DOM changes', () => {
    cy.get('@child').then(($child) => {
      const cql = matchContainer($child[0], '(width > 200px)');
      expect(cql.matches).to.equal(true);

      cy.get('@container')
        .invoke('css', 'width', '100px')
        .wait(100)
        .then(() => {
          expect(cql.matches).to.equal(false);
          cql.dispose();
        });
    });
  });

  it('fires change event when matches changes', () => {
    const changeSpy = cy.spy().as('changeSpy');
    cy.get('@child').then(($child) => {
      const cql = matchContainer($child[0], '(width <= 250px)');
      cql.addEventListener('change', changeSpy);
      expect(cql.matches).to.equal(true);

      cy.get('[data-test-subj="container"]')
        .invoke('css', 'width', '300px')
        .wait(100)
        .then(() => {
          expect(changeSpy).to.have.been.calledOnce;
          expect(changeSpy.firstCall.args[0]).to.be.instanceOf(
            ContainerQueryListChangeEvent
          );
          expect(cql.matches).to.equal(false);
        })
        .invoke('css', 'width', '100px')
        .wait(100)
        .then(() => {
          expect(changeSpy).to.have.been.calledTwice;
          expect(cql.matches).to.equal(true);
          cql.dispose();
        })
        .invoke('css', 'width', '400px')
        .wait(100)
        .then(() => {
          // no more after cql.dispose() above
          expect(changeSpy).to.have.been.calledTwice;
        });
    });
  });

  it('cleans up properly when calling dispose', () => {
    cy.get('@child').then(($child) => {
      const child = $child[0];
      const cql = matchContainer(child, '(width > 100px)');
      expect(cql.matches).to.equal(true);

      // verify setup happened
      const hasMarkerBefore = Array.from(child.attributes).some((attr) =>
        attr.name.startsWith('data-container-query-observer-')
      );
      expect(hasMarkerBefore).to.equal(true);
      expect(child.style.getPropertyValue('transition')).to.not.equal('');
      expect(child.style.getPropertyValue('transition-behavior')).to.equal(
        'allow-discrete'
      );

      cy.document().then((doc) => {
        expect(doc.adoptedStyleSheets.length).to.be.greaterThan(0);

        // cleanup happens here
        cql.dispose();

        expect(doc.adoptedStyleSheets.length).to.equal(0);

        const hasMarkerAfter = Array.from(child.attributes).some((attr) =>
          attr.name.startsWith('data-container-query-observer-')
        );
        expect(hasMarkerAfter).to.equal(false);

        expect(child.style.getPropertyValue('transition')).to.equal('');
        expect(child.style.getPropertyValue('transition-behavior')).to.equal(
          ''
        );
      });
    });
  });
});
