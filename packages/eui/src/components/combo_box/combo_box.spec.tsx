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

import React, { FunctionComponent, useState } from 'react';

import { EuiFlyout, EuiPopover, EuiButton } from '../index';

import {
  EuiComboBox,
  type EuiComboBoxProps,
  type EuiComboBoxOptionOption,
} from './index';

describe('EuiComboBox', () => {
  const defaultOptions: Array<EuiComboBoxOptionOption<{}>> = [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' },
  ];
  const StatefulComboBox: FunctionComponent<Partial<EuiComboBoxProps<{}>>> = ({
    options = defaultOptions,
    selectedOptions: _selectedOptions = [],
    ...rest
  }) => {
    const [selectedOptions, setSelected] =
      useState<typeof options>(_selectedOptions);
    const onChange = (selectedOptions: typeof options) => {
      setSelected(selectedOptions);
    };

    return (
      <EuiComboBox
        options={options}
        selectedOptions={selectedOptions}
        {...rest}
        onChange={onChange}
      />
    );
  };

  const CreateComboBox = () => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelected] = useState([]);

    const onCreateOption = (searchValue: string) => {
      const newOption = { label: searchValue };

      setOptions([...options, newOption]);

      setSelected((prevSelected) => [...prevSelected, newOption]);
    };

    return (
      <EuiComboBox
        options={options}
        selectedOptions={selectedOptions}
        onCreateOption={onCreateOption}
        delimiter=","
      />
    );
  };

  describe('focus management', () => {
    it('keeps focus on the input box when clicking a disabled item', () => {
      cy.realMount(
        <EuiComboBox
          data-test-subj="combobox"
          options={[
            { label: 'Item 1' },
            { label: 'Item 2', disabled: true },
            { label: 'Item 3' },
          ]}
        />
      );

      cy.get(
        '[data-test-subj=combobox] [data-test-subj=comboBoxSearchInput]'
      ).realClick();

      cy.get('span').contains('Item 2').realClick();

      cy.focused().should('have.attr', 'data-test-subj', 'comboBoxSearchInput');
    });
  });

  describe('keyboard UX', () => {
    it('allows the enter key to delete items and clear selections', () => {
      cy.realMount(
        <StatefulComboBox
          data-test-subj="combobox"
          selectedOptions={[{ label: 'Item 1' }, { label: 'Item 2' }]}
          options={defaultOptions}
        />
      );
      cy.get('.euiComboBoxPill').should('have.length', 2);

      cy.realPress('Tab');
      cy.focused().should(
        'have.attr',
        'aria-label',
        'Remove Item 1 from selection in this group'
      );
      cy.realPress('Enter');
      cy.get('.euiComboBoxPill').should('have.length', 1);

      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-test-subj', 'comboBoxClearButton');
      cy.realPress('Enter');
      cy.get('.euiComboBoxPill').should('have.length', 0);
    });

    describe('backspace to delete last pill', () => {
      it('does not delete the last pill if there is search text', () => {
        cy.realMount(<StatefulComboBox />);
        cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
        cy.realPress('{downarrow}');
        cy.realPress('Enter');
        cy.realPress('{downarrow}');
        cy.realPress('Enter');
        cy.get('.euiComboBoxPill').should('have.length', 2);

        cy.get('[data-test-subj=comboBoxSearchInput]').type('test');
        cy.get('[data-test-subj=comboBoxSearchInput]').realPress('Backspace');

        cy.get('[data-test-subj=comboBoxSearchInput]')
          .invoke('val')
          .should('equal', 'tes');
        cy.get('.euiComboBoxPill').should('have.length', 2);
      });

      it('does not delete the last pill if the input is not active when backspace is pressed', () => {
        cy.realMount(<StatefulComboBox />);
        cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
        cy.realPress('{downarrow}');
        cy.realPress('Enter');
        cy.get('[data-test-subj=comboBoxSearchInput]').type('test');
        cy.realPress('Escape');
        cy.get('.euiComboBoxPill').should('have.length', 1);

        cy.realPress(['Shift', 'Tab']); // Should be focused on the first pill's X button
        cy.realPress('Backspace');
        cy.get('.euiComboBoxPill').should('have.length', 1);

        cy.repeatRealPress('Tab', 2); // Should be focused on the clear button
        cy.realPress('Backspace');
        cy.get('.euiComboBoxPill').should('have.length', 1);
      });

      it('deletes the last pill added when backspace on the input is pressed ', () => {
        cy.realMount(<StatefulComboBox />);
        cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
        cy.realPress('{downarrow}');
        cy.realPress('Enter');
        cy.realPress('{downarrow}');
        cy.realPress('Enter');
        cy.get('.euiComboBoxPill').should('have.length', 2);

        cy.get('[data-test-subj=comboBoxSearchInput]').realPress('Backspace');
        cy.get('.euiComboBoxPill').should('have.length', 1);
      });

      it('`asPlainText`: deletes the selection and only a single character', () => {
        cy.realMount(
          // @ts-ignore - not totally sure why TS is kicking up a fuss here
          <StatefulComboBox singleSelection={{ asPlainText: true }} />
        );
        cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
        cy.realPress('{downarrow}');
        cy.realPress('Enter');
        cy.get('[data-test-subj=comboBoxSearchInput]').should(
          'have.value',
          'Item 1'
        );
        cy.get('[data-test-subj="comboBoxClearButton"]').should('exist'); // indicates selection

        cy.get('[data-test-subj=comboBoxSearchInput]').realPress('Backspace');
        cy.get('[data-test-subj="comboBoxClearButton"]').should('not.exist'); // selection removed
        cy.get('[data-test-subj=comboBoxSearchInput]').should(
          'have.value',
          'Item '
        );
      });

      it('opens up the selection list again after deleting the active single selection ', () => {
        cy.realMount(<StatefulComboBox singleSelection />);
        cy.get('[data-test-subj=comboBoxSearchInput]').realClick();
        cy.realPress('{downarrow}');
        cy.realPress('Enter');

        cy.realPress('Backspace');
        cy.get('[data-test-subj=comboBoxOptionsList]').should('have.length', 1);
      });
    });
  });

  describe('input auto sizing', () => {
    it('resizes the width of the input based to fit the search text', () => {
      cy.realMount(<EuiComboBox options={[]} />);
      cy.get('[data-test-subj="comboBoxSearchInput"]').should(
        'have.attr',
        'style',
        'inline-size: 2px;'
      );

      cy.get('[data-test-subj="comboBoxSearchInput"]').realClick();
      cy.realType('lorem ipsum dolor');
      cy.get('[data-test-subj="comboBoxSearchInput"]').should(
        'have.attr',
        'style',
        'inline-size: 122px;'
      );
    });

    it('correctly resets the input size when the search value is cleared', () => {
      cy.realMount(<EuiComboBox options={[{ label: 'Test 1 2 3' }]} />);
      cy.get('[data-test-subj="comboBoxSearchInput"]').realClick();

      cy.realType('Test 1 2 3');
      cy.get('[data-test-subj="comboBoxSearchInput"]').should(
        'have.attr',
        'style',
        'inline-size: 65px;'
      );

      cy.realPress('{downarrow}');
      cy.realPress('Enter');
      cy.get('[data-test-subj="comboBoxSearchInput"]').should(
        'have.attr',
        'style',
        'inline-size: 2px;'
      );
    });

    it('does not exceed the maximum possible width of the input wrapper', () => {
      cy.realMount(<EuiComboBox options={[]} />);
      cy.get('[data-test-subj="comboBoxSearchInput"]').realClick();
      cy.realType(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit......'
      );

      cy.get('[data-test-subj="comboBoxSearchInput"]').should(
        'have.attr',
        'style',
        'inline-size: 388px;'
      );
      cy.get('[data-test-subj="comboBoxSearchInput"]')
        .invoke('width')
        .should('be.eq', 356);
    });
  });

  describe('inputPopoverProps', () => {
    it('allows setting a minimum popover width', () => {
      cy.mount(
        <EuiComboBox
          options={[{ label: 'Test' }]}
          selectedOptions={[]}
          onChange={() => {}}
          data-test-subj="combobox"
          inputPopoverProps={{
            panelMinWidth: 300,
            anchorPosition: 'downCenter',
          }}
          style={{ margin: '0 auto' }}
        />
      );
      cy.get('[data-test-subj="comboBoxInput"]').click();

      cy.get('[data-popover-panel]')
        .should('have.css', 'inline-size', '400px')
        .should('have.css', 'left', '50px');

      cy.get('[data-test-subj="combobox"]').then(
        ($el) => ($el[0].style.width = '200px')
      );

      cy.get('[data-popover-panel]')
        .should('have.css', 'inline-size', '300px')
        .should('have.css', 'left', '100px');
    });
  });

  describe('truncation', () => {
    const sharedProps = {
      style: { width: 200 },
      options: [
        { label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
    };

    it('defaults to CSS truncation', () => {
      cy.realMount(<EuiComboBox {...sharedProps} />);
      cy.get('[data-test-subj="comboBoxInput"]').realClick();
      cy.get('.euiTextTruncate').should('not.exist');
    });

    it('renders EuiTextTruncate when truncationProps are passed', () => {
      cy.realMount(
        <EuiComboBox
          {...sharedProps}
          truncationProps={{ truncation: 'middle' }}
        />
      );
      cy.get('[data-test-subj="comboBoxInput"]').realClick();
      cy.get('.euiTextTruncate').should('exist');
      cy.get('[data-test-subj="truncatedText"]').should(
        'have.text',
        'Lorem ipsum …iscing elit.'
      );
    });

    it('allows individual option truncationProps to override parent truncationProps', () => {
      cy.realMount(
        <EuiComboBox
          {...sharedProps}
          truncationProps={{ truncation: 'middle' }}
          options={[
            {
              ...sharedProps.options[0],
              truncationProps: { truncation: 'start', truncationOffset: 5 },
            },
          ]}
        />
      );
      cy.get('[data-test-subj="comboBoxInput"]').realClick();
      cy.get('[data-test-subj="truncatedText"]').should(
        'have.text',
        'Lorem…tur adipiscing elit.'
      );
    });

    describe('when searching', () => {
      it('uses start & end truncation position', () => {
        cy.realMount(<EuiComboBox {...sharedProps} />);
        cy.get('[data-test-subj="comboBoxInput"]').realClick();
        cy.realType('sit');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          '…sum dolor sit amet, co…'
        );
      });

      it('does not truncate the start when the found search is near the start', () => {
        cy.realMount(<EuiComboBox {...sharedProps} />);
        cy.get('[data-test-subj="comboBoxInput"]').realClick();
        cy.realType('ipsum');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          'Lorem ipsum dolor sit a…'
        );
      });

      it('does not truncate the end when the found search is near the end', () => {
        cy.realMount(<EuiComboBox {...sharedProps} />);
        cy.get('[data-test-subj="comboBoxInput"]').realClick();
        cy.realType('eli');
        cy.get('[data-test-subj="truncatedText"]').should(
          'have.text',
          '…nsectetur adipiscing elit.'
        );
      });

      it('marks the full available text if the search input is longer than the truncated text', () => {
        cy.realMount(<EuiComboBox {...sharedProps} />);
        cy.get('[data-test-subj="comboBoxInput"]').realClick();
        cy.realType('Lorem ipsum dolor sit amet');
        cy.get('.euiMark').should('have.text', '…rem ipsum dolor sit am…');
      });
    });
  });

  describe('selection', () => {
    describe('delimiter', () => {
      it('selects the option when the delimiter option is typed into the search', () => {
        cy.mount(<StatefulComboBox delimiter="," />);
        cy.get('[data-test-subj="euiComboBoxPill"]').should('not.exist');

        cy.get('[data-test-subj="comboBoxSearchInput"]').click();
        cy.realType('Item 1,');

        cy.get('[data-test-subj="euiComboBoxPill"]').should(
          'have.text',
          'Item 1'
        );
        cy.get('[data-test-subj="comboBoxSearchInput"]').should(
          'have.value',
          ''
        );
      });

      it('does nothing if the item if already selected', () => {
        cy.mount(
          <StatefulComboBox
            delimiter=","
            selectedOptions={[defaultOptions[0]]}
          />
        );
        cy.get('[data-test-subj="euiComboBoxPill"]').should(
          'have.text',
          'Item 1'
        );

        cy.get('[data-test-subj="comboBoxSearchInput"]').click();
        cy.realType('Item 1,');

        cy.get('[data-test-subj="euiComboBoxPill"]').should('have.length', 1);
        cy.get('[data-test-subj="comboBoxSearchInput"]').should(
          'have.value',
          'Item 1,'
        );
        cy.contains("Item 1, doesn't match any options");
      });

      it('still respects enter to select', () => {
        cy.mount(<StatefulComboBox delimiter="," />);
        cy.get('[data-test-subj="euiComboBoxPill"]').should('not.exist');

        cy.get('[data-test-subj="comboBoxSearchInput"]').click();
        cy.realType('Item 1');
        cy.realPress('Enter');

        cy.get('[data-test-subj="euiComboBoxPill"]').should(
          'have.text',
          'Item 1'
        );
      });

      it('adds only one item when pasting duplicated elements', () => {
        cy.realMount(<CreateComboBox />);
        cy.get('[data-test-subj="euiComboBoxPill"]').should('not.exist');

        cy.get('[data-test-subj="comboBoxSearchInput"]').click();

        // Simulate pasting text
        cy.get('[data-test-subj="comboBoxSearchInput"]')
          .clear()
          .invoke('val', 'a, a,  a,   a')
          .trigger('input');
        cy.get('[data-test-subj="comboBoxSearchInput"]').type(' {backspace}');

        cy.realPress('Enter');

        cy.get('[data-test-subj="euiComboBoxPill"]').should('have.length', 1);
        cy.get('[data-test-subj="euiComboBoxPill"]').should('have.text', 'a');
      });
    });

    describe('single selection', () => {
      describe('closes the combobox on dropdown selection, and re-opens on input click', () => {
        it('as pill', () => {
          cy.mount(<StatefulComboBox singleSelection={true} />);
          cy.get('[data-test-subj="comboBoxInput"]').click();

          cy.get('[data-test-subj="comboBoxOptionsList"]')
            .find('button')
            .first()
            .click();
          cy.get('[data-test-subj="comboBoxOptionsList"]').should('not.exist');
          cy.focused().should(
            'have.attr',
            'data-test-subj',
            'comboBoxSearchInput'
          );

          cy.get('[data-test-subj="comboBoxInput"]').click();
          cy.get('[data-test-subj="comboBoxOptionsList"]').should('be.visible');
        });

        it('as plain text', () => {
          cy.mount(
            // @ts-ignore - not totally sure why TS is kicking up a fuss here
            <StatefulComboBox singleSelection={{ asPlainText: true }} />
          );
          cy.get('[data-test-subj="comboBoxSearchInput"]').click();

          cy.get('[data-test-subj="comboBoxOptionsList"]')
            .find('button')
            .first()
            .click();
          cy.get('[data-test-subj="comboBoxOptionsList"]').should('not.exist');
          cy.focused().should(
            'have.attr',
            'data-test-subj',
            'comboBoxSearchInput'
          );

          cy.get('[data-test-subj="comboBoxSearchInput"]').click();
          cy.get('[data-test-subj="comboBoxOptionsList"]').should('be.visible');
        });
      });
    });
  });

  describe('z-index regression testing', () => {
    it('displays the dropdown list above any inherited z-indices from parents', () => {
      cy.mount(
        <EuiFlyout onClose={() => {}} size="s">
          <EuiPopover
            isOpen={true}
            anchorPosition="rightDown"
            closePopover={() => {}}
            button={<EuiButton>Toggle popover</EuiButton>}
          >
            <EuiComboBox options={[{ label: 'Test' }]} />
          </EuiPopover>
        </EuiFlyout>
      );
      cy.wait(500); // Let the flyout finish animating in
      cy.get('[data-test-subj=comboBoxSearchInput]').click();

      cy.get('[data-test-subj="comboBoxOptionsList"]')
        .parents('[data-popover-panel]')
        .should('have.css', 'z-index', '5000');

      // Should be able to click the first option without an error
      // about the popover or flyout blocking the click
      cy.get('[role=option]').click('top');
    });
  });
});
