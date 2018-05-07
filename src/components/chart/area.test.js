import React from 'react';
import { mount } from 'enzyme';
import patchRandom from '../../test/patch_random';

import EuiChart from './chart';
import EuiArea from './area';

describe('EuiArea', () => {
  test('is rendered', () => {
    const unpatchRandom = patchRandom();

    const component = mount(
      <EuiChart width={600} height={200}>
        <EuiArea
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
        />
      </EuiChart>
    );

    expect(component).toMatchSnapshot();

    unpatchRandom();
  });
});
