import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Button from './button';
const buttonSource = require('!!raw-loader!./button');
const buttonHtml = renderToHtml(Button);

import ButtonWithIcon from './button_with_icon';
const buttonWithIconSource = require('!!raw-loader!./button_with_icon');
const buttonWithIconHtml = renderToHtml(Button);

import ButtonOption from './button_empty';
const buttonOptionSource = require('!!raw-loader!./button_empty');
const buttonOptionHtml = renderToHtml(ButtonOption);

import ButtonOptionFlush from './button_empty_flush';
const buttonOptionFlushSource = require('!!raw-loader!./button_empty_flush');
const buttonOptionFlushHtml = renderToHtml(ButtonOptionFlush);

import ButtonIcon from './button_icon';
const buttonIconSource = require('!!raw-loader!./button_icon');
const buttonIconHtml = renderToHtml(ButtonIcon);

import ButtonGhost from './button_ghost';
const buttonGhostSource = require('!!raw-loader!./button_ghost');
const buttonGhostHtml = renderToHtml(ButtonGhost);

import ButtonAsLink from './button_as_link';
const buttonAsLinkSource = require('!!raw-loader!./button_as_link');
const buttonAsLinkHtml = renderToHtml(ButtonAsLink);

export const ButtonExample = {
  title: 'Button',
  sections: [{
    title: 'Button',
    source: [{
      type: GuideSectionTypes.JS,
      code: buttonSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: buttonHtml,
    }],
    text: (
      <p>
        Button <EuiCode>type</EuiCode> defines the color of the button.
        <EuiCode>fill</EuiCode> can be optionally added to add more focus to an action.
      </p>
    ),
    demo: <Button />,
  }, {
    title: 'Buttons can also be links',
    source: [{
      type: GuideSectionTypes.JS,
      code: buttonAsLinkSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: buttonAsLinkHtml,
    }],
    text: (
      <p>
        Buttons will use an <EuiCode>{'<a>'}</EuiCode> tag
        if there is a <EuiCode>href</EuiCode> prop present.
      </p>
    ),
    demo: <ButtonAsLink />,
  }, {
    title: 'Button with Icon',
    source: [{
      type: GuideSectionTypes.JS,
      code: buttonWithIconSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: buttonWithIconHtml,
    }],
    text: (
      <p>
        The passed icon needs to come from our list of svg icons. Can be flipped {
          // eslint-disable-next-line react/no-unescaped-entities
        } to the other side by passing <EuiCode>iconSide="right"</EuiCode>.
      </p>
    ),
    demo: <ButtonWithIcon />,
  }, {
    title: 'ButtonEmpty',
    source: [{
      type: GuideSectionTypes.JS,
      code: buttonOptionSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: buttonOptionHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiButtonEmpty</EuiCode> is used when you want to make
        a button look like a regular link, but still want to align it to
        the rest of the buttons.
      </p>
    ),
    demo: <ButtonOption />,
  }, {
    title: 'Flush ButtonEmpty',
    source: [{
      type: GuideSectionTypes.JS,
      code: buttonOptionFlushSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: buttonOptionFlushHtml,
    }],
    text: (
      <p>
        When aligning <EuiCode>EuiButtonEmpty</EuiCode> components to the left or the right,
        you should make sure they&rsquo;re flush with the edge of their container, so that they&rsquo;re
        horizontally-aligned with the other content in the container.
      </p>
    ),
    demo: <ButtonOptionFlush />,
  }, {
    title: 'Button Icon',
    source: [{
      type: GuideSectionTypes.JS,
      code: buttonIconSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: buttonIconHtml,
    }],
    text: (
      <p>
        Button icons are buttons that only contain an icon (no text).
      </p>
    ),
    demo: <ButtonIcon />,
  }, {
    title: 'Ghost buttons for deep color backgrounds',
    source: [{
      type: GuideSectionTypes.JS,
      code: buttonGhostSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: buttonGhostHtml,
    }],
    text: (
      <p>
        You can also pass <EuiCode>type=&apos;ghost&apos;</EuiCode> to any of the button
        styles on this page. These should be used extremely rarely, and are
        only for placing buttons on top of dark or image-based backgrounds.
        A good example of their use is in
        the <EuiCode>EuiBottomBar</EuiCode> component
      </p>
    ),
    demo: <ButtonGhost />,
  }],
};
