import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiWindowEvent } from '../../../../src/services';

import { EuiCode, EuiCallOut, EuiSpacer } from '../../../../src/components';

import { BasicWindowEvent } from './basic_window_event';
const basicSource = require('!!raw-loader!./basic_window_event');

import { WindowEventConflict } from './window_event_conflict';
const conflictSource = require('!!raw-loader!./window_event_conflict');

import { MousePosition } from './mouse_position';
const mousePositionSource = require('!!raw-loader!./mouse_position');

export const WindowEventExample = {
  title: 'Window events',
  sections: [
    {
      title: 'Basic example: closing a modal on escape',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: basicSource,
        },
      ],
      text: (
        <>
          <p>
            Use an <strong>EuiWindowEvent</strong> to safely and declaratively
            manage adding and auto-removing event listeners to the{' '}
            <EuiCode>window</EuiCode>. This is preferable to setting up your own
            window event listeners because it will remove old listeners when
            your component unmounts, preventing you from accidentally leaving
            them around forever.
          </p>
          <p>
            This modal example registers a listener on the{' '}
            <EuiCode>keydown</EuiCode> event and listens for ESC key presses,
            which closes the open modal.
          </p>
        </>
      ),
      components: { EuiWindowEvent },
      props: { EuiWindowEvent },
      demo: <BasicWindowEvent />,
    },
    {
      title: 'Avoiding event conflicts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: conflictSource,
        },
      ],
      text: (
        <>
          <EuiCallOut
            title="Be careful with global listeners"
            color="warning"
            iconType="warning"
          >
            <p>
              Since window event listeners are global, they can conflict with
              other event listeners if you aren&apos;t careful.
            </p>
          </EuiCallOut>
          <EuiSpacer />
          <p>
            The safest and best way to avoid these conflicts is to use{' '}
            <EuiCode>event.stopPropagation()</EuiCode> at the lowest, most
            specific level where you are responding to a DOM event. This will
            prevent the event from bubbling up to the window, and the{' '}
            <strong>EuiWindowEvent</strong> listener will never be triggered,
            avoiding the conflict.
          </p>
        </>
      ),
      components: { EuiWindowEvent },
      demo: <WindowEventConflict />,
    },
    {
      title: 'Tracking mouse position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: mousePositionSource,
        },
      ],
      text: (
        <>
          <p>
            For some DOM events, you have to listen on the window. One example
            of this is tracking <em>mouse position</em>. Below, when you click
            the toggle switch, your mouse position is tracked. When you toggle
            off, tracking stops.
          </p>
          <p>
            If you were manually attaching window listeners, you might forget to
            remove the listener and be silently responding to mouse events in
            the background for the life of your app. The{' '}
            <strong>EuiWindowEvent</strong> component manages that
            unmount/unregister process for you.
          </p>
        </>
      ),
      components: { EuiWindowEvent },
      demo: <MousePosition />,
    },
  ],
};
