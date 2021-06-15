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

import { MouseEvent, TouchEvent, useEffect } from 'react';
import { throttle } from '../../services/throttle';

export function isMouseEvent<T = HTMLDivElement>(
  event: MouseEvent<T> | TouchEvent<T>
): event is MouseEvent<T> {
  return typeof event === 'object' && 'pageX' in event && 'pageY' in event;
}

export function useMouseMove<T = HTMLDivElement>(
  handleChange: (
    location: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => void,
  interactionConditional: any = true
): [
  (e: MouseEvent<T>) => void,
  (e: MouseEvent<T> | TouchEvent<T>, isFirstInteraction?: boolean) => void
] {
  useEffect(() => {
    return unbindEventListeners;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleInteraction = (
    e: MouseEvent<T> | TouchEvent<T>,
    isFirstInteraction?: boolean
  ) => {
    if (e) {
      if (interactionConditional) {
        const x = isMouseEvent<T>(e) ? e.pageX : e.touches[0].pageX;
        const y = isMouseEvent<T>(e) ? e.pageY : e.touches[0].pageY;
        handleChange({ x, y }, isFirstInteraction);
      }
    }
  };
  const handleMouseMove = throttle((e: MouseEvent) => {
    handleChange({ x: e.pageX, y: e.pageY }, false);
  });
  const handleMouseDown = (e: MouseEvent<T>) => {
    handleInteraction(e, true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', unbindEventListeners);
  };
  const unbindEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', unbindEventListeners);
  };

  return [handleMouseDown, handleInteraction];
}
