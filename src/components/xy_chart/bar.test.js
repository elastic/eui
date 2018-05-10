import React from 'react';
import { mount } from 'enzyme';
import { patchRandom } from '../../test/patch_random';

import EuiXYChart from './chart';
import EuiBar from './bar';

describe('EuiBar', () => {
  test('is rendered', () => {
    const unpatchRandom = patchRandom();

    const component = mount(
      <EuiXYChart width={600} height={200}>
        <EuiBar
          name="test-chart"
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();

    unpatchRandom();
  });

  test('all props are rendered', () => {
    const unpatchRandom = patchRandom();

    const component = mount(
      <EuiXYChart width={600} height={200}>
        <EuiBar
          name="test-chart"
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
          color="#ff0000"
          onClick={() => {}}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();

    unpatchRandom();
  });
});
