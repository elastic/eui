/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

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

const EuiSelectableListboxOnly = (args) => {
  return (
    <EuiSelectable options={options} {...args}>
      {(list) => <>{list}</>}
    </EuiSelectable>
  );
};

const EuiSelectableWithSearchInput = (args) => {
  return (
    <EuiSelectable searchable options={options} {...args}>
      {(list, search) => (
        <>
          {search}
          {list}
        </>
      )}
    </EuiSelectable>
  );
};

describe('EuiSelectable', () => {
  describe('with a `searchable` configuration', () => {
    it('has no accessibility errors', () => {
      const onChange = cy.stub();
      cy.realMount(<EuiSelectableWithSearchInput onChange={onChange} />);
      cy.checkAxe();
    });
  });

  describe('without a `searchable` configuration', () => {
    it('has no accessibility errors', () => {
      const onChange = cy.stub();
      cy.realMount(
        <EuiSelectableListboxOnly
          aria-label="No search box"
          onChange={onChange}
        />
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
          <EuiSelectableWithSearchInput
            aria-label="With popover"
            options={options}
            onChange={onChange}
          >
            {(list) => <>{list}</>}
          </EuiSelectableWithSearchInput>
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
