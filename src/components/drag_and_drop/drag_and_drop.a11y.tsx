/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiDragDropContext } from './drag_drop_context';
import { euiDragDropReorder } from './services';
import { EuiDraggable } from './draggable';
import { EuiDroppable } from './droppable';
import { EuiPanel } from '../panel';
import { htmlIdGenerator } from '../../services';

const makeId = htmlIdGenerator();

const makeList = (number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map((el) => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    };
  });

const DragAndDrop = () => {
  const [list, setList] = useState(makeList(3));
  console.log(list);
  const onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      const items = euiDragDropReorder(list, source.index, destination.index);
      setList(items);
    }
  };

  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiDroppable droppableId="DROPPABLE_AREA" spacing="m" withPanel>
        {list.map(({ content, id }, idx) => (
          <EuiDraggable
            spacing="m"
            key={id}
            index={idx}
            draggableId={id}
            data-test-subj={`cy-draggable-${idx}`}
          >
            {(provided, state) => (
              <EuiPanel hasShadow={state.isDragging}>
                {content}
                {state.isDragging && ' ✨'}
              </EuiPanel>
            )}
          </EuiDraggable>
        ))}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};

beforeEach(() => {
  cy.realMount(<DragAndDrop />);
});

describe('EuiControlBar', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on render', () => {
      cy.checkAxe();
    });

    it('has zero violations when an item is in draggable state', () => {
      cy.repeatRealPress('Tab');
      cy.realPress('Space');
      cy.get('div[data-test-subj="cy-draggable-1"]').should('have.focus');
      cy.checkAxe();
    });

    it('has zero violations when an item has been reordered and dropped', () => {
      cy.repeatRealPress('Tab');
      cy.realPress('Space');
      cy.get('div[data-test-subj="cy-draggable-1"]').should('have.focus');
      cy.realPress('ArrowDown');
      cy.realPress('Space');
      cy.get('div[data-test-subj="cy-draggable-2"]').should('have.focus');
      cy.realPress('Space');
      cy.repeatRealPress('ArrowUp');
      cy.realPress('Space');
      cy.get('div[data-test-subj="cy-draggable-0"]').should('have.focus');
      cy.checkAxe();
    });
  });
});
