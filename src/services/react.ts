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

import { unstable_batchedUpdates } from 'react-dom';

const _queue: Function[] = [];

function processQueue() {
  // the queued functions trigger react setStates which, if unbatched,
  // each cause a full update->render->dom pass _per function_
  // instead, tell React to wait until all updates are finished before re-rendering
  unstable_batchedUpdates(() => {
    for (let i = 0; i < _queue.length; i++) {
      _queue[i]();
    }
    _queue.length = 0;
  });
}

export function enqueueStateChange(fn: Function) {
  if (_queue.length === 0) {
    setTimeout(processQueue);
  }
  _queue.push(fn);
}
