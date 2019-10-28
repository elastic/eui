import React from 'react';
import { Link } from 'react-router';

import { EuiCode, EuiControlBar } from '../../../../src/components';

import {
  BreadcrumbControlProps,
  ButtonControlProps,
  DividerControlProps,
  IconControlTypeProps,
  IconButtonControlTypeProps,
  SpacerControlProps,
  TabControlProps,
  TextControlProps,
} from './props';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import ControlBar from './control_bar';
import { Controls } from './controls';
import { ControlBarWithTabs } from './tabs';
import { ControlBarMobile } from './mobile';

const controlsSource = require('!!raw-loader!./controls');
const controlsHtml = renderToHtml(Controls);

const controlBarSource = require('!!raw-loader!./control_bar');
const controlBarHtml = renderToHtml(ControlBar);
const controlBarSnippet = `<EuiControlBar
  size="l"
  showContent={false}
  navDrawerOffset="s"
  controls={
    [{
      id: 'root_icon',
      label: 'Project Root',
      controlType: 'icon',
      iconType: 'submodule',
    },
    {
      id: 'current_file_path',
      label: 'breadcrumbs',
      controlType: 'breadcrumbs',
      responsive: true,
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      id: 'status_icon',
      label: 'Repo Status',
      controlType: 'icon',
      iconType: 'alert',
      color: 'warning',
    },
    {
      controlType: 'divider',
    }]
  }
/>`;

const tabsBarSource = require('!!raw-loader!./tabs');
const tabsBarHtml = renderToHtml(ControlBarWithTabs);
const tabsBarSnippet = '<EuiControlBar controls={items} size="m"/>';

const mobileBarSource = require('!!raw-loader!./mobile');
const mobileBarHtml = renderToHtml(ControlBarMobile);
const mobileBarSnippet = `<EuiControlBar
  showOnMobile
  controls={[
    {
      id: 'icon',
      controlType: 'icon',
      label: 'folder',
      iconType: 'folderClosed',
      className: 'eui-hideFor--m eui-hideFor--l eui-hideFor--xl',
    },
    {
      id: 'current_file_path',
      label: 'breadcrumbs',
      controlType: 'breadcrumbs',
      responsive: true,
      className: 'eui-hideFor--s eui-hideFor--xs',
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      id: 'github_icon',
      controlType: 'icon',
      iconType: 'logoGithub',
    },
    {
      id: 'github_text',
      controlType: 'text',
      label: 'Open in Github',
    },
  ]}/>`;

export const ControlBarExample = {
  title: 'Control Bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiControlBar</EuiCode> is a bottom positioned container
            and content well intended to provide additional view controls and
            actions.
          </p>
          <p>
            The control bar provides an easy way to extend the navigation or
            views of the current page by allowing you to place tabs, buttons,
            text, or <EuiCode>children</EuiCode> within it. It can operate
            similarly to a flyout, but (at full height) it covers most of the
            current page; making it a fitting solution for verbose text or
            additional controls. It can also be used without allowing it to
            expand, which makes it an easy way to display status information or
            fixed-position buttons.
          </p>
        </div>
      ),
      props: { EuiControlBar },
      snippet: controlBarSnippet,
      demo: <ControlBar />,
    },
    {
      title: 'Using Tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            This example demonstrates the use of tabs and reduces the size of
            the content with <EuiCode>size=&quot;m&quot;</EuiCode>.
          </p>
          <p>
            Optional children of the <EuiCode>EuiControlBar</EuiCode> are
            rendered in the control bar drawer. You can toggle the visibility of
            the content with the <EuiCode>showContent</EuiCode> prop. When you
            want to display tab content, this is where you&apos;ll do it.
          </p>
        </div>
      ),
      props: { EuiControlBar },
      snippet: tabsBarSnippet,
      demo: <ControlBarWithTabs />,
    },
    {
      title: 'Mobile Usage',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: mobileBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: mobileBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <EuiCode>EuiControlBar</EuiCode> is responsive in the sense that
            it utilizes flexbox and overflow scrolls. However, it makes no
            attempts to reorganize the controls you provide. By default the{' '}
            <EuiCode>EuiControlBar</EuiCode> is hidden on mobile devices, but
            this can be overridden with the
            <EuiCode>showOnMobile</EuiCode> prop. You&apos;ll need to take the
            layout of your <EuiCode>controlTypes</EuiCode> into consideration
            when choosing to display on smaller screens.
          </p>
          <p>
            A simple way of doing this is to pass in EUI responsive utility
            classes into the <EuiCode>className</EuiCode> prop on any of the{' '}
            <EuiCode>controlTypes</EuiCode>. View the snippet tab to see an
            example.
          </p>
        </div>
      ),
      props: { EuiControlBar },
      snippet: mobileBarSnippet,
      demo: <ControlBarMobile />,
    },
    {
      title: 'Control types and position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlsHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <EuiCode>EuiControlBar</EuiCode> accepts an array of
            <EuiCode>controlTypes</EuiCode> that will be arranged in the order
            in which they are provided. All controls <strong>must</strong> be
            provide a unique <EuiCode>id</EuiCode> to be used as the key.
          </p>
          <ul>
            <li>
              <EuiCode>button</EuiCode>: Extends{' '}
              <Link to="/navigation/button">EuiButton</Link> but always forces
              to size small. Requires <EuiCode>label</EuiCode> as the children.
            </li>
            <li>
              <EuiCode>icon</EuiCode>: Extends{' '}
              <Link to="/display/icons">EuiIcon</Link> unless provided an{' '}
              <EuiCode>onClick</EuiCode> or <EuiCode>href</EuiCode>, then it
              will render an <Link to="/navigation/button">EuiButtonIcon</Link>.
            </li>
            <li>
              <EuiCode>text</EuiCode>: Simple ghost colored text.
            </li>
            <li>
              <EuiCode>tab</EuiCode>: Renders a button visually as a tab. You
              must provide your own callback to swap the control bar contents
              with <EuiCode>onClick</EuiCode>.
            </li>
            <li>
              <EuiCode>breadcrumbs</EuiCode>: Extends{' '}
              <Link to="/navigation/breadcrumbs">EuiBreadcrumbs</Link>.
            </li>
            <li>
              <EuiCode>spacer</EuiCode>: Provides a horizontal space between
              controls. <strong>Id is optional.</strong>
            </li>
            <li>
              <EuiCode>divider</EuiCode>: Provides a <EuiCode>1px</EuiCode>{' '}
              border between controls. Useful when additional visual separation
              is needed. <strong>Id is optional.</strong>
            </li>
          </ul>
          <p>
            Typically, a control bar is fixed positioned against the browser
            window and therefore rendered within a portal. To change the parent
            element of the control bar, change the <EuiCode>position</EuiCode>{' '}
            prop to <EuiCode>&apos;absolute&apos;</EuiCode> or{' '}
            <EuiCode>&apos;relative&apos;</EuiCode>.
          </p>
          <p>
            To offest the left and right position of the control bar, for
            example, to adjust for side navigation, use the{' '}
            <EuiCode>leftOffset</EuiCode> or <EuiCode>rightOffset</EuiCode>{' '}
            props.
          </p>
        </div>
      ),
      props: {
        EuiControlBar,
        BreadcrumbControlProps,
        ButtonControlProps,
        DividerControlProps,
        IconControlTypeProps,
        IconButtonControlTypeProps,
        SpacerControlProps,
        TabControlProps,
        TextControlProps,
      },
      demo: <Controls />,
    },
  ],
};
