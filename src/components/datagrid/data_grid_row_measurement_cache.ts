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

import { useState } from 'react';

interface RowMeasurementCacheParams {
  defaultHeight?: ((rowIndex: number) => number) | number;
  initialValues?: Record<string, number>;
  keyMapper?: (rowIndex: number) => string;
}

const defaultKeyMapper = (rowIndex: number) => `${rowIndex}`;

export class RowMeasurementCache {
  private readonly cache: Map<string, number>;
  private readonly options: RowMeasurementCacheParams;
  private readonly keyMapper: (rowIndex: number) => string;

  constructor(options: RowMeasurementCacheParams) {
    this.options = options;

    this.cache = new Map(
      options.initialValues ? Object.entries(options.initialValues) : undefined
    );

    this.keyMapper = this.options.keyMapper ?? defaultKeyMapper;
  }

  set(rowIndex: number, height: number) {
    this.cache.set(this.keyMapper(rowIndex), height);
  }

  getRowHeight(rowIndex: number) {
    const key = this.keyMapper(rowIndex);

    if (this.cache.has(key)) {
      const value = this.cache.get(key);

      if (value) {
        return value;
      }
    }

    return typeof this.options.defaultHeight === 'function'
      ? this.options.defaultHeight(rowIndex)
      : this.options.defaultHeight;
  }

  clear(rowIndex: number) {
    this.cache.delete(this.keyMapper(rowIndex));
  }

  clearAll() {
    this.cache.clear();
  }
}

export const useRowMeasurementCache = (options: RowMeasurementCacheParams) => {
  const [cache] = useState(() => new RowMeasurementCache(options));

  return cache;
};
