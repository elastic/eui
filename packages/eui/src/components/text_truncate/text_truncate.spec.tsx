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

import React from 'react';

import { EuiTextTruncate } from './text_truncate';

describe('EuiTextTruncate', () => {
  const props = {
    id: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    width: 200,
  };

  const getTruncatedText = (selector = '#text') =>
    cy.get(`${selector} [data-test-subj="truncatedText"]`);

  it('does not render truncated text if no truncation is needed', () => {
    cy.mount(<EuiTextTruncate {...props} text="Hello world" />);
    cy.get('#text').should('not.have.attr', 'title');
    cy.get('#text [data-test-subj="fullText"]').should(
      'have.text',
      'Hello world'
    );
    getTruncatedText().should('not.exist');
  });

  it('renders truncated text and a title when truncation is needed', () => {
    cy.mount(<EuiTextTruncate {...props} />);
    cy.get('#text').should('have.attr', 'title', props.text);
    cy.get('#text [data-test-subj="fullText"]').should('have.text', props.text);
    getTruncatedText().should('exist');
  });

  describe('truncation', () => {
    const expectedMiddleOutput = 'Lorem ipsum d…adipiscing elit';
    const expectedStartOutput = '…t, consectetur adipiscing elit';
    const expectedEndOutput = 'Lorem ipsum dolor sit amet, …';
    const expectedStartEndOutput = '…lor sit amet, consectetur a…';

    describe('middle', () => {
      it('truncates and inserts ellispes in the middle of the text', () => {
        cy.mount(<EuiTextTruncate {...props} truncation="middle" />);
        getTruncatedText().should('have.text', expectedMiddleOutput);
      });

      it('ignores `truncationOffset` and `truncationPosition`', () => {
        cy.mount(
          <EuiTextTruncate
            {...props}
            truncation="middle"
            truncationOffset={5}
            truncationPosition={20}
          />
        );
        getTruncatedText().should('have.text', expectedMiddleOutput);
      });
    });

    describe('start', () => {
      it('truncates and inserts ellispis at the start of the text', () => {
        cy.mount(<EuiTextTruncate {...props} truncation="start" />);
        getTruncatedText().should('have.text', expectedStartOutput);
      });

      describe('truncationOffset', () => {
        it('preserves starting characters with `truncationOffset`', () => {
          cy.mount(
            <EuiTextTruncate
              {...props}
              truncation="start"
              truncationOffset={5}
            />
          );
          getTruncatedText().should(
            'have.text',
            'Lorem…ectetur adipiscing elit'
          );
        });

        it('ignores truncationOffset if larger than the text length', () => {
          cy.mount(
            <EuiTextTruncate
              {...props}
              truncation="start"
              truncationOffset={100}
            />
          );
          getTruncatedText().should('have.text', expectedStartOutput);
        });
      });
    });

    describe('end', () => {
      it('truncates and inserts ellispis at the end of the text', () => {
        cy.mount(<EuiTextTruncate {...props} truncation="end" />);
        getTruncatedText().should('have.text', expectedEndOutput);
      });

      describe('truncationOffset', () => {
        it('preserves ending characters with `truncationOffset`', () => {
          cy.mount(
            <EuiTextTruncate
              {...props}
              truncation="end"
              truncationOffset={10}
            />
          );
          getTruncatedText().should(
            'have.text',
            'Lorem ipsum dolor …scing elit'
          );
        });

        it('ignores truncationOffset if larger than the text length', () => {
          cy.mount(
            <EuiTextTruncate
              {...props}
              truncation="end"
              truncationOffset={100}
            />
          );
          getTruncatedText().should('have.text', expectedEndOutput);
        });
      });
    });

    describe('startEnd', () => {
      it('truncates and inserts ellipses at both the start and end of the text', () => {
        cy.mount(<EuiTextTruncate {...props} truncation="startEnd" />);
        getTruncatedText().should('have.text', expectedStartEndOutput);
      });

      it('ignores `truncationOffset`', () => {
        cy.mount(
          <EuiTextTruncate
            {...props}
            truncation="startEnd"
            truncationOffset={10}
          />
        );
        getTruncatedText().should('have.text', expectedStartEndOutput);
      });

      describe('truncationPosition', () => {
        it('allows customizing the anchor at which the truncation is positioned from', () => {
          cy.mount(
            <>
              <EuiTextTruncate
                {...props}
                id="text1"
                truncation="startEnd"
                truncationPosition={15}
              />
              <EuiTextTruncate
                {...props}
                id="text2"
                truncation="startEnd"
                truncationPosition={35}
              />
            </>
          );
          getTruncatedText('#text1').should(
            'have.text',
            '…rem ipsum dolor sit amet, …'
          );
          getTruncatedText('#text2').should(
            'have.text',
            '…amet, consectetur adipisci…'
          );
        });

        it('does not display the leading ellipsis if the anchor is close enough to the start', () => {
          cy.mount(
            <EuiTextTruncate
              {...props}
              truncation="startEnd"
              truncationPosition={5}
            />
          );
          getTruncatedText().should('have.text', expectedEndOutput);
        });

        it('does not display the leading ellipsis if the anchor position is <= 0', () => {
          cy.mount(
            <>
              <EuiTextTruncate
                {...props}
                id="text1"
                truncation="startEnd"
                truncationPosition={0}
              />
              <EuiTextTruncate
                {...props}
                id="text2"
                truncation="startEnd"
                truncationPosition={-100}
              />
            </>
          );
          getTruncatedText('#text1').should('have.text', expectedEndOutput);
          getTruncatedText('#text2').should('have.text', expectedEndOutput);
        });

        it('does not display the trailing ellipsis if the anchor is close enough to the end', () => {
          cy.mount(
            <EuiTextTruncate
              {...props}
              truncation="startEnd"
              truncationPosition={42}
            />
          );
          getTruncatedText().should('have.text', expectedStartOutput);
        });

        it('does not display the trailing ellipsis if the anchor position is >= the text length', () => {
          cy.mount(
            <>
              <EuiTextTruncate
                {...props}
                id="text1"
                truncation="startEnd"
                truncationPosition={props.text.length}
              />
              <EuiTextTruncate
                {...props}
                id="text2"
                truncation="startEnd"
                truncationPosition={100}
              />
            </>
          );
          getTruncatedText('#text1').should('have.text', expectedStartOutput);
          getTruncatedText('#text2').should('have.text', expectedStartOutput);
        });
      });
    });
  });

  describe('ellipsis', () => {
    it('allows customizing the symbols used to represent an ellipsis', () => {
      cy.mount(
        <>
          <EuiTextTruncate
            {...props}
            id="text1"
            truncation="middle"
            ellipsis="[...]"
          />
          <EuiTextTruncate
            {...props}
            id="text2"
            truncation="startEnd"
            ellipsis="--"
          />
        </>
      );
      getTruncatedText('#text1').should(
        'have.text',
        'Lorem ipsum [...]dipiscing elit'
      );
      getTruncatedText('#text2').should(
        'have.text',
        '--lor sit amet, consectetur a--'
      );
    });

    it("does not render if the container isn't wide enough for the ellipsis", () => {
      cy.window().then((win) => {
        cy.wrap(cy.spy(win.console, 'error')).as('spyConsoleError');
      });
      cy.mount(
        <>
          <EuiTextTruncate
            {...props}
            id="text1"
            truncation="startEnd"
            width={20}
          />
          <EuiTextTruncate
            {...props}
            id="text2"
            ellipsis="A ridiculously long ellipsis, longer than the container"
          />
        </>
      );
      getTruncatedText('#text1').should('have.text', '');
      getTruncatedText('#text2').should('have.text', '');

      cy.get('@spyConsoleError')
        .should(
          'be.calledWith',
          'The truncation ellipsis is larger than the available width. No text can be rendered.'
        )
        .should('be.calledTwice');
    });
  });

  describe('children', () => {
    it('allows customizing the rendered text via a render prop', () => {
      cy.mount(
        <EuiTextTruncate {...props}>
          {(text) => <span data-test-subj="test">{text}</span>}
        </EuiTextTruncate>
      );
      cy.get('[data-test-subj="test"]').should('exist');
    });
  });

  describe('resize observer behavior', () => {
    it('renders a resize observer if `width` is not passed', () => {
      cy.viewport(200, 50);
      cy.mount(<EuiTextTruncate {...props} width={undefined} />);
      getTruncatedText().should('have.text', 'Lorem ipsum dolor sit amet, …');

      cy.viewport(100, 50);
      getTruncatedText().should('have.text', 'Lorem ipsum…');
    });
  });
});
