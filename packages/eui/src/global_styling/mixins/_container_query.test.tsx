/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import {
  euiContainer,
  euiContainerCSS,
  euiContainerQuery,
} from './_container_query';

describe('euiContainer', () => {
  it('supports naming containers', () => {
    expect(euiContainer('my-unique-name')).toEqual(
      'container: my-unique-name;'
    );
  });

  it('supports non-scroll state container types', () => {
    expect(euiContainer('my-unique-name', 'size')).toEqual(
      'container: my-unique-name / size;'
    );
    expect(euiContainer('my-unique-name', 'inline-size')).toEqual(
      'container: my-unique-name / inline-size;'
    );
  });

  it('supports scroll states via the scrollState argument', () => {
    expect(euiContainer('my-unique-name', 'size', true)).toEqual(
      'container: my-unique-name / size scroll-state;'
    );

    expect(euiContainer('my-unique-name', 'size', false)).toEqual(
      'container: my-unique-name / size;'
    );
  });

  it('ignores the default "normal" container type', () => {
    expect(euiContainer('my-unique-name', 'normal')).toEqual(
      'container: my-unique-name;'
    );

    expect(euiContainer('my-unique-name', 'normal', true)).toEqual(
      'container: my-unique-name / scroll-state;'
    );
  });
});

describe('euiContainerCSS', () => {
  it('supports naming containers', () => {
    const { container } = render(
      <div css={euiContainerCSS('my-unique-name')} />
    );

    expect(container.firstChild).toHaveStyleRule('container', 'my-unique-name');
  });

  it('supports non-scroll state container types', () => {
    const { container, rerender } = render(
      <div css={euiContainerCSS('my-unique-name', 'size')} />
    );

    expect(container.firstChild).toHaveStyleRule(
      'container',
      'my-unique-name/size'
    );

    rerender(<div css={euiContainerCSS('my-unique-name', 'inline-size')} />);
    expect(container.firstChild).toHaveStyleRule(
      'container',
      'my-unique-name/inline-size'
    );
  });

  it('supports scroll states via the scrollState argument', () => {
    const { container, rerender } = render(
      <div css={euiContainerCSS('my-unique-name', 'size', true)} />
    );

    expect(container.firstChild).toHaveStyleRule(
      'container',
      'my-unique-name/size scroll-state'
    );

    rerender(<div css={euiContainerCSS('my-unique-name', 'size', false)} />);
    expect(container.firstChild).toHaveStyleRule(
      'container',
      'my-unique-name/size'
    );
  });

  it('ignores the default "normal" container type', () => {
    const { container, rerender } = render(
      <div css={euiContainerCSS('my-unique-name', 'normal')} />
    );

    expect(container.firstChild).toHaveStyleRule('container', 'my-unique-name');

    rerender(<div css={euiContainerCSS('my-unique-name', 'normal', true)} />);
    expect(container.firstChild).toHaveStyleRule(
      'container',
      'my-unique-name/scroll-state'
    );
  });
});

describe('euiContainerQuery', () => {
  it('supports any container conditions', () => {
    expect(euiContainerQuery('(width > 150px)')).toEqual(
      `@container (width > 150px)`
    );

    expect(euiContainerQuery('(width > 150px) and (width < 300px)')).toEqual(
      `@container (width > 150px) and (width < 300px)`
    );
  });

  it('supports container names', () => {
    expect(euiContainerQuery('(width > 150px)', 'my-container')).toEqual(
      `@container my-container (width > 150px)`
    );

    expect(
      euiContainerQuery('(width > 150px) and (width < 300px)', 'my-container')
    ).toEqual(`@container my-container (width > 150px) and (width < 300px)`);
  });
});
