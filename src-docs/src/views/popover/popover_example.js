import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Popover from './popover';
const popoverSource = require('!!raw-loader!./popover');
const popoverHtml = renderToHtml(Popover);

import TrapFocus from './trap_focus';
const trapFocusSource = require('!!raw-loader!./trap_focus');
const trapFocusHtml = renderToHtml(TrapFocus);

import PopoverAnchorPosition from './popover_anchor_position';
const popoverAnchorPositionSource = require('!!raw-loader!./popover_anchor_position');
const popoverAnchorPositionHtml = renderToHtml(PopoverAnchorPosition);

import PopoverPanelClassName from './popover_panel_class_name';
const popoverPanelClassNameSource = require('!!raw-loader!./popover_panel_class_name');
const popoverPanelClassNameHtml = renderToHtml(PopoverPanelClassName);

import PopoverWithTitle from './popover_with_title';
const popoverWithTitleSource = require('!!raw-loader!./popover_with_title');
const popoverWithTitleHtml = renderToHtml(PopoverWithTitle);

import PopoverWithTitlePadding from './popover_with_title_padding';
const popoverWithTitlePaddingSource = require('!!raw-loader!./popover_with_title_padding');
const popoverWithTitlePaddingHtml = renderToHtml(PopoverWithTitlePadding);

export const PopoverExample = {
  title: 'Popover',
  sections: [{
    title: 'Popover',
    source: [{
      type: GuideSectionTypes.JS,
      code: popoverSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: popoverHtml,
    }],
    text: (
      <p>
        Use the Popover component to hide controls or options behind a clickable element.
      </p>
    ),
    demo: <Popover />,
  }, {
    title: 'Trap focus',
    source: [{
      type: GuideSectionTypes.JS,
      code: trapFocusSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: trapFocusHtml,
    }],
    text: (
      <p>
        If the Popover should be responsible for trapping the focus within itself (as opposed
        to a child component), then you should set <EuiCode>ownFocus</EuiCode>.
      </p>
    ),
    demo: <TrapFocus />,
  }, {
    title: 'Anchor position',
    source: [{
      type: GuideSectionTypes.JS,
      code: popoverAnchorPositionSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: popoverAnchorPositionHtml,
    }],
    text: (
      <div>
        <p>
          The alignment and arrow on your popover can be set with
          the <EuiCode>anchorPostion</EuiCode> prop. These positions will not
          update based upon screen real estate and will stick to the positions
          you declare. Because of this,
          <strong>be careful when using left or right positioning</strong>.
        </p>
        <p><strong>Some tips:</strong></p>
        <ul>
          <li>
            The first word in the <EuiCode>anchorPosition</EuiCode> denotes
            where the popover will appear relative to the button.
          </li>
          <li>
            The second word in the <EuiCode>anchorPosition</EuiCode> denotes
            where the gravity / pin position will appear relative to the popover.
          </li>
        </ul>
      </div>
    ),
    demo: <PopoverAnchorPosition />,
  }, {
    title: 'Popover with title',
    source: [{
      type: GuideSectionTypes.JS,
      code: popoverWithTitleSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: popoverWithTitleHtml,
    }],
    text: (
      <div>
        <p>
          Popovers often have need for titling. This can be applied through
          a prop or used separately as its own component
          <EuiCode>EuiPopoverTitle</EuiCode> nested somwhere in the child
          prop.
        </p>
      </div>
    ),
    demo: <PopoverWithTitle />,
  }, {
    title: 'Panel class name and padding size',
    source: [{
      type: GuideSectionTypes.JS,
      code: popoverPanelClassNameSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: popoverPanelClassNameHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>panelPaddingSize</EuiCode> prop to adjust the padding
        on the panel within the panel. Use the <EuiCode>panelClassName</EuiCode> prop
        to pass a custom class to the panel. inside a popover.
      </p>
    ),
    demo: <PopoverPanelClassName />,
  }, {
    title: 'Popover with title and padding size',
    source: [{
      type: GuideSectionTypes.JS,
      code: popoverWithTitlePaddingSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: popoverWithTitlePaddingHtml,
    }],
    text: (
      <div>
        <p>
          When using popover titles, you can still propogate the padding size
          by using <EuiCode>panelPaddingSize</EuiCode>. This will only affect
          the horizontal padding of the title and the overall padding of the content.
        </p>
      </div>
    ),
    demo: <PopoverWithTitlePadding />,
  }],
};
