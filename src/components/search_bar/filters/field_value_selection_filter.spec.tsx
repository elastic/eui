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
    const FieldValueSelectionFilterWithState = ({
      multiSelect,
    }: {
      multiSelect: 'or' | boolean;
    }) => {
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
          multiSelect,
          options: staticOptions,
        },
      };

      return <FieldValueSelectionFilter {...props} />;
    };

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
});
