/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { RenderLinkOrButton } from './render_link_or_button';

describe('RenderLinkOrButton', () => {
  const componentCss = { color: 'red', label: 'merge' };

  shouldRenderCustomStyles(
    <RenderLinkOrButton fallbackElement="span" css={componentCss} />
  );
  shouldRenderCustomStyles(
    <RenderLinkOrButton href="#" fallbackElement="a" css={componentCss} />,
    { childProps: ['linkProps'] }
  );
  shouldRenderCustomStyles(
    <RenderLinkOrButton
      onClick={() => {}}
      fallbackElement="button"
      css={componentCss}
    />,
    { childProps: ['buttonProps'] }
  );

  it('always renders a button if isDisabled', () => {
    const onClick = jest.fn();
    const { container } = render(
      <RenderLinkOrButton
        fallbackElement="span"
        href="#"
        onClick={onClick}
        isDisabled={true}
      />
    );
    const element = container.firstChild!;

    expect(element.nodeName).toEqual('BUTTON');
    expect(element).toBeDisabled();

    expect(element).not.toHaveAttribute('href');
    fireEvent.click(element);
    expect(onClick).not.toHaveBeenCalled();
  });

  describe('links', () => {
    it('renders a link if not disabled and href is passed', () => {
      const onClick = jest.fn();
      const { container } = render(
        <RenderLinkOrButton fallbackElement="span" href="#" onClick={onClick} />
      );
      const element = container.firstChild!;

      expect(element.nodeName).toEqual('A');
      expect(element).toHaveAttribute('href', '#');
      expect(element).toHaveAttribute('rel', 'noreferrer');

      fireEvent.click(element);
      expect(onClick).toHaveBeenCalled();
    });

    it('applies rel=noopener if target=_blank', () => {
      const { container } = render(
        <RenderLinkOrButton fallbackElement="span" href="#" target="_blank" />
      );
      const element = container.firstChild!;

      expect(element).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('linkProps merges classNames and overrides any other common props', () => {
      const { container } = render(
        <RenderLinkOrButton
          fallbackElement="span"
          href="#"
          className="test"
          data-test-subj="test"
          linkProps={{
            'data-test-subj': 'link',
            className: 'link',
            children: 'custom that only shows if a link',
          }}
        />
      );
      const element = container.firstChild!;

      expect(element).toHaveClass('test link');
      expect(element).toHaveAttribute('data-test-subj', 'link');
      expect(element).toHaveTextContent('custom that only shows if a link');
    });

    it('correctly orders Emotion css', () => {
      const { container } = render(
        <RenderLinkOrButton
          fallbackElement="span"
          href="#"
          componentCss={{ color: 'red', label: 'beginning' }}
          linkProps={{ css: { color: 'green', label: 'middle' } }}
          css={{ color: 'blue', label: 'end' }}
        />
      );
      const element = container.firstElementChild!;

      expect(element.className.endsWith('-beginning-middle-end')).toBeTruthy();
    });
  });

  describe('buttons', () => {
    it('renders a button if onClick is passed but no href', () => {
      const onClick = jest.fn();
      const { container } = render(
        <RenderLinkOrButton fallbackElement="span" onClick={onClick} />
      );
      const element = container.firstChild!;

      expect(element.nodeName).toEqual('BUTTON');
      expect(element).toHaveAttribute('type', 'button');

      fireEvent.click(element);
      expect(onClick).toHaveBeenCalled();
    });

    it('ignores link-specific props like rel and target', () => {
      const { container } = render(
        <RenderLinkOrButton
          fallbackElement="span"
          onClick={() => {}}
          target="_blank"
          rel="noopener"
        />
      );
      const element = container.firstChild!;

      expect(element).not.toHaveAttribute('target');
      expect(element).not.toHaveAttribute('rel');
    });

    it('buttonProps merges classNames and overrides any other common props', () => {
      const { container } = render(
        <RenderLinkOrButton
          fallbackElement="span"
          onClick={() => {}}
          className="test"
          data-test-subj="test"
          buttonProps={{
            type: 'submit',
            'data-test-subj': 'button',
            className: 'button',
            children: 'custom that only shows if a button',
          }}
        />
      );
      const element = container.firstChild!;

      expect(element).toHaveClass('test button'); // Merges
      expect(element).toHaveAttribute('data-test-subj', 'button'); // Overrides
      expect(element).toHaveTextContent('custom that only shows if a button');
      expect(element).toHaveAttribute('type', 'submit');
    });

    it('correctly orders Emotion css', () => {
      const { container } = render(
        <RenderLinkOrButton
          fallbackElement="span"
          onClick={() => {}}
          componentCss={{ color: 'red', label: 'beginning' }}
          buttonProps={{ css: { color: 'green', label: 'middle' } }}
          css={{ color: 'blue', label: 'end' }}
        />
      );
      const element = container.firstElementChild!;

      expect(element.className.endsWith('-beginning-middle-end')).toBeTruthy();
    });
  });

  describe('fallbackElement', () => {
    it('renders the fallback element if no href or onClick is passed', () => {
      const { container } = render(
        <RenderLinkOrButton fallbackElement="span" />
      );
      const element = container.firstChild!;

      expect(element.nodeName).toEqual('SPAN');
    });

    it('warns if the fallback element is interactive and no href or onClick was passed', () => {
      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      const { container } = render(<RenderLinkOrButton fallbackElement="a" />);
      const element = container.firstChild!;

      expect(element.nodeName).toEqual('A');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No `href` or `onClick` prop was passed to this interactive element.'
      );

      consoleWarnSpy.mockRestore();
    });

    it('does not use either linkProps or buttonProps', () => {
      const { container } = render(
        <RenderLinkOrButton
          fallbackElement="div"
          data-test-subj="test"
          linkProps={{ 'data-test-subj': 'foo', children: 'link' }}
          buttonProps={{ 'data-test-subj': 'bar', children: 'button' }}
        >
          I'm a div
        </RenderLinkOrButton>
      );
      const element = container.firstChild!;

      expect(element.nodeName).toEqual('DIV');
      expect(element).toHaveAttribute('data-test-subj', 'test');
      expect(element).toHaveTextContent("I'm a div");
    });

    it('correctly orders Emotion css', () => {
      const { container } = render(
        <RenderLinkOrButton
          fallbackElement="span"
          componentCss={{ color: 'red', label: 'beginning' }}
          css={{ color: 'blue', label: 'end' }}
        />
      );
      const element = container.firstElementChild!;

      expect(element.className.endsWith('-beginning-end')).toBeTruthy();
    });
  });
});
