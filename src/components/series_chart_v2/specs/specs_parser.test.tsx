import { mount } from 'enzyme';
import * as React from 'react';
import { ChartStore } from '../state/chart_state';
import { SpecsSpecRootComponent } from './specs_parser';

describe('Specs parser', () => {
  test('Mount and parse specs', () => {
    const chartStore = new ChartStore();
    expect(chartStore.specsInitialized.get()).toBe(false);
    const component = <SpecsSpecRootComponent chartStore={chartStore} />;
    mount(component);
    expect(chartStore.specsInitialized.get()).toBe(true);
  });
});
