import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiPortal,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import Portal from './portal';
const portalSource = require('!!raw-loader!./portal');

import PortalInsert from './portal_insert';
const portalInsertSource = require('!!raw-loader!./portal_insert');

import PortalComplex from './portal_complex';

export const PortalExample = {
  title: 'Portal',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: portalSource,
        },
      ],
      text: (
        <p>
          <strong>EuiPortal</strong> allows you to append its contained children
          onto the document body. It is useful for moving fixed elements like
          modals, tooltips or toasts when you are worried about a z-index or
          overflow conflict.
        </p>
      ),
      components: { EuiPortal },
      demo: <Portal />,
    },
    {
      title: 'Inserting portals',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: portalInsertSource,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            There is an optional <EuiCode>insert</EuiCode> prop that can specify
            the portal&apos;s location in the DOM. When used, it is important to
            consider how the location relates to the component lifecycle, as it
            could be removed from the DOM by another component update.
          </p>
          <p>
            <EuiCode>insert</EuiCode> is an object with two key-value pairs:{' '}
            <EuiCode>sibling</EuiCode> and <EuiCode>position</EuiCode>.
            <EuiCode>sibling</EuiCode> is the React node or HTMLElement to
            insert the portal next to, and <EuiCode>position</EuiCode> specifies
            the portal&apos;s relative position, either{' '}
            <EuiCode>before</EuiCode> or
            <EuiCode>after</EuiCode>.
          </p>
        </React.Fragment>
      ),
      props: { EuiPortal },
      demo: <PortalInsert />,
    },
    {
      title: 'A custom flyout',
      text: (
        <>
          <p>
            Custom flyouts should only be implemented if your design diverges a
            lot from <Link to="/layout/flyout">EuiFlyout</Link>. You need to
            implement accessibility features, which can be challenging.
          </p>

          <EuiCallOut
            title="Here are some accessibility considerations you should keep in mind when implementing a custom flyout."
            iconType="accessibility"
          >
            <ul>
              <li>
                Use <Link to="/utilities/focus-trap">EuiFocusTrap</Link> to
                prevent keyboard-initiated focus from leaving the flyout.
              </li>
              <li>
                If you use a{' '}
                <Link to="/utilities/overlay-mask">EuiOverlayMask</Link>, it
                should be dismissed when clicked outside. For that you can pass
                to your <strong>EuiFocusTrap</strong>{' '}
                <EuiCode>onClickOutside</EuiCode> prop a method to close the
                flyout.
              </li>
              <li>
                When pressing the <kbd>ESC</kbd> key your flyout should close.
                Use a <Link to="/utilities/window-events">EuiWindowEvent</Link>{' '}
                to listen for the key down event.
              </li>
              <li>
                Pass an ID to the first heading in the flyout{' '}
                <EuiCode>{'id={headingId}'}</EuiCode>.
              </li>
              <li>
                Pass to your <strong>EuiPanel</strong>{' '}
                <EuiCode>{'aria-labelledby={headingId}'}</EuiCode> to announce
                the flyout to screen readers.
              </li>
            </ul>
          </EuiCallOut>

          <EuiSpacer size="l" />

          <p>You should also take into account some design considerations:</p>

          <ul>
            <li>
              Use a <Link to="/layout/panel">EuiPanel</Link> for the background.
            </li>
            <li>
              A flyout should always have a close button on the right top
              corner. This gives a visual clue that the flyout can be closed.
            </li>
            <li>For writing CSS consider using our theme tokens.</li>
          </ul>

          <p>
            In the following demo, you can see how to create your own flyout
            with all the recommended accessibility and design features:
          </p>

          <PortalComplex />
        </>
      ),
    },
  ],
};
