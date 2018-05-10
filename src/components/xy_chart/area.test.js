import React from 'react';
import { mount } from 'enzyme';
import patchRandom from '../../test/patch_random';

import EuiXYChart from './chart';
import EuiArea from './area';

describe('EuiArea', () => {
  test('is rendered', () => {
    const unpatchRandom = patchRandom();

    const component = mount(
      <EuiXYChart width={600} height={200}>
        <EuiArea
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
        <EuiArea
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
          name="test-chart"
          color="#ff0000"
          curve="curveCatmullRom"
          hasLineMarks={true}
          lineMarkColor="#00ff00"
          lineMarkSize={13}
          onClick={() => {}}
          onMarkClick={() => {}}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();

    unpatchRandom();
  });
});
