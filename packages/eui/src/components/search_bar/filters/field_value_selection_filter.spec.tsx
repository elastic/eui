/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../../cypress/support" />

import React, { useState } from 'react';
import { requiredProps } from '../../../test';
import {
  FieldValueSelectionFilter,
  FieldValueSelectionFilterProps,
  FieldValueSelectionFilterConfigType,
} from './field_value_selection_filter';
import { Query } from '../query';

const staticOptions = [
  {
    value: 'feature',
  },
  {
    value: 'test',
    name: 'Text',
  },
  {
    value: 'bug',
    name: 'Bug',
    view: <div>bug</div>,
  },
];

describe('FieldValueSelectionFilter', () => {
  const FieldValueSelectionFilterWithState = (
    config: Partial<FieldValueSelectionFilterConfigType>
  ) => {
    const [query, setQuery] = useState(Query.parse(''));
    const onChange = (newQuery: Query) => setQuery(newQuery);

    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange,
      query,
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: staticOptions,
        ...config,
      },
    };

    return <FieldValueSelectionFilter {...props} />;
  };

  it('allows options as a function', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: () => Promise.resolve(staticOptions),
      },
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    cy.get('[data-test-subj="euiSelectableList"] li')
      .first()
      .should('have.attr', 'title', 'feature');
  });

  it('allows options as an array', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: staticOptions,
      },
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    cy.get('[data-test-subj="euiSelectableList"] li')
      .eq(1)
      .should('have.attr', 'title', 'Text');
  });

  it('allows fields in options', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        name: 'Tag',
        options: [
          {
            field: 'tag',
            value: 'feature',
          },
          {
            field: 'tag_2',
            value: 'test',
            name: 'Text',
          },
          {
            field: 'tag_3',
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    cy.get('[data-test-subj="euiSelectableList"] li')
      .eq(2)
      .should('have.attr', 'title', 'Bug');
  });

  it('allows all configurations', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: true,
        available: () => false,
        loadingMessage: 'loading...',
        noOptionsMessage: 'oops...',
        searchThreshold: 5,
        options: () => Promise.resolve([]),
      },
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    cy.get('[data-test-subj="euiSelectableMessage"]').should(
      'have.text',
      'oops...'
    );
  });

  describe('multi-select testing', () => {
    it('uses multi-select OR', () => {
      cy.mount(<FieldValueSelectionFilterWithState multiSelect="or" />);
      cy.get('button').click();

      cy.get('li[role="option"][title="feature"]')
        .should('have.attr', 'aria-checked', 'false')
        .click();
      cy.get('.euiNotificationBadge').should('have.text', '1');
      cy.get('li[role="option"][title="feature"]').should(
        'have.attr',
        'aria-checked',
        'true'
      );
      // Popover should still be open when multiselect is true/or
      cy.get('li[role="option"][title="Bug"]')
        .should('have.attr', 'aria-checked', 'false')
        .click();
      cy.get('.euiNotificationBadge').should('have.text', '2');
      cy.get('li[role="option"][title="Bug"]').should(
        'have.attr',
        'aria-checked',
        'true'
      );
    });

    it('uses multi-select false', () => {
      cy.mount(<FieldValueSelectionFilterWithState multiSelect={false} />);
      cy.get('button').click();

      cy.get('li[role="option"][title="feature"]')
        .should('have.attr', 'aria-checked', 'false')
        .click();
      cy.get('.euiNotificationBadge').should('have.text', '1');
      cy.get('li[role="option"][title="feature"]').should(
        'have.attr',
        'aria-checked',
        'true'
      );

      // Multiselect false should close the popover, so we need to re-open it
      cy.get('button').click();
      cy.get('li[role="option"][title="Bug"]')
        .should('have.attr', 'aria-checked', 'false')
        .click();
      // Filter count should have remained at 1
      cy.get('.euiNotificationBadge').should('have.text', '1');
      cy.get('li[role="option"][title="Bug"]').should(
        'have.attr',
        'aria-checked',
        'true'
      );
      // 'featured' should now be unchecked
      cy.get('li[role="option"][title="feature"]').should(
        'have.attr',
        'aria-checked',
        'false'
      );
    });
  });

  describe('auto-close testing', () => {
    const selectFilter = () => {
      // Open popover
      cy.get('button').click();
      cy.get('.euiPopover__panel').should('exist');

      // Select filter option
      cy.get('li[role="option"][title="feature"]')
        .should('have.attr', 'aria-checked', 'false')
        .click();
    };

    describe('undefined', () => {
      it('multi select: does not close popover', () => {
        cy.mount(
          <FieldValueSelectionFilterWithState
            autoClose={undefined}
            multiSelect={true}
          />
        );
        selectFilter();
        cy.get('.euiPopover__panel').should('exist');
      });

      it('single select: closes popover', () => {
        cy.mount(
          <FieldValueSelectionFilterWithState
            autoClose={undefined}
            multiSelect={false}
          />
        );
        selectFilter();
        cy.get('.euiPopover__panel').should('not.exist');
      });
    });

    describe('false', () => {
      it('multi select: never closes popover', () => {
        cy.mount(
          <FieldValueSelectionFilterWithState
            autoClose={false}
            multiSelect={true}
          />
        );
        selectFilter();
        cy.get('.euiPopover__panel').should('exist');
      });

      it('single select: never closes popover', () => {
        cy.mount(
          <FieldValueSelectionFilterWithState
            autoClose={false}
            multiSelect={false}
          />
        );
        selectFilter();
        cy.get('.euiPopover__panel').should('exist');
      });
    });

    describe('true', () => {
      it('multi select: always closes popover', () => {
        cy.mount(
          <FieldValueSelectionFilterWithState
            autoClose={true}
            multiSelect={true}
          />
        );
        selectFilter();
        cy.get('.euiPopover__panel').should('not.exist');
      });

      it('single select: always closes popover', () => {
        cy.mount(
          <FieldValueSelectionFilterWithState
            autoClose={true}
            multiSelect={false}
          />
        );

        selectFilter();
        cy.get('.euiPopover__panel').should('not.exist');
      });
    });
  });

  describe('autoSortOptions', () => {
    const getOptions = () => cy.get('.euiSelectableListItem');

    it('sorts selected options to the top by default', () => {
      cy.mount(<FieldValueSelectionFilterWithState />);
      cy.get('button').click();
      getOptions().should('have.length', 3);

      getOptions().last().should('have.attr', 'title', 'Bug').click();
      // Should have moved to the top of the list and retained active focus
      getOptions()
        .first()
        .should('have.attr', 'title', 'Bug')
        .should('have.attr', 'aria-checked', 'true')
        .should('have.attr', 'aria-selected', 'true');
    });

    it('does not sort selected options to the top when set to false', () => {
      cy.mount(<FieldValueSelectionFilterWithState autoSortOptions={false} />);
      cy.get('button').click();
      getOptions().should('have.length', 3);

      getOptions().last().should('have.attr', 'title', 'Bug').click();
      getOptions()
        .last()
        .should('have.attr', 'title', 'Bug')
        .should('have.attr', 'aria-checked', 'true')
        .should('have.attr', 'aria-selected', 'true');
    });
  });

  it('has inactive filters, field is global', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: staticOptions,
      },
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    cy.get('[data-test-subj="euiSelectableList"] li')
      .first()
      .should('have.attr', 'title', 'feature');
  });

  it('has active filters, field is global', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('tag:bug'),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: staticOptions,
      },
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    cy.get('.euiNotificationBadge').should('not.be.undefined');
    cy.get('[data-test-subj="euiSelectableList"] li')
      .first()
      .should('have.attr', 'title', 'Bug');
  });

  it('has inactive filters, fields in options', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        name: 'Tag',
        options: [
          {
            field: 'tag',
            value: 'feature',
          },
          {
            field: 'tag_2',
            value: 'test',
            name: 'Text',
          },
          {
            field: 'tag_3',
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    cy.get('[data-test-subj="euiSelectableList"] li')
      .eq(2)
      .should('have.attr', 'title', 'Bug');
  });

  it('has active filters, fields in options', () => {
    const props: FieldValueSelectionFilterProps = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse('tag_3:bug'),
      config: {
        type: 'field_value_selection',
        name: 'Tag',
        options: [
          {
            field: 'tag',
            value: 'feature',
          },
          {
            field: 'tag_2',
            value: 'test',
            name: 'Text',
          },
          {
            field: 'tag_3',
            value: 'bug',
            name: 'Bug',
            view: <div>bug</div>,
          },
        ],
      },
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    cy.get('.euiNotificationBadge').should('not.be.undefined');
    cy.get('[data-test-subj="euiSelectableList"] li')
      .eq(0)
      .should('have.attr', 'title', 'Bug');
  });

  it('caches options if options is a function and config.cache is set', () => {
    // Note: cy.clock()/cy.tick() doesn't currently work in Cypress component testing :T
    // We should use that instead of cy.wait once https://github.com/cypress-io/cypress/issues/28846 is fixed
    const props: FieldValueSelectionFilterProps = {
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        cache: 5000, // Cache the loaded tags for 5 seconds
        options: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(staticOptions);
            }, 1000); // Spoof 1 second load time
          }),
      },
    };
    cy.spy(props.config, 'options');

    const reducedTimeout = { timeout: 10 };
    const assertIsLoading = (expected?: Function) => {
      cy.get('.euiSelectableListItem', reducedTimeout).should('have.length', 0);
      cy.get('[data-test-subj="euiSelectableMessage"]', reducedTimeout)
        .should('have.text', 'Loading options')
        .then(() => {
          expected?.();
        });
    };
    const assertIsLoaded = (expected?: Function) => {
      cy.get('.euiSelectableListItem', reducedTimeout).should('have.length', 3);
      cy.get('[data-test-subj="euiSelectableMessage"]', reducedTimeout)
        .should('not.exist')
        .then(() => {
          expected?.();
        });
    };

    cy.mount(<FieldValueSelectionFilter {...props} />);
    cy.get('button').click();
    assertIsLoading();

    // Wait out the async options loader
    cy.wait(1000);
    assertIsLoaded(() => expect(props.config.options).to.be.calledOnce);

    // Close and re-open the popover
    cy.get('button').click();
    cy.get('button').click();

    // Cached options should immediately repopulate
    assertIsLoaded(() => expect(props.config.options).to.be.calledOnce);

    // Wait out the remainder of the cache, loading state should initiate again
    cy.get('button').click();
    cy.wait(5000);
    cy.get('button').click();
    assertIsLoading(() => expect(props.config.options).to.be.calledTwice);
  });
});
