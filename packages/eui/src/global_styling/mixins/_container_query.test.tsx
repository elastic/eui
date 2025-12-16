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
    expect(euiContainer('normal', 'my-unique-name')).toEqual(
      'container-name: my-unique-name'
    );
  });

  it('supports non-scroll state container types', () => {
    expect(euiContainer('size', 'my-unique-name')).toEqual(
      'container-name: my-unique-name;container-type: size'
    );
    expect(euiContainer('inline-size', 'my-unique-name')).toEqual(
      'container-name: my-unique-name;container-type: inline-size'
    );
  });

  it('supports scroll states via the scrollState argument', () => {
    expect(euiContainer('size', 'my-unique-name', true)).toEqual(
      'container-name: my-unique-name;container-type: size scroll-state'
    );

    expect(euiContainer('size', 'my-unique-name', false)).toEqual(
      'container-name: my-unique-name;container-type: size'
    );
  });

  it('ignores the default "normal" container type', () => {
    expect(euiContainer('normal', 'my-unique-name')).toEqual(
      'container-name: my-unique-name'
    );

    expect(euiContainer('normal', 'my-unique-name', true)).toEqual(
      'container-name: my-unique-name;container-type: scroll-state'
    );
  });
});

describe('euiContainerCSS', () => {
  it('supports naming containers', () => {
    const { container } = render(
      <div css={euiContainerCSS('normal', 'my-unique-name')} />
    );

    expect(container.firstChild).toHaveStyleRule(
      'container-name',
      'my-unique-name'
    );
  });

  it('supports non-scroll state container types', () => {
    const { container, rerender } = render(
      <div css={euiContainerCSS('size', 'my-unique-name')} />
    );

    expect(container.firstChild).toHaveStyleRule(
      'container-name',
      'my-unique-name'
    );
    expect(container.firstChild).toHaveStyleRule('container-type', 'size');

    rerender(<div css={euiContainerCSS('inline-size', 'my-unique-name')} />);
    expect(container.firstChild).toHaveStyleRule(
      'container-name',
      'my-unique-name'
    );
    expect(container.firstChild).toHaveStyleRule(
      'container-type',
      'inline-size'
    );
  });

  it('supports scroll states via the scrollState argument', () => {
    const { container, rerender } = render(
      <div css={euiContainerCSS('size', 'my-unique-name', true)} />
    );

    expect(container.firstChild).toHaveStyleRule(
      'container-name',
      'my-unique-name'
    );
    expect(container.firstChild).toHaveStyleRule(
      'container-type',
      'size scroll-state'
    );

    rerender(<div css={euiContainerCSS('size', 'my-unique-name', false)} />);
    expect(container.firstChild).toHaveStyleRule(
      'container-name',
      'my-unique-name'
    );
    expect(container.firstChild).toHaveStyleRule('container-type', 'size');
  });

  it('ignores the default "normal" container type', () => {
    const { container, rerender } = render(
      <div css={euiContainerCSS('normal', 'my-unique-name')} />
    );

    expect(container.firstChild).toHaveStyleRule(
      'container-name',
      'my-unique-name'
    );
    expect(container.firstChild).not.toHaveStyleRule('container-type');

    rerender(<div css={euiContainerCSS('normal', 'my-unique-name', true)} />);
    expect(container.firstChild).toHaveStyleRule(
      'container-name',
      'my-unique-name'
    );
    expect(container.firstChild).toHaveStyleRule(
      'container-type',
      'scroll-state'
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
