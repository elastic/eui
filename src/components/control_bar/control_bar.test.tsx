/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import { mount, render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiControlBar, Control } from './control_bar';

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: ReactNode }) => children,
}));

const handleClick = () => {
  console.log('You clicked');
};

const controls: Control[] = [
  {
    controlType: 'breadcrumbs',
    id: 'current_file_path',
    responsive: false,
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
    controlType: 'button',
    id: 'sound_the_alarm',
    label: 'Sound the Alarm',
    onClick: handleClick,
    'data-test-subj': 'dts',
  },
  {
    controlType: 'text',
    id: 'close_the_hatch',
    text: 'Close the Hatch',
  },
  {
    controlType: 'divider',
  },
  {
    controlType: 'icon',
    id: 'sample_icon',
    iconType: 'error',
    color: 'danger',
    'aria-label': 'Sample Icon',
  },
  {
    controlType: 'spacer',
  },
  {
    controlType: 'tab',
    id: 'flight_815',
    label: 'Flight 815',
    onClick: handleClick,
  },
];

describe('EuiControlBar', () => {
  test('is rendered', () => {
    const component = render(
      <EuiControlBar controls={controls} {...requiredProps} />
    );
    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('mobile is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} showOnMobile />
      );

      expect(component.render()).toMatchSnapshot();
    });

    test('showContent is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} showContent>
          Content
        </EuiControlBar>
      );

      expect(component.render()).toMatchSnapshot();
    });

    test('size is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} size="s">
          Content
        </EuiControlBar>
      );

      expect(component.render()).toMatchSnapshot();
    });

    test('maxHeight is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} maxHeight="20rem">
          Content
        </EuiControlBar>
      );

      expect(component.render()).toMatchSnapshot();
    });

    test('leftOffset is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} leftOffset={200}>
          Content
        </EuiControlBar>
      );

      expect(component.render()).toMatchSnapshot();
    });

    test('rightOffset is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} rightOffset={200}>
          Content
        </EuiControlBar>
      );

      expect(component.render()).toMatchSnapshot();
    });

    test('position is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} position="absolute">
          Content
        </EuiControlBar>
      );

      expect(component.render()).toMatchSnapshot();
    });
  });
});
