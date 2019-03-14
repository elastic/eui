import React from 'react';
import { GuideSectionTypes } from '../../components';
import {
  EuiCallOut,
  EuiCode,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiSpacer,
  EuiText
} from '../../../../src/components';
import { renderToHtml } from '../../services';

import DragAndDropBare from './drag_and_drop_bare';
const dragAndDropBareSource = require('!!raw-loader!./drag_and_drop_bare');
const dragAndDropBareHtml = renderToHtml(DragAndDropBare);

import DragAndDrop from './drag_and_drop';
const dragAndDropSource = require('!!raw-loader!./drag_and_drop');
const dragAndDropHtml = renderToHtml(DragAndDrop);

import DragAndDropCustomHandle from './drag_and_drop_custom_handle';
const dragAndDropCustomHandleSource = require('!!raw-loader!./drag_and_drop_custom_handle');
const dragAndDropCustomHandleHtml = renderToHtml(DragAndDropCustomHandle);

import DragAndDropMoveLists from './drag_and_drop_move_lists';
const dragAndDropMoveListsSource = require('!!raw-loader!./drag_and_drop_move_lists');
const dragAndDropMoveListsHtml = renderToHtml(DragAndDropMoveLists);

import DragAndDropTypes from './drag_and_drop_types';
const dragAndDropTypesSource = require('!!raw-loader!./drag_and_drop_types');
const dragAndDropTypesHtml = renderToHtml(DragAndDropTypes);

import DragAndDropClone from './drag_and_drop_clone';
const dragAndDropCloneSource = require('!!raw-loader!./drag_and_drop_clone');
const dragAndDropCloneHtml = renderToHtml(DragAndDropClone);

export const DragAndDropExample = {
  title: 'Drag And Drop',
  intro: (
    <React.Fragment>
      <EuiText>
        <p>
          An extension of <EuiCode>react-beautiful-dnd</EuiCode> with a compatible API. Coming soon.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiCallOut
        title="We have concerns"
        color="warning"
      >
        <p>
          {'Several things to discuss here, including usability, a11y, and the early nature (dare we say "beta"?) of these comopnents.'}
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </React.Fragment>
  ),
  sections: [
    {
      title: 'Just the facts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropBareSource
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropBareHtml
        }
      ],
      text: (
        <p>
          Coming soon.
        </p>
      ),
      props: { EuiDragDropContext, EuiDraggable, EuiDroppable },
      demo: <DragAndDropBare />
    },
    {
      title: 'Simple item reorder',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropSource
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropHtml
        }
      ],
      text: (
        <p>
          Coming soon.
        </p>
      ),
      props: { EuiDragDropContext, EuiDraggable, EuiDroppable },
      demo: <DragAndDrop />
    },
    {
      title: 'Custom drag handle',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropCustomHandleSource
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropCustomHandleHtml
        }
      ],
      text: (
        <p>
          Coming soon.
        </p>
      ),
      demo: <DragAndDropCustomHandle />
    },
    {
      title: 'Move between lists',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropMoveListsSource
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropMoveListsHtml
        }
      ],
      text: (
        <p>
          Coming soon.
        </p>
      ),
      demo: <DragAndDropMoveLists />
    },
    {
      title: 'Distinguishing droppable areas by type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropTypesSource
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropTypesHtml
        }
      ],
      text: (
        <p>
          Coming soon.
        </p>
      ),
      demo: <DragAndDropTypes />
    },
    {
      title: 'Copyable items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropCloneSource
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropCloneHtml
        }
      ],
      text: (
        <p>
          Coming soon.
        </p>
      ),
      demo: <DragAndDropClone />
    }
  ]
};
