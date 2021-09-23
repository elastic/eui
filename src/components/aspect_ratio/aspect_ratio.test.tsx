/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
            {...requiredProps}
          >
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
