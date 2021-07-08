/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { useEuiTextDiff } from './text_diff';
const beforeText =
  'Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape- descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea.';
const afterText =
  'Orbiting those at a distance of roughly ninety-nine billion yards is not insignificant dwaf red green planet whose ape- ascended life forms are so amazingly primitive that they still think digital clocks are a pretty neat idea.';

describe('useEuiTextDiff', () => {
  test('is rendered', () => {
    const Element = () => {
      const renderedComponent = useEuiTextDiff({
        beforeText,
        afterText,
        timeout: 0,
      })[0];
      return <>{renderedComponent}</>;
    };
    const component = shallow(<Element />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('custom components', () => {
      test('is rendered', () => {
        const Element = () => {
          const renderedComponent = useEuiTextDiff({
            beforeText,
            afterText,
            timeout: 0,
            insertComponent: 'strong',
            deleteComponent: 's',
            sameComponent: 'p',
          })[0];
          return <>{renderedComponent}</>;
        };
        const component = shallow(<Element />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
