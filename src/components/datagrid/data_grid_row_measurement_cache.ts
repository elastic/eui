/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { useState, RefObject } from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';

const INITIAL_ROW_HEIGHT = 34;

export interface RowMeasurementOptions {
  defaultHeight?: ((rowIndex: number) => number) | number;
  initialValues?: Record<string, Record<string, number>>;
  keyMapper?: (rowIndex: number) => string;
}

const defaultKeyMapper = (rowIndex: number) => `${rowIndex}`;

export class RowMeasurementCache {
  private readonly cache: Map<string, Record<string, number>>;
  private readonly keyMapper: (rowIndex: number) => string;

  constructor(
    private options: RowMeasurementOptions,
    private gridRef: RefObject<Grid>
  ) {
    this.cache = new Map(
      options.initialValues ? Object.entries(options.initialValues) : undefined
    );

    this.keyMapper = this.options.keyMapper ?? defaultKeyMapper;
  }

  get initialRowHeight() {
    return INITIAL_ROW_HEIGHT;
  }

  set(rowIndex: number, columnId: string, height: number) {
    const key = this.keyMapper(rowIndex);
    const values = this.cache.get(key) ?? {};

    if (values[columnId] !== height) {
      values[columnId] = height;
      this.cache.set(key, values);
    }

    this.resetGrid(rowIndex);
  }

  getRowHeight(rowIndex: number) {
    const key = this.keyMapper(rowIndex);

    if (this.cache.has(key)) {
      const value = this.cache.get(key);

      return value
        ? Math.max(...Object.values(value))
        : this.options.defaultHeight;
    }

    return typeof this.options.defaultHeight === 'function'
      ? this.options.defaultHeight(rowIndex)
      : this.options.defaultHeight ?? this.initialRowHeight;
  }

  clear(rowIndex: number) {
    this.cache.delete(this.keyMapper(rowIndex));
  }

  clearAll() {
    this.cache.clear();
  }

  private resetGrid(rowIndex: number = 0) {
    if (this.gridRef?.current) {
      this.gridRef?.current.resetAfterRowIndex(rowIndex);
    }
  }
}

export const useRowMeasurementCache = (
  options: RowMeasurementOptions,
  gridRef: RefObject<Grid>
) => {
  const [cache] = useState(() => new RowMeasurementCache(options, gridRef));

  return cache;
};
