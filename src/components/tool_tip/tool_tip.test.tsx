import React from 'react';
import { render, mount } from 'enzyme';
import {
  requiredProps,
  findTestSubject,
  takeMountedSnapshot,
} from '../../test';
import { EuiToolTip } from './tool_tip';

describe('EuiToolTip', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button>Trigger</button>
      </EuiToolTip>
    );

    expect(component).toMatchSnapshot();
  });

  test('shows tooltip on focus', () => {
    const component = mount(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button data-test-subj="trigger">Trigger</button>
      </EuiToolTip>
    );

    const trigger = findTestSubject(component, 'trigger');
    trigger.simulate('focus');
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });
});
