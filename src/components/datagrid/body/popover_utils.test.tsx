/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import {
  DefaultColumnFormatter,
  providedPopoverContents,
} from './popover_utils';

describe('popover utils', () => {
  const cellContentsElement = document.createElement('div');
  cellContentsElement.innerText = '{ "hello": "world" }';

  test('DefaultColumnFormatter', () => {
    const component = shallow(
      <DefaultColumnFormatter cellContentsElement={cellContentsElement}>
        Test
      </DefaultColumnFormatter>
    );

    expect(component).toMatchInlineSnapshot(`
      <EuiText>
        Test
      </EuiText>
    `);
  });

  test('providedPopoverContents.json', () => {
    const Component = providedPopoverContents.json;
    const component = shallow(
      <Component cellContentsElement={cellContentsElement}>Test</Component>
    );

    expect(component).toMatchInlineSnapshot(`
      <EuiCodeBlock
        isCopyable={true}
        language="json"
        paddingSize="none"
        transparentBackground={true}
      >
        {
        "hello": "world"
      }
      </EuiCodeBlock>
    `);
  });
});
