/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { EuiControlBar, Control } from './control_bar';

const handleClick = () => {
  console.log('You clicked');
};

const controls: Control[] = [
  {
    controlType: 'breadcrumbs',
    id: 'current_file_path',
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
    iconType: 'alert',
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
    const component = takeMountedSnapshot(
      mount(<EuiControlBar controls={controls} {...requiredProps} />)
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('mobile is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} showOnMobile />
      );

      expect(component).toMatchSnapshot();
    });

    test('showContent is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} showContent>
          Content
        </EuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('size is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} size="s">
          Content
        </EuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('maxHeight is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} maxHeight="20rem">
          Content
        </EuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('leftOffset is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} leftOffset={200}>
          Content
        </EuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('rightOffset is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} rightOffset={200}>
          Content
        </EuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('position is rendered', () => {
      const component = mount(
        <EuiControlBar controls={controls} position="absolute">
          Content
        </EuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
