import React from 'react';

import { EuiControlBar, EuiLink } from '../../../../src/components';
export class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  soundTheAlarms = () => {
    alert('You clicked a button!');
  };

  render() {
    const controls = [
      {
        controlType: 'button',
        id: 'controls_button',
        label: 'Button',
        onClick: this.soundTheAlarms,
      },
      {
        controlType: 'spacer',
      },
      {
        controlType: 'icon',
        id: 'controls_icon',
        iconType: 'flag',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'icon',
        id: 'controls_icon_button',
        iconType: 'bell',
        onClick: this.soundTheAlarms,
        color: 'primary',
        'aria-label': 'Bell',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'text',
        id: 'controls_text',
        text: 'Some text',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'tab',
        id: 'controls_tab',
        label: 'Tab',
        onClick: () => {},
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'text',
        id: 'some_text',
        text: <EuiLink>A sample link</EuiLink>,
      },
      {
        controlType: 'spacer',
      },
      {
        controlType: 'breadcrumbs',
        id: 'controls_breadcrumbs',
        breadcrumbs: [
          {
            text: 'Breadcrumbs',
          },
          {
            text: 'Item',
          },
        ],
      },
    ];

    return (
      <EuiControlBar controls={controls} position="relative" showOnMobile />
    );
  }
}
