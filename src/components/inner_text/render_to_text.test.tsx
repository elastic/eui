/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { mount } from 'enzyme';
import { useRenderToText } from './render_to_text';

describe('useRenderToText', () => {
  it("Returns a ReactNode's rendered string content", () => {
    const renderedTexts: string[] = [];

    const Component: FunctionComponent = ({ children }) => {
      const text = useRenderToText(children);
      renderedTexts.push(text);
      return <div>{text}</div>;
    };

    const component = mount(
      <Component>
        <div>
          <button>Hello There</button>
        </div>
      </Component>
    );

    component.setProps({
      children: <span>and this</span>,
    });

    expect(renderedTexts).toEqual([
      '',
      '',
      'Hello There',
      'Hello There',
      'Hello There',
      'and this',
    ]);
  });
});
