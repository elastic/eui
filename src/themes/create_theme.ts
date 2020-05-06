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

import Propagate from '../services/propagate/propagate';
import {
  // createBorders,
  sizes,
  typography,
} from '../global_styling/variables';
export const createTheme = (colors: any) => {
  const propagate = new Propagate();
  propagate.set('colors', colors);
  propagate.set('sizes', sizes);
  propagate.set('typography', typography);

  //propagate.set('euiBorderColor', ['euiPrimaryColor'], color => shade(color));
  propagate.set('borders', ['colors'], colors => {
    const euiBorderWidthThin = '1px';
    const euiBorderWidthThick = '2px';

    const euiBorderColor = colors.euiColorLightShade;
    const euiBorderRadius = '4px';
    const euiBorderThick = `${euiBorderWidthThick} solid ${euiBorderColor}`;
    const euiBorderThin = `${euiBorderWidthThin} solid ${euiBorderColor}`;
    const euiBorderEditable = `${euiBorderWidthThick} dotted ${euiBorderColor}`;

    const borders = {
      euiBorderWidthThin,
      euiBorderWidthThick,
      euiBorderColor,
      euiBorderRadius,
      euiBorderThick,
      euiBorderThin,
      euiBorderEditable,
    };
    return borders;
  });
  return propagate;
};
