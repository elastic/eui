/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiResizableContainer } from './resizable_container';

describe('EuiResizableContainer', () => {
  test('is rendered', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be vertical', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps} direction="vertical">
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be controlled externally', () => {
    const panel1 = 50;
    const panel2 = 50;
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel size={panel1}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel size={panel2}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have scrollable panels', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50} scrollable>
              Testing
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50} scrollable>
              123
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have more than two panels', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={33}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={33}>123</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={33}>And again</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can adjust panel props', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50} paddingSize="none">
              Testing
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50} color="plain">
              123
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have toggleable panels', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel mode="collapsible" initialSize={20}>
              Sidebar
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel mode="main" initialSize={80}>
              Sidebar content
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('toggleable panels can be configurable', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode={[
                'collapsible',
                {
                  'data-test-subj': 'panel-toggle',
                  className: 'panel-toggle',
                  position: 'top',
                },
              ]}
              initialSize={20}>
              Sidebar
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel mode="main" initialSize={80}>
              Sidebar content
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });
});
