/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeVisColors } from '../global_styling';
import { EuiVisColorStore, VIS_COLOR_STORE_EVENTS } from './vis_color_store';

jest.useFakeTimers();

const visColors: _EuiThemeVisColors = {
  euiColorVis0: '#aabbcc',
} as _EuiThemeVisColors;

describe('EuiVisColorStore', () => {
  const visColorStore = EuiVisColorStore.getInstance(visColors);
  let updateFn: jest.Mock;

  beforeEach(() => {
    updateFn = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setVisColors()', () => {
    const customColors = {
      ...visColors,
      euiColorVis0: '#00ff00',
    };

    it('has initial colors', () => {
      expect(visColorStore.visColors).toEqual(visColors);
    });

    it('updates colors', () => {
      visColorStore.setVisColors(customColors);

      expect(visColorStore.visColors).toEqual(customColors);
    });
  });

  describe('subcribe and unsubscribe', () => {
    it('subscribes to store updates', () => {
      const customColors = {
        ...visColors,
        euiColorVis0: '#ff0000',
      };

      const id = visColorStore.subscribe(
        VIS_COLOR_STORE_EVENTS.UPDATE,
        updateFn
      );

      expect(id).toContain('UPDATE');

      visColorStore.setVisColors(customColors);
      jest.runAllTimers();

      expect(updateFn).toHaveBeenCalledTimes(1);
      expect(updateFn).toHaveBeenCalledWith(customColors);
    });

    it('unsubscribes from store updates', () => {
      const customColors = {
        ...visColors,
        euiColorVis0: '#0000ff',
      };

      const id = visColorStore.subscribe(
        VIS_COLOR_STORE_EVENTS.UPDATE,
        updateFn
      );

      expect(id).toContain('UPDATE');

      visColorStore.unsubscribe(VIS_COLOR_STORE_EVENTS.UPDATE, id);

      visColorStore.setVisColors(customColors);
      jest.runAllTimers();

      expect(updateFn).toHaveBeenCalledTimes(0);
    });
  });
});
