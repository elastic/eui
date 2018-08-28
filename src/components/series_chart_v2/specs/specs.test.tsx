import { mount } from 'enzyme';
import * as React from 'react';
import { ChartStore } from '../state/chart_state';
import { SpecsSpec } from './specs';

describe('Specs', () => {
  test('Mount and initialize specs', () => {
    const chartStore = new ChartStore();
    expect(chartStore.specsInitialized.get()).toBe(false);
    const component = <SpecsSpec chartStore={chartStore} />;
    mount(component);
    expect(chartStore.specsInitialized.get()).toBe(true);
  });
  // test('Mount a BarSeriesSpec', () => {
  //   const chartStore = new ChartStore();
  //   const props = {
  //     id: getSpecId('spec-1'),
  //     groupId: getGroupId('group-1'),
  //     type: DataSeriesType.Bar,
  //     data: [],
  //   };
  //   const component = <BarSeriesSpec chartStore={chartStore} {...props} />;
  //   mount(component);
  //   expect(chartStore.specsInitialized.get()).toBe(true);
  // });
});
