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
import { EuiButtonEmpty } from '../button';
import { EuiCard } from './card';
import { EuiIcon } from '../icon';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

const Card = () => {
  const [card1Selected, setCard1] = useState(false);
  const [card2Selected, setCard2] = useState(false);
  const [card3Selected, setCard3] = useState(false);

  const card1Clicked = () => {
    setCard1(!card1Selected);
  };

  const card2Clicked = () => {
    setCard2(!card2Selected);
  };

  const card3Clicked = () => {
    setCard3(!card3Selected);
  };

  const detailsClicked = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  return (
    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>
        <EuiCard
          data-test-subj="cy-card-1"
          icon={<EuiIcon size="xxl" type="logoSketch" />}
          title="Sketch"
          description="Example of a short card description."
          footer={
            <EuiButtonEmpty
              iconType="info"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Sketch"
            >
              More details
            </EuiButtonEmpty>
          }
          selectable={{
            onClick: card1Clicked,
            isSelected: card1Selected,
          }}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon size="xxl" type="logoGCP" />}
          title="Google"
          description="Example of a longer card description. See how the footers stay lined up."
          footer={
            <EuiButtonEmpty
              iconType="info"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Google"
            >
              More details
            </EuiButtonEmpty>
          }
          selectable={{
            onClick: card2Clicked,
            isSelected: card2Selected,
          }}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon size="xxl" type="logoAerospike" />}
          title="Not Adobe"
          description="Example of a short card description."
          footer={
            <EuiButtonEmpty
              iconType="info"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Not Adobe"
            >
              More details
            </EuiButtonEmpty>
          }
          selectable={{
            onClick: card3Clicked,
            isSelected: card3Selected,
          }}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<Card />);
});

describe('EuiCard', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations after clicking buttons', () => {
      cy.get('button[aria-checked="false"]').each(($el) => {
        cy.wrap($el).click();
      });
      cy.checkAxe();
    });

    it('has zero violations after keyboard interaction', () => {
      cy.get('div[data-test-subj="cy-card-1"]')
        .find('button.euiButtonEmpty')
        .focus();
      cy.realPress('Tab');
      cy.realPress('{enter}');
      cy.get('div[data-test-subj="cy-card-1"]')
        .find('button.euiButton')
        .should('have.attr', 'aria-checked', 'true');
      cy.checkAxe();
    });
  });
});
