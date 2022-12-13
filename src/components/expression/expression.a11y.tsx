/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiExpression } from './expression';
import { EuiFieldNumber, EuiSelect } from '../form';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiPanel } from '../panel';
import { EuiPopover, EuiPopoverTitle } from '../popover';
import { useGeneratedHtmlId } from '../../services';

interface Examples {
  description?: string;
  value?: number | string;
  isOpen?: boolean;
}

describe('EuiExpression', () => {
  const BaseExpression = () => {
    const [example1, setExample1] = useState<Examples>({
      isOpen: false,
      value: 'count()',
    });

    const [example2, setExample2] = useState<Examples>({
      value: 100,
      description: 'Is above',
    });

    const expressionPopoverId__1 = useGeneratedHtmlId({
      prefix: 'expressionPopover',
      suffix: 'first',
    });
    const expressionPopoverId__2 = useGeneratedHtmlId({
      prefix: 'expressionPopover',
      suffix: 'second',
    });

    const openExample1 = () => {
      setExample1({
        ...example1,
        isOpen: true,
      });
      setExample2({
        ...example2,
        isOpen: false,
      });
    };

    const closeExample1 = () => {
      setExample1({
        ...example1,
        isOpen: false,
      });
    };

    const openExample2 = () => {
      setExample1({
        ...example1,
        isOpen: false,
      });
      setExample2({
        ...example2,
        isOpen: true,
      });
    };

    const closeExample2 = () => {
      setExample2({
        ...example2,
        isOpen: false,
      });
    };

    const changeExample1 = (event) => {
      setExample1({
        ...example1,
        value: event.target.value,
      });
    };

    const changeExample2Value = (e) => {
      const sanitizedValue = parseInt(e.target.value, 10);
      setExample2({
        ...example2,
        value: isNaN(sanitizedValue) ? '' : sanitizedValue,
      });
    };

    const changeExample2Description = (event) => {
      setExample2({
        ...example2,
        description: event.target.value,
      });
    };

    const renderPopover1 = () => (
      <div data-test-subj="cy-expression-popover-1">
        <EuiPopoverTitle>When</EuiPopoverTitle>
        <EuiSelect
          compressed
          value={example1.value}
          onChange={changeExample1}
          options={[
            { value: 'count()', text: 'count()' },
            { value: 'average()', text: 'average()' },
            { value: 'sum()', text: 'sum()' },
            { value: 'median()', text: 'median()' },
            { value: 'min()', text: 'min()' },
            { value: 'max()', text: 'max()' },
          ]}
        />
      </div>
    );

    const renderPopover2 = () => (
      <div data-test-subj="cy-expression-popover-2">
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem grow={false} style={{ width: 150 }}>
            <EuiSelect
              compressed
              value={example2.description}
              onChange={changeExample2Description}
              options={[
                { value: 'Is above', text: 'Is above' },
                { value: 'Is below', text: 'Is below' },
                { value: 'Is exactly', text: 'Is exactly' },
              ]}
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false} style={{ width: 100 }}>
            <EuiFieldNumber
              compressed
              value={example2.value}
              onChange={changeExample2Value}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );

    return (
      <EuiPanel>
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiPopover
              id={expressionPopoverId__1}
              button={
                <EuiExpression
                  description="when"
                  value={example1.value}
                  isActive={example1.isOpen}
                  onClick={openExample1}
                />
              }
              isOpen={example1.isOpen}
              closePopover={closeExample1}
              panelPaddingSize="s"
              anchorPosition="downLeft"
            >
              {renderPopover1()}
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id={expressionPopoverId__2}
              panelPaddingSize="s"
              button={
                <EuiExpression
                  description={example2.description}
                  value={example2.value}
                  isActive={example2.isOpen}
                  onClick={openExample2}
                />
              }
              isOpen={example2.isOpen}
              closePopover={closeExample2}
              anchorPosition="downLeft"
            >
              {renderPopover2()}
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    );
  };

  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<BaseExpression />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when count popover is open', () => {
      cy.get('button')
        .contains(/When count\(\)/i)
        .realClick();
      cy.get('div[data-test-subj="cy-expression-popover-1"]').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when is above popover is open', () => {
      cy.get('button')
        .contains(/Is above 100/i)
        .realClick();
      cy.get('div[data-test-subj="cy-expression-popover-2"]').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when first popover is interacted with by keyboard', () => {
      cy.realPress('Tab');
      cy.get('button')
        .contains(/When count\(\)/i)
        .should('have.focus');
      cy.realPress('Enter');
      cy.get('div[data-test-subj="cy-expression-popover-1"]').should('exist');
      cy.realPress('Tab');
      cy.realPress(['a', 'v', 'g']);
      cy.realPress('Escape');
      cy.get('button')
        .contains(/When average\(\)/i)
        .should('have.focus');
      cy.checkAxe();
    });

    it('has zero violations when second popover is interacted with by keyboard', () => {
      cy.repeatRealPress('Tab');
      cy.get('button')
        .contains(/Is above 100/i)
        .should('have.focus');
      cy.realPress('Enter');
      cy.get('div[data-test-subj="cy-expression-popover-2"]').should('exist');
      cy.realPress('Tab');
      cy.realPress(['I', 's', ' ', 'e']);
      cy.realPress('Tab');
      cy.repeatRealPress('Delete', 3);
      cy.realPress(['5', '0', '0']);
      cy.realPress('Escape');
      cy.get('button')
        .contains(/Is exactly 500/i)
        .should('have.focus');
      cy.checkAxe();
    });
  });
});
