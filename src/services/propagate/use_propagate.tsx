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

import { useContext, useEffect, useState } from 'react';
import PropagateContext from './propagate_context';

export default function usePropagate(references: string[]) {
  const propagate = useContext(PropagateContext);
  const [values, setValues] = useState(
    references.map(reference => propagate.get(reference))
  );

  useEffect(() => {
    const unsubscribes: any[] = [];

    for (let i = 0; i < references.length; i++) {
      const reference = references[i];
      const index = i;
      const unsubscribe = propagate.subscribe(reference, value => {
        setValues(values => {
          const nextValues = [...values];
          nextValues[index] = value;
          return nextValues;
        });
      });
      unsubscribes.push(unsubscribe);
    }

    return () => {
      for (let i = 0; i < unsubscribes.length; i++) {
        unsubscribes[i]();
      }
    };
  }, [propagate, references, setValues]);

  return values;
}
