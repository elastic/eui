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

interface DeferredRowMeasurementCacheParams {
  defaultHeight?: ((rowIndex: number) => number) | number;
  initialValues?: Record<string, number>;
  keyMapper?: (rowIndex: number) => string;
}

const defaultKeyMapper = (rowIndex: number) => `${rowIndex}`;

export const createRowMeasurementCache = ({
  defaultHeight,
  initialValues,
  keyMapper = defaultKeyMapper,
}: DeferredRowMeasurementCacheParams) => {
  const cache = new Map<string, number>(
    initialValues ? Object.entries(initialValues) : undefined
  );

  return {
    set(rowIndex: number, height: number): void {
      cache.set(keyMapper(rowIndex), height);
    },

    getRowHeight(rowIndex: number) {
      const key = keyMapper(rowIndex);

      if (cache.has(key)) {
        const value = cache.get(key);

        if (value) {
          return value;
        }
      }

      return typeof defaultHeight === 'function'
        ? defaultHeight(rowIndex)
        : defaultHeight;
    },

    clear(rowIndex: number) {
      cache.delete(keyMapper(rowIndex));
    },

    clearAll() {
      cache.clear();
    },
  };
};

export type RowMeasurementCache = ReturnType<typeof createRowMeasurementCache>;
