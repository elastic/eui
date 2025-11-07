/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import isEqual from 'lodash/isEqual';

import { _EuiThemeVisColors } from '../global_styling';
import { uniqueId } from 'lodash';

export const VIS_COLOR_STORE_EVENTS = {
  UPDATE: 'UPDATE',
} as const;
export type VisColorStoreEvents = keyof typeof VIS_COLOR_STORE_EVENTS;
type EventId = string;

export type _EuiVisColorStore = {
  visColors: _EuiThemeVisColors;
  setVisColors: (colors: _EuiThemeVisColors) => void;
  subscribe: (eventName: VisColorStoreEvents, callback: any) => EventId;
  unsubscribe: (eventName: VisColorStoreEvents, id: EventId) => void;
};

class EuiVisColorStoreImpl implements _EuiVisColorStore {
  private _visColors: _EuiVisColorStore['visColors'];
  private events: Record<VisColorStoreEvents, Map<EventId, any>> = {} as Record<
    VisColorStoreEvents,
    Map<EventId, any>
  >;

  constructor(dependencies: { defaultColors: _EuiThemeVisColors }) {
    this._visColors = dependencies.defaultColors;
  }

  get visColors(): _EuiVisColorStore['visColors'] {
    return this._visColors;
  }

  setVisColors = (colors: _EuiThemeVisColors) => {
    if (!isEqual(this._visColors, colors)) {
      this._visColors = colors;

      this.publishUpdate(VIS_COLOR_STORE_EVENTS.UPDATE, this._visColors);
    }
  };

  subscribe = (eventName: VisColorStoreEvents, callback: NonNullable<any>) => {
    if (this.events[eventName] == null) {
      this.events[eventName] = new Map();
    }

    const id = uniqueId(`${eventName}_`);

    this.events[eventName].set(id, callback);
    return id;
  };

  unsubscribe = (eventName: VisColorStoreEvents, id: EventId) => {
    if (this.events[eventName] != null && this.events[eventName].has(id)) {
      this.events[eventName].delete(id);
    }
  };

  private publishUpdate = (
    eventName: VisColorStoreEvents,
    colors?: _EuiThemeVisColors
  ) => {
    if (this.events[eventName])
      this.events[eventName].forEach((callback) => {
        // use timeout to execute callbacks after theme updates
        setTimeout(() => {
          callback?.(colors);
        });
      });
  };
}

export class EuiVisColorStore {
  private static instance: EuiVisColorStoreImpl;

  static getInstance(defaultColors: _EuiThemeVisColors): EuiVisColorStoreImpl {
    if (!this.instance) {
      this.instance = new EuiVisColorStoreImpl({
        defaultColors,
      });
    }

    return this.instance;
  }
}
