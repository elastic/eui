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

import { withRequiredProp } from './with_required_prop';
import PropTypes from 'prop-types';

describe('withRequiredProp', () => {
  it('warns when the underlying prop validator fails', () => {
    expect(() => {
      PropTypes.checkPropTypes(
        {
          exampleProp: withRequiredProp(PropTypes.string, 'requiredProp'),
        },
        {
          exampleProp: 15,
        },
        'exampleProp',
        'ExampleComponent'
      );
    }).toThrowErrorMatchingSnapshot();
  });

  it('warns when the base prop is present and valid but the required prop is missing', () => {
    expect(() => {
      PropTypes.checkPropTypes(
        {
          exampleProp: withRequiredProp(PropTypes.string, 'requiredProp'),
        },
        {
          exampleProp: 'hello',
        },
        'exampleProp',
        'ExampleComponent'
      );
    }).toThrowErrorMatchingSnapshot();
  });

  it('warns with a custom message when validation fails', () => {
    expect(() => {
      PropTypes.checkPropTypes(
        {
          exampleProp: withRequiredProp(
            PropTypes.string,
            'requiredProp',
            'a custom message'
          ),
        },
        {
          exampleProp: 'hello',
        },
        'exampleProp',
        'ExampleComponent'
      );
    }).toThrowErrorMatchingSnapshot();
  });

  it('does not warn when the base property is missing', () => {
    expect(() => {
      PropTypes.checkPropTypes(
        {
          exampleProp: withRequiredProp(PropTypes.string, 'requiredProp'),
        },
        {},
        'exampleProp',
        'ExampleComponent'
      );
    }).not.toThrow();
  });

  it('does not warn when both the base property and required properties exist', () => {
    expect(() => {
      PropTypes.checkPropTypes(
        {
          exampleProp: withRequiredProp(PropTypes.string, 'requiredProp'),
          requiredProp: PropTypes.number,
        },
        {
          exampleProp: 'hello',
          requiredProp: 5,
        },
        'exampleProp',
        'ExampleComponent'
      );
    }).not.toThrow();
  });
});
