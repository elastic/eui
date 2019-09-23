import React from 'react';
import { mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { EuiControlBar, Control } from './control_bar';

const handleClick = () => {
  console.log('You clicked');
};

const controls: Control[] = [
  {
    id: 'current_file_path',
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
    id: 'sound_the_alarm',
    label: 'Sound the Alarm',
    controlType: 'button',
    onClick: handleClick,
  },
  {
    id: 'close_the_hatch',
    label: 'Close the Hatch',
    controlType: 'button',
    onClick: handleClick,
  },
  {
    id: 'sample_icon',
    label: 'Sample Icon',
    controlType: 'icon',
    iconType: 'alert',
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
];

describe('EuiControlBar', () => {
  test('is rendered', () => {
    const component = takeMountedSnapshot(
      mount(<EuiControlBar controls={controls} {...requiredProps} />)
    );

    expect(component).toMatchSnapshot();
  });
});

describe('mobile control bar', () => {
  test('is rendered', () => {
    const component = takeMountedSnapshot(
      mount(
        <EuiControlBar controls={controls} showOnMobile {...requiredProps} />
      )
    );

    expect(component).toMatchSnapshot();
  });
});
