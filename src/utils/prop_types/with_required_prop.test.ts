/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
