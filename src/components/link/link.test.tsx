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
import { requiredProps } from '../../test';

import { EuiLink, COLORS } from './link';

describe('EuiLink', () => {
  shouldRenderCustomStyles(<EuiLink />);

  it('renders', () => {
    const { container } = render(
      <EuiLink href="#" {...requiredProps}>
        <span>Hiya!!!</span>
      </EuiLink>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('color', () => {
    COLORS.forEach((color) => {
      test(`${color} is rendered`, () => {
        const { container } = render(<EuiLink href="#" color={color} />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  it('supports both href and onClick', () => {
    const handler = jest.fn();
    const { container } = render(<EuiLink href="/imalink" onClick={handler} />);
    fireEvent.click(container.firstChild!);

    expect(container.firstChild).toHaveAttribute('href', '/imalink');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('supports target', () => {
    const { container } = render(<EuiLink href="#" target="_parent" />);
    expect(container.firstChild).toHaveAttribute('target', '_parent');
  });

  it('supports rel', () => {
    const { container } = render(<EuiLink href="#" rel="stylesheet" />);
    expect(container.firstChild).toHaveAttribute(
      'rel',
      'noreferrer stylesheet'
    );
  });

  it('supports disabled', () => {
    const { container } = render(<EuiLink disabled onClick={() => {}} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('external links', () => {
    it('renders an icon and extra rel', () => {
      const { container } = render(<EuiLink href="#" external />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('is set automatically if `target="_blank"`', () => {
      const { container } = render(<EuiLink href="#" target="_blank" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('allows for target and external to be controlled independently', () => {
      const { container } = render(
        <EuiLink href="#" target="_blank" external={false} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('button behavior', () => {
    it('renders a button if href is not specified and onClick is passed', () => {
      const { container } = render(<EuiLink onClick={() => {}} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('respects the type property', () => {
      const { container } = render(
        <EuiLink type="submit" onClick={() => {}} />
      );
      expect(container.firstChild).toHaveAttribute('type', 'submit');
    });

    it('calls onClick', () => {
      const handler = jest.fn();
      const { container } = render(<EuiLink onClick={handler} />);
      fireEvent.click(container.firstChild!);
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
