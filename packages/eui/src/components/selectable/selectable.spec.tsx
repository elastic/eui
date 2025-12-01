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

const EuiSelectableListboxOnly = (args: Partial<EuiSelectableProps>) => {
  return (
    <EuiSelectable options={options} {...args}>
      {(list) => <>{list}</>}
    </EuiSelectable>
  );
};

const EuiSelectableWithSearchInput = (args: Partial<EuiSelectableProps>) => {
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
    it('filters the list with search', () => {
      cy.realMount(<EuiSelectableWithSearchInput />);

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
      cy.realMount(<EuiSelectableWithSearchInput />);

      // Search/filter down to the second option
      cy.get('input')
        .realClick()
        .realType('enc')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Enceladus');
        });

      // Clear search using ENTER
      cy.get('[data-test-subj="clearSearchButton"]')
        .focus()
        .realPress('{enter}')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Titan');
        });

      // Search/filter again
      cy.get('input')
        .realClick()
        .realType('enc')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Enceladus');
        });

      // Clear search using SPACE
      cy.get('[data-test-subj="clearSearchButton"]')
        .focus()
        .realPress('Space')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Titan');
        });

      // Ensure the clear button does not respond to up/down arrow keys
      cy.get('input')
        .realClick()
        .realType('titan')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Titan');
        });
      cy.get('[data-test-subj="clearSearchButton"]')
        .focus()
        .realPress('ArrowDown')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Titan');
        })
        .realPress('ArrowUp')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Titan');
        });
    });

    it('allows pressing the Enter key to select an item', () => {
      const onChange = cy.stub();
      cy.realMount(<EuiSelectableWithSearchInput onChange={onChange} />);
      cy.realPress('Tab');
      cy.realPress('ArrowDown');
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
        <EuiSelectableWithSearchInput
          onChange={onItemChange}
          searchProps={{ onChange: onSearchChange }}
        />
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
      cy.realMount(<EuiSelectableWithSearchInput onChange={onChange} />);
      cy.get('li[role=option]')
        .first()
        .realClick()
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
      cy.realMount(<EuiSelectableListboxOnly onChange={onChange} />);
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
      cy.realMount(<EuiSelectableListboxOnly onChange={onChange} />);
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

  describe('isVirtualization={false}', () => {
    it('correctly scrolls keyboard navigated elements into view', () => {
      cy.realMount(
        <EuiSelectableListboxOnly
          listProps={{ isVirtualized: false }}
          height={50}
        />
      );
      cy.get('.euiSelectableList__list').invoke('scrollTop').should('eq', 0);

      cy.realPress('Tab');
      cy.realPress('ArrowUp');
      cy.get('.euiSelectableList__list').invoke('scrollTop').should('eq', 48);
    });
  });

  describe('truncation', () => {
    const sharedProps = {
      style: { width: 240 },
      options: [
        {
          label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          checked: 'on' as const,
        },
      ],
    };

    it('defaults to CSS truncation', () => {
      cy.realMount(<EuiSelectableListboxOnly {...sharedProps} />);
      cy.get('.euiTextTruncate').should('not.exist');
    });

    describe('when truncationProps are passed', () => {
      const truncationProps = {
        ...sharedProps,
        listProps: { truncationProps: { truncation: 'middle' as const } },
      };

      it('renders EuiTextTruncate when truncationProps are passed', () => {
        cy.realMount(<EuiSelectableListboxOnly {...truncationProps} />);
        cy.get('.euiTextTruncate').should('exist');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          'Lorem ipsum d…piscing elit.'
        );
      });

      it('correctly accounts for scrollbar width', () => {
        const multipleOptions = Array.from({ length: 5 }).map(
          () => sharedProps.options[0]
        );
        cy.realMount(
          <EuiSelectableListboxOnly
            {...truncationProps}
            height={100}
            options={multipleOptions}
          />
        );

        cy.get('[data-test-subj="truncatedText"]')
          .first()
          .should('have.text', 'Lorem ipsum …piscing elit.');
      });

      it('correctly accounts for the keyboard focus badge', () => {
        cy.realMount(<EuiSelectableListboxOnly {...truncationProps} />);

        cy.realPress('Tab');
        cy.get('.euiSelectableListItem__onFocusBadge').should('exist');

        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          'Lorem ipsu…cing elit.'
        );
      });

      it('handles custom append/prepend nodes', () => {
        cy.realMount(
          <EuiSelectableListboxOnly
            {...truncationProps}
            options={[
              { ...sharedProps.options[0], append: 'Post', prepend: 'Pre' },
            ]}
          />
        );
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          'Lorem i…ng elit.'
        );
      });

      it('updates on container resize', () => {
        cy.realMount(
          <EuiSelectableListboxOnly
            {...truncationProps}
            style={{ width: '100%' }}
          />
        );
        cy.viewport(100, 100);
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          'Lor…it.'
        );
      });

      it('allows individual option truncationProps to override parent truncationProps', () => {
        cy.realMount(
          <EuiSelectableListboxOnly
            {...truncationProps}
            options={[
              {
                ...sharedProps.options[0],
                truncationProps: { truncation: 'start', truncationOffset: 3 },
              },
            ]}
          />
        );
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          'Lor…sectetur adipiscing elit.'
        );
      });
    });

    describe('when searching', () => {
      it('uses start & end truncation position', () => {
        cy.realMount(<EuiSelectableWithSearchInput {...sharedProps} />);
        cy.get('input[type="search"]').realClick();
        cy.realType('sit');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          '…m dolor sit amet, …'
        );
      });

      it('does not truncate the start when the found search is near the start', () => {
        cy.realMount(<EuiSelectableWithSearchInput {...sharedProps} />);
        cy.get('input[type="search"]').realClick();
        cy.realType('ipsum');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          'Lorem ipsum dolor …'
        );
      });

      it('does not truncate the end when the found search is near the end', () => {
        cy.realMount(<EuiSelectableWithSearchInput {...sharedProps} />);
        cy.get('input[type="search"]').realClick();
        cy.realType('eli');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          '…tetur adipiscing elit.'
        );
      });

      it('marks the full available text if the search input is longer than the truncated text', () => {
        cy.realMount(<EuiSelectableWithSearchInput {...sharedProps} />);
        cy.get('input[type="search"]').realClick();
        cy.realType('Lorem ipsum dolor sit amet');
        cy.get('.euiMark').should('have.text', '…m ipsum dolor sit …');
      });
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

    it('allows pressing the Enter key to show listbox', () => {
      cy.realMount(<EuiSelectableNested />);
      cy.realPress('Tab');
      cy.realPress('Enter');
      expect(cy.get('ul[role=listbox]')).to.exist;
    });
  });
});
