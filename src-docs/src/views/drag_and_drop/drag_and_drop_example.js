import React from 'react';
import { GuideSectionTypes } from '../../components';
import {
  EuiCallOut,
  EuiCode,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiLink,
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
          An extension of <EuiLink href="https://github.com/atlassian/react-beautiful-dnd">react-beautiful-dnd</EuiLink> with a compatible API and built-in style opinions.
          Functionality results from 3 components working together:
        </p>
        <ul>
          <li>
            <EuiCode>{`<EuiDragDropContext />`}</EuiCode>: Defines the part of your application that has drag and drop enabled.
          </li>
          <li>
            <EuiCode>{`<EuiDroppable />`}</EuiCode>: Defines the area into which items can be dropped. Contains {`<EuiDraggable />`}s.
          </li>
          <li>
            <EuiCode>{`<EuiDraggable />`}</EuiCode>: Defines the items that can be dragged
          </li>
        </ul>
      </EuiText>

      <EuiSpacer />

      <EuiCallOut
        title="We have concerns"
        color="warning"
      >
        <p>
          {`Several things to discuss here, including usability, a11y, and the early nature (dare we say "beta"?) of these comopnents.
            Coming soon.`}
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
        <React.Fragment>
          <p>
            <EuiCode>EuiDraggable</EuiCode> makes very few assumptions about what content it contains.
            To give affordance to draggbale elements and to ensure a consistent experience, child elements
            must be able to accept a border and drop shadow (automatically applied via CSS). No other style opinions are applied, however.
          </p>
          <p>
            Similarly, <EuiCode>EuiDroppable</EuiCode> must accept a background color overlay (automatically applied via CSS),
            but has no other restrictions.
          </p>
          <p>
            <EuiCode>EuiDragDropContext</EuiCode> handles all eventing but makes no assumptions about the result of a drop event.
            As such, the following event responder props are available (none of which are in use in the following example):
          </p>
          <ul>
            <li><EuiCode>onBeforeDragStart</EuiCode></li>
            <li><EuiCode>onDragStart</EuiCode></li>
            <li><EuiCode>onDragUpdate</EuiCode></li>
            <li><EuiCode>onDragEnd</EuiCode></li>
          </ul>
          <p>
            EUI also provides methods for helping to deal to common action types (none of which are in use in the following example):
          </p>
          <ul>
            <li><EuiCode>reorder</EuiCode>: {`change an item's location in a droppable area`}</li>
            <li><EuiCode>copy</EuiCode>: create a duplicate of an item in a different droppable area</li>
            <li><EuiCode>move</EuiCode>: move an item to a differnt droppable area</li>
          </ul>
        </React.Fragment>
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
          The simplest case, demonstrating a single <EuiCode>EuiDroppable</EuiCode> with <EuiCode>reorder</EuiCode> behavior.
          Notice the ability to change rendered content based on dragging state.
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
