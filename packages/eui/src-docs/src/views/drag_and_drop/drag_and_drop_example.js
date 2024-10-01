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
  EuiText,
} from '../../../../src/components';

import DragAndDropBare from './drag_and_drop_bare';
const dragAndDropBareSource = require('!!raw-loader!./drag_and_drop_bare');

import DragAndDrop from './drag_and_drop';
const dragAndDropSource = require('!!raw-loader!./drag_and_drop');

import DragAndDropCustomHandle from './drag_and_drop_custom_handle';
const dragAndDropCustomHandleSource = require('!!raw-loader!./drag_and_drop_custom_handle');

import DragAndDropDisableBlocking from './drag_and_drop_disable_blocking';
const dragAndDropDisableBlockingSource = require('!!raw-loader!./drag_and_drop_disable_blocking');

import DragAndDropMoveLists from './drag_and_drop_move_lists';
const dragAndDropMoveListsSource = require('!!raw-loader!./drag_and_drop_move_lists');

import DragAndDropTypes from './drag_and_drop_types';
const dragAndDropTypesSource = require('!!raw-loader!./drag_and_drop_types');

import DragAndDropClone from './drag_and_drop_clone';
const dragAndDropCloneSource = require('!!raw-loader!./drag_and_drop_clone');

import DragAndDropPortal from './drag_and_drop_portal';
const dragAndDropPortalSource = require('!!raw-loader!./drag_and_drop_portal');

import DragAndDropComplex from './drag_and_drop_complex';
const dragAndDropComplexSource = require('!!raw-loader!./drag_and_drop_complex');

export const DragAndDropExample = {
  title: 'Drag and drop',
  intro: (
    <>
      <EuiText>
        <p>
          An extension of{' '}
          <EuiLink href="https://github.com/hello-pangea/dnd">
            @hello-pangea/dnd
          </EuiLink>{' '}
          (which is an actively maintained fork of{' '}
          <EuiLink href="https://github.com/atlassian/react-beautiful-dnd">
            react-beautiful-dnd
          </EuiLink>
          ) with a compatible API and built-in style opinions. Functionality
          results from 3 components working together:
        </p>
        <ul>
          <li>
            <EuiCode>{'<EuiDragDropContext />'}</EuiCode>: Section of your
            application containing the draggable elements and the drop targets.
          </li>
          <li>
            <EuiCode>{'<EuiDroppable />'}</EuiCode>: Area into which items can
            be dropped. Contains one or more{' '}
            <EuiCode>{'<EuiDraggable />'}</EuiCode>.
          </li>
          <li>
            <EuiCode>{'<EuiDraggable />'}</EuiCode>: Items that can be dragged.
            Must be part of an <EuiCode>{'<EuiDroppable />'}</EuiCode>
          </li>
        </ul>
      </EuiText>

      <EuiSpacer />

      <EuiCallOut title="Consider your users, use case" color="warning">
        <p>
          Drag and drop interfaces are not well-adapted to many cases, and may
          be less suitable than other form types for data operations. For
          instance, drag and drop interaction relies heavily on spatial
          orientation that may not be entirely valid to all users (e.g., screen
          readers as the sole source of information). Similarly, users
          navigating by keyboard may not be afforded nuanced, dual-axis drag
          item manipulation.
        </p>
        <p>
          EUI (largely due to the great work already in @hello-pangea/dnd) has
          and will continue to ensure accessibility where possible. With that in
          mind, keep your users&apos; working context in mind.
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Just the facts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropBareSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiDraggable</strong> makes very few assumptions about what
            content it contains. To give affordance to draggable elements and to
            ensure a consistent experience, child elements must be able to
            accept a border and drop shadow (automatically applied via CSS). No
            other style opinions are applied, however.
          </p>
          <p>
            Similarly, <strong>EuiDroppable</strong> must accept a background
            color overlay (automatically applied via CSS), but has no other
            restrictions.
          </p>
          <p>
            All <strong>EuiDragDropContext</strong> elements are discrete and
            isolated; <strong>EuiDroppables</strong> and{' '}
            <strong>EuiDraggables</strong> cannot be shared/transferred between
            instances. Also, <strong>EuiDragDropContexts</strong> cannot be
            nested. It is recommended that a single, high-level{' '}
            <strong>EuiDragDropContext</strong> is used and{' '}
            <strong>EuiDroppables</strong> account for categorical and
            functional separation (see later examples).
          </p>
          <p>
            <strong>EuiDragDropContext</strong> handles all events but makes no
            assumptions about the result of a drop event. As such, the following
            event handlers are available:
          </p>
          <ul>
            <li>
              <EuiCode>onBeforeDragStart</EuiCode>
            </li>
            <li>
              <EuiCode>onDragStart</EuiCode>
            </li>
            <li>
              <EuiCode>onDragUpdate</EuiCode>
            </li>
            <li>
              <EuiCode>onDragEnd</EuiCode> (required)
            </li>
          </ul>
          <p>
            EUI also provides methods for helping to deal to common action
            types:
          </p>
          <ul>
            <li>
              <EuiCode>reorder</EuiCode>:{' '}
              {"change an item's location in a droppable area"}
            </li>
            <li>
              <EuiCode>copy</EuiCode>: create a duplicate of an item in a
              different droppable area
            </li>
            <li>
              <EuiCode>move</EuiCode>: move an item to a differnt droppable area
            </li>
          </ul>
        </>
      ),
      props: { EuiDragDropContext, EuiDraggable, EuiDroppable },
      demo: <DragAndDropBare />,
    },
    {
      title: 'Simple item reorder',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropSource,
        },
      ],
      text: (
        <>
          <p>
            The simplest case, demonstrating a single{' '}
            <strong>EuiDroppable</strong> with <EuiCode>reorder</EuiCode>{' '}
            behavior.
          </p>
          <p>
            Notice the ability to change rendered content based on dragging
            state. <strong>EuiDraggable</strong> <EuiCode>children</EuiCode> is
            a render prop that mush return a <EuiCode>ReactElement</EuiCode>.
            The <EuiCode>snapshot</EuiCode> parameter on that function has state
            data that can be used to alter appearance or behavior (e.g.,{' '}
            <EuiCode>isDragging</EuiCode>).
          </p>
        </>
      ),
      props: { EuiDragDropContext, EuiDraggable, EuiDroppable },
      demo: <DragAndDrop />,
    },
    {
      title: 'Custom drag handle',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropCustomHandleSource,
        },
      ],
      text: (
        <>
          <p>
            By default the entire element surface can initiate a drag. To
            specify an element within as the handle and create a containing
            group, set <EuiCode>customDragHandle=true</EuiCode> and{' '}
            <EuiCode>hasInteractiveChildren=true</EuiCode> on the{' '}
            <strong>EuiDraggable</strong>.
          </p>
          <p>
            The <EuiCode>provided</EuiCode> parameter on the{' '}
            <strong>EuiDraggable</strong> <EuiCode>children</EuiCode> render
            prop has all data required for functionality. Along with the{' '}
            <EuiCode>customDragHandle</EuiCode> flag,
            <EuiCode>provided.dragHandleProps</EuiCode> needs to be added to the
            intended handle element.
          </p>

          <EuiCallOut
            iconType="accessibility"
            title={
              <>
                <strong>Icon-only</strong> custom drag handles require an
                accessible label. Add an{' '}
                <EuiCode>{'aria-label="Drag handle"'}</EuiCode> attribute to
                your React component or HTML element that receives
                <EuiCode>{'provided.dragHandleProps'}</EuiCode>.
              </>
            }
          />
        </>
      ),
      demo: <DragAndDropCustomHandle />,
    },
    {
      title: 'Interactive elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropDisableBlockingSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiDraggable</strong> can contain interactive elements such
            as buttons and form fields. Interactive elements require{' '}
            <EuiCode>customDragHandle=true</EuiCode> and{' '}
            <EuiCode>hasInteractiveChildren=true</EuiCode> on the{' '}
            <strong>EuiDraggable</strong>. These props will maintain drag
            functionality and accessibility, while enabling click, keypress,
            etc., events on the interactive child elements.
          </p>
        </>
      ),
      demo: <DragAndDropDisableBlocking />,
    },
    {
      title: 'Move between lists',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropMoveListsSource,
        },
      ],
      text: (
        <>
          <p>
            By default, all <strong>EuiDroppable</strong> elements are of the
            same type and will accept <strong>EuiDraggable</strong> elements
            from others in the same <strong>EuiDragDropContext</strong>.
          </p>
          <p>
            The EUI <EuiCode>move</EuiCode> method is demonstrated in this
            example.
          </p>
        </>
      ),
      demo: <DragAndDropMoveLists />,
    },
    {
      title: 'Distinguish droppable areas by type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropTypesSource,
        },
      ],
      text: (
        <>
          <p>
            Setting the <EuiCode>type</EuiCode> prop on an{' '}
            <strong>EuiDroppable</strong> element will ensure that it will only
            accept <strong>EuiDraggable</strong> elements from the same type of{' '}
            <strong>EuiDroppable</strong>.
          </p>
          <p>
            Notice that the enabled, compatible <strong>EuiDroppable</strong>{' '}
            elements have a visual change that indicates they can accept the
            actively moving/focused <strong>EuiDraggable</strong> element.
          </p>
        </>
      ),
      demo: <DragAndDropTypes />,
    },
    {
      title: 'Copyable items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropCloneSource,
        },
      ],
      text: (
        <>
          <p>
            For cases where collections of <strong>EuiDraggable</strong>{' '}
            elements are static or can be used in multiple places set{' '}
            <EuiCode language="js">cloneDraggables=true</EuiCode> on the parent{' '}
            <strong>EuiDroppable</strong>. The <strong>EuiDroppable</strong>{' '}
            becomes disabled (does not accept new <strong>EuiDraggable</strong>{' '}
            elements) in this scenario to avoid mixed content intentions.
          </p>
          <p>
            The EUI <EuiCode>copy</EuiCode> method is available and demonstrated
            in the example below. Note that the data point used as
            <EuiCode>draggableId</EuiCode> in <strong>EuiDraggable</strong> must
            change to allow for real duplication.
          </p>
          <p>
            <EuiCode>isRemovable</EuiCode> is used in the example for cloned
            items. This API is likely to change, but currently provides the
            visual changes with drop-to-remove interactions.
          </p>
        </>
      ),
      demo: <DragAndDropClone />,
    },
    {
      title: 'Portalled items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropPortalSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiDraggables</strong> use fixed positioning to render and
            animate the item being dragged. This positioning logic does not work
            as expected when used inside of containers that have their own{' '}
            <EuiLink
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context"
              target="_blank"
            >
              stacking context
            </EuiLink>
            .
          </p>
          <p>
            To ensure dragging works as expected inside e.g.{' '}
            <strong>EuiFlyout</strong>, <strong>EuiModal</strong> or{' '}
            <strong>EuiPopover</strong> use the prop{' '}
            <EuiCode>usePortal</EuiCode> on <strong>EuiDraggable</strong>{' '}
            components. This will render the currently dragged element inside a
            portal appended to the document body (or wherever{' '}
            <strong>EuiPortal</strong> is configured to{' '}
            <EuiCode>insert</EuiCode> to by default).
          </p>
          <EuiCallOut color="warning" title="Style inheritance">
            <p>
              If the styling of the your draggable content is scoped to a parent
              component, the styling won't be applied while dragging it when
              using <EuiCode>usePortal</EuiCode>. This is due to the portalled
              position in the DOM, which changes previous hierarchical relations
              to other ancestor elements. To prevent this from happening, we
              recommend applying styling from within the{' '}
              <strong>EuiDraggable</strong> scope without any parent selectors.
            </p>
          </EuiCallOut>
        </>
      ),
      snippet: `<EuiDragDropContext onDragEnd={onDragEnd}>
  <EuiDroppable droppableId="DROPPABLE_AREA">
    <EuiDraggable
        spacing="m"
        key="DRAGGABLE_ID"
        index={0}
        draggableId="DRAGGABLE_ID"
        usePortal
      >
        {(provided, state) => (
          <EuiPanel hasShadow={state.isDragging}>
            Item 1
            {state.isDragging && ' ✨'}
          </EuiPanel>
        )}
      </EuiDraggable>
  </EuiDroppable>
  </EuiDragDropContext>`,
      demo: <DragAndDropPortal />,
    },
    {
      title: 'Kitchen sink',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropComplexSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiDraggables</strong> in <strong>EuiDroppables</strong>,{' '}
            <strong>EuiDroppables</strong> in <strong>EuiDraggables</strong>,
            custom drag handles, horizontal movement, vertical movement,
            flexbox, panel inception, you name it.
          </p>
        </>
      ),
      demo: <DragAndDropComplex />,
    },
  ],
};
