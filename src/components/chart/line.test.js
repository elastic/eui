import React from 'react';
import { mount } from 'enzyme';
import patchRandom from '../../test/patch_random';

import EuiChart from './chart';
import EuiLine from './line';

describe('EuiLine', () => {
  test('is rendered', () => {
    const unpatchRandom = patchRandom();

    const component = mount(
      <EuiChart width={600} height={200}>
        <EuiLine
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
        />
      </EuiChart>
    );

    expect(component).toMatchSnapshot();

    unpatchRandom();
  });

  test('all props are rendered', () => {
    const unpatchRandom = patchRandom();

    const component = mount(
      <EuiChart width={600} height={200}>
        <EuiLine
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
      </EuiChart>
    );

    expect(component).toMatchSnapshot();

    unpatchRandom();
  });
});
