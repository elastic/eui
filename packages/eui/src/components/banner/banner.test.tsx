/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, renderHook, waitFor } from '@testing-library/react';

import { useEuiTheme } from '../../services';
import { render } from '../../test/rtl';

import { EuiBanner } from './banner';

const illustration = <img src="" alt="'" />;
const requiredProps = {
  title: 'Title',
  media: illustration,
};

describe('EuiBanner', () => {
  it('renders the title', () => {
    const { getByTestSubject } = render(<EuiBanner {...requiredProps} />);

    expect(getByTestSubject('euiBanner-title')).toHaveTextContent('Title');
  });

  it('renders text and children', () => {
    const { getByText } = render(
      <EuiBanner {...requiredProps} text="Body copy">
        <span>Extra content</span>
      </EuiBanner>
    );

    expect(getByText('Body copy')).toBeInTheDocument();
    expect(getByText('Extra content')).toBeInTheDocument();
  });

  it('renders the media slot', () => {
    const { getByTestSubject } = render(
      <EuiBanner
        {...requiredProps}
        media={<img alt="ill" data-test-subj="illustration" />}
      />
    );
    expect(getByTestSubject('euiBanner-media')).toBeInTheDocument();
    expect(getByTestSubject('illustration')).toBeInTheDocument();
  });

  describe('size', () => {
    it('renders as size="m" by default', () => {
      const { getByTestSubject } = render(<EuiBanner {...requiredProps} />);

      expect(getByTestSubject('euiBanner')).toHaveAttribute('data-size', 'm');
    });

    it('renders as size="s"', () => {
      const { getByTestSubject } = render(
        <EuiBanner {...requiredProps} size="s" />
      );

      expect(getByTestSubject('euiBanner')).toHaveAttribute('data-size', 's');
    });
  });

  describe('color', () => {
    it('renders as color="highlighted" by default', () => {
      const { result } = renderHook(() => useEuiTheme());
      const { getByTestSubject } = render(<EuiBanner {...requiredProps} />);

      expect(getByTestSubject('euiBanner')).toHaveAttribute(
        'data-color',
        'highlighted'
      );
      expect(getByTestSubject('euiBanner')).toHaveStyleRule(
        'background-color',
        result.current.euiTheme.colors.backgroundBaseHighlighted
      );
    });

    it('renders as color="plain"', () => {
      const { result } = renderHook(() => useEuiTheme());
      const { getByTestSubject } = render(
        <EuiBanner {...requiredProps} color="plain" />
      );

      expect(getByTestSubject('euiBanner')).toHaveAttribute(
        'data-color',
        'plain'
      );
      expect(getByTestSubject('euiBanner')).toHaveStyleRule(
        'background-color',
        result.current.euiTheme.colors.backgroundBasePlain
      );
    });
  });

  describe('onDismiss button', () => {
    it('does not render the dismiss button when onDismiss is omitted', () => {
      const { queryByTestId } = render(<EuiBanner {...requiredProps} />);

      expect(queryByTestId('euiBanner-dismiss')).toBeNull();
    });

    it('fires onDismiss when the dismiss button is clicked', () => {
      const onDismiss = jest.fn();
      const { getByTestSubject } = render(
        <EuiBanner {...requiredProps} onDismiss={onDismiss} />
      );

      fireEvent.click(getByTestSubject('euiBanner-dismiss'));

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('spreads dismissButtonProps onto the dismiss button', () => {
      const { getByTestSubject } = render(
        <EuiBanner
          {...requiredProps}
          onDismiss={() => {}}
          dismissButtonProps={{
            'aria-label': 'Close',
            'data-test-subj': 'custom-dismiss',
          }}
        />
      );
      const button = getByTestSubject('custom-dismiss');

      expect(button).toHaveAttribute('aria-label', 'Close');
    });
  });

  describe('action buttons', () => {
    it('renders primary and secondary action buttons', () => {
      const { getByTestSubject } = render(
        <EuiBanner
          {...requiredProps}
          actionProps={{
            primary: { children: 'Primary action', onClick: () => {} },
            secondary: { children: 'Secondary action', onClick: () => {} },
          }}
        />
      );

      expect(getByTestSubject('euiBanner-primaryAction')).toBeInTheDocument();
      expect(getByTestSubject('euiBanner-primaryAction')).toHaveTextContent(
        'Primary action'
      );

      expect(getByTestSubject('euiBanner-secondaryAction')).toBeInTheDocument();
      expect(getByTestSubject('euiBanner-secondaryAction')).toHaveTextContent(
        'Secondary action'
      );
    });

    it('does not render a standalone secondary action button', () => {
      const { queryByTestId } = render(
        <EuiBanner
          {...requiredProps}
          actionProps={{
            secondary: { children: 'Secondary action', onClick: () => {} },
          }}
        />
      );

      expect(queryByTestId('euiBanner-actions')).not.toBeInTheDocument();
      expect(
        queryByTestId('euiBanner-secondaryAction')
      ).not.toBeInTheDocument();
    });

    it('fires primary and secondary onClick', () => {
      const primaryFn = jest.fn();
      const secondaryFn = jest.fn();
      const { getByTestSubject } = render(
        <EuiBanner
          {...requiredProps}
          actionProps={{
            primary: { children: 'Yes', onClick: primaryFn },
            secondary: { children: 'No', onClick: secondaryFn },
          }}
        />
      );

      fireEvent.click(getByTestSubject('euiBanner-primaryAction'));
      fireEvent.click(getByTestSubject('euiBanner-secondaryAction'));

      expect(primaryFn).toHaveBeenCalledTimes(1);
      expect(secondaryFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('headingElement', () => {
    it('renders the title as an h2 by default', () => {
      const { getByTestSubject } = render(<EuiBanner {...requiredProps} />);

      expect(getByTestSubject('euiBanner-title').tagName).toBe('H2');
    });

    it('renders the title with the requested heading element', () => {
      const { getByTestSubject } = render(
        <EuiBanner {...requiredProps} headingElement="h4" />
      );

      expect(getByTestSubject('euiBanner-title').tagName).toBe('H4');
    });
  });

  it('respects a custom data-test-subj', () => {
    const { getByTestSubject } = render(
      <EuiBanner {...requiredProps} data-test-subj="hero" />
    );

    expect(getByTestSubject('hero')).toBeInTheDocument();
    expect(getByTestSubject('hero-title')).toBeInTheDocument();
  });

  describe('announceOnMount', () => {
    it('does not render a live region by default', () => {
      const { queryByRole } = render(<EuiBanner {...requiredProps} />);

      expect(queryByRole('status')).toBeNull();
    });

    it('renders a live region when announceOnMount="true"', async () => {
      const { getByRole } = render(
        <EuiBanner
          {...requiredProps}
          title="Hello"
          text="World"
          announceOnMount
        />
      );

      await waitFor(() =>
        expect(getByRole('status')).toHaveTextContent('Hello, World')
      );
    });
  });
});
