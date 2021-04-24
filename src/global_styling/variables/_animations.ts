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

// import { computed } from '../../services/theme/utils';

export interface EuiThemeAnimation {
  slightBounce: string;
  slightResistance: string;

  speed: {
    extraFast: string;
    fast: string;
    normal: string;
    slow: string;
    extraSlow: string;
  };

  // keyframes: {
  //   fadeIn: string;
  //   grow: string;
  //   focusRingAnimate: string;
  //   focusRingAnimateLarge: string;
  // };
}

export const animation: EuiThemeAnimation = {
  slightBounce: 'cubic-bezier(.34, 1.61, .7, 1)',
  slightResistance: 'cubic-bezier(.694, .0482, .335, 1)',

  speed: {
    extraFast: '90ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    extraSlow: '350ms',
  },

  //   keyframes: {
  //     fadeIn: `
  //   0% {
  //     opacity: 0;
  //   }

  //   100% {
  //     opacity: 1;
  //   }
  // `,

  //     grow: `
  //   0% {
  //     opacity: 0;
  //   }

  //   1% {
  //     opacity: 0;
  //     transform: scale(0);
  //   }

  //   100% {
  //     opacity: 1;
  //     transform: scale(1);
  //   }
  // `,

  //     focusRingAnimate: computed(
  //       ({ focus }) => `
  //   0% {
  //     box-shadow: 0 0 0 ${focus.ring.animStartSize} ${focus.ring.animStartColor};
  //   }

  //   100% {
  //     box-shadow: 0 0 0 ${focus.ring.size} ${focus.ring.color};
  //   }
  // `
  //     ),

  //     focusRingAnimateLarge: computed(
  //       ({ focus }) => `
  //   0% {
  //     box-shadow: 0 0 0 ${focus.ring.animStartSizeLarge} ${focus.ring.animStartColor};
  //   }

  //   100% {
  //     box-shadow: 0 0 0 ${focus.ring.sizeLarge} ${focus.ring.color};
  //   }
  // `
  //     ),

  // Component specific

  // euiButtonActive {
  //   50% {
  //     transform: translateY(1px);
  //   }
  // }
  // },
};
