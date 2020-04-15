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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAspectRatio } from './aspect_ratio';

describe('EuiAspectRatio', () => {
  test('is rendered', () => {
    const component = render(
      <EuiAspectRatio height={4} width={9} {...requiredProps}>
        <iframe
          title="Elastic is a search company"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/yJarWSLRM24"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </EuiAspectRatio>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('maxWidth', () => {
      test('is rendered', () => {
        const component = render(
          <EuiAspectRatio
            height={16}
            width={9}
            maxWidth={500}
            {...requiredProps}>
            <iframe
              title="Elastic is a search company"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/yJarWSLRM24"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </EuiAspectRatio>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
