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

import { EuiButton } from '../button';
import { EuiPopover } from '../popover';
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

const excludedOptions: EuiSelectableProps['options'] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    checked: 'on',
  },
  {
    label: 'Enceladus',
    checked: 'off',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    checked: 'mixed',
  },
];

describe('EuiSelectable', () => {
  describe('with a `searchable` configuration', () => {
    it('has no accessibility errors', () => {
      const onChange = cy.stub();
      cy.realMount(
        <EuiSelectable options={options} onChange={onChange} searchable>
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );
      cy.checkAxe();
    });
  });

  describe('without a `searchable` configuration', () => {
    it('has no accessibility errors', () => {
      const onChange = cy.stub();
      cy.realMount(
        <EuiSelectable
          aria-label="No search box"
          options={options}
          onChange={onChange}
        >
          {(list) => <>{list}</>}
        </EuiSelectable>
      );
      cy.checkAxe();
    });
  });

  describe('with excluded and mixed options configuration', () => {
    it('has no accessibility errors', () => {
      const onChange = cy.stub();
      cy.realMount(
        <EuiSelectable
          aria-label="Excluded and mixed options"
          options={excludedOptions}
          onChange={onChange}
        >
          {(list) => <>{list}</>}
        </EuiSelectable>
      );
      cy.checkAxe();
    });
  });

  describe('nested in `EuiPopover` component', () => {
    const EuiSelectableNested = () => {
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);

      const onChange = () => {};
      const onClosePopover = () => {};
      const onButtonClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
      };

      const button = (
        <EuiButton
          iconType="arrowDown"
          iconSide="right"
          onClick={onButtonClick}
        >
          Show popover
        </EuiButton>
      );

      return (
        <EuiPopover
          id="data-cy-popover-1"
          panelPaddingSize="s"
          button={button}
          isOpen={isPopoverOpen}
          closePopover={onClosePopover}
        >
          <EuiSelectable
            aria-label="With popover"
            options={options}
            onChange={onChange}
            searchable
          >
            {(list, search) => (
              <>
                {search}
                {list}
              </>
            )}
          </EuiSelectable>
        </EuiPopover>
      );
    };

    it('has no accessibility errors', () => {
      cy.realMount(<EuiSelectableNested />);
      cy.get('button').realClick();
      cy.get('li[role=option]').first(); // Make sure the EuiSelectable is rendered before a11y check
      cy.checkAxe();
    });
  });
});
