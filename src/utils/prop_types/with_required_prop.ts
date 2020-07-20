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

/**
 * PropType validation that, if the property is present,
 * validates against a proptype and verifies that another property exists
 *
 * example:
 * ExampleComponent.propTypes = {
 *   items: PropTypes.array,
 *   itemId: withRequiredProp(PropTypes.string, 'items', 'itemId is required to extract the ID from an item')
 * }
 *
 * this validator warns if ExampleComponent is passed an `items` prop but not `itemId`
 */
export const withRequiredProp = (
  proptype: any,
  requiredPropName: string,
  messageDescription?: string
) => {
  const validator = (...args: any[]) => {
    const [props, propName] = args;

    // run the proptype for this property
    let result = proptype(...args);

    // if the property type checking passed then check for the required prop
    if (result == null) {
      // if this property was passed, check that the required property also exists
      if (props[propName] != null && props[requiredPropName] == null) {
        result = new Error(
          `Property "${propName}" was passed without corresponding property "${requiredPropName}"${
            messageDescription ? `; ${messageDescription}` : ''
          }`
        );
      }
    }

    return result;
  };

  return validator;
};
