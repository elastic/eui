/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

import { useEuiTheme } from '../../services';
import { render, renderHook } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiBanner } from './banner';

const illustration = <img src="" alt="'" />;
const requiredProps = {
  title: 'Title',
  media: illustration,
};

describe('EuiBanner', () => {
  shouldRenderCustomStyles(<EuiBanner {...requiredProps} />);
  // Test the dismissButtonProps separately as emotion css class order isn't
  // guaranteed to be consistent between the banner and the button
  shouldRenderCustomStyles(
    <EuiBanner {...requiredProps} onDismiss={() => {}} />,
    {
      childProps: ['dismissButtonProps'],
      skip: { parentTest: true, css: true },
    }
  );

  test('is rendered', () => {
    const { container } = render(<EuiBanner {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

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
      const { queryByTestSubject } = render(<EuiBanner {...requiredProps} />);

      expect(queryByTestSubject('euiBanner-dismiss')).toBeNull();
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

    it('renders a standalone secondary action button', () => {
      const { queryByTestSubject } = render(
        <EuiBanner
          {...requiredProps}
          actionProps={{
            secondary: { children: 'Secondary action', onClick: () => {} },
          }}
        />
      );

      expect(
        queryByTestSubject('euiBanner-secondaryAction')
      ).toBeInTheDocument();
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

    it('announces child text once and does not copy nested controls', async () => {
      const { getAllByRole, getAllByTestSubject, getByRole } = render(
        <EuiBanner
          {...requiredProps}
          title="Hello"
          text="World"
          announceOnMount
          onDismiss={() => {}}
          dismissButtonProps={{ 'aria-label': 'Dismiss this banner' }}
          actionProps={{
            primary: { children: 'Primary action', onClick: () => {} },
          }}
        >
          <button id="retry" data-test-subj="retry">
            Retry
          </button>
        </EuiBanner>
      );

      await waitFor(() => {
        const liveRegion = getByRole('status');
        expect(liveRegion).toHaveTextContent('Hello, World, Retry');
        expect(getAllByTestSubject('retry')).toHaveLength(1);
        expect(document.querySelectorAll('#retry')).toHaveLength(1);
        expect(getAllByRole('button', { name: 'Retry' })).toHaveLength(1);
        expect(liveRegion).not.toHaveTextContent('Dismiss this banner');
        expect(liveRegion).not.toHaveTextContent('Primary action');
      });
    });

    it('announces inline wording and accessible names', async () => {
      const { getByRole } = render(
        <EuiBanner
          {...requiredProps}
          title="Hello"
          text={
            <span>
              Read <a href="#more">more</a>.
            </span>
          }
          announceOnMount
        >
          <span>
            <strong>un</strong>available
          </span>
          <button aria-label="Retry" />
          <img alt="Status" />
        </EuiBanner>
      );

      await waitFor(() =>
        expect(getByRole('status')).toHaveTextContent(
          /^Hello, Read more\., unavailable Retry Status$/
        )
      );
    });

    it('keeps each direct child separate at size m', async () => {
      const { getByRole } = render(
        <EuiBanner {...requiredProps} title="Hello" announceOnMount>
          <span>Service</span>
          <span>unavailable</span>
        </EuiBanner>
      );

      await waitFor(() =>
        expect(getByRole('status')).toHaveTextContent(
          /^Hello, Service unavailable$/
        )
      );
    });

    it('keeps a block boundary before inline content at size s', async () => {
      const { getByRole } = render(
        <EuiBanner {...requiredProps} title="Hello" size="s" announceOnMount>
          <p>Upload failed</p>
          <a href="#retry">Retry</a>
        </EuiBanner>
      );

      await waitFor(() =>
        expect(getByRole('status')).toHaveTextContent(
          /^Hello, Upload failed Retry$/
        )
      );
    });

    it('reads the content of a labelled container', async () => {
      const { getByRole } = render(
        <EuiBanner
          {...requiredProps}
          title="Hello"
          text={
            <section aria-label="Error details">
              <p>Connection lost</p>
            </section>
          }
          announceOnMount
        />
      );

      await waitFor(() =>
        expect(getByRole('status')).toHaveTextContent(
          /^Hello, Connection lost$/
        )
      );
    });

    it('prefers aria-labelledby over aria-label', async () => {
      const { getByRole } = render(
        <>
          <span id="retryLabel">Retry connection</span>
          <EuiBanner {...requiredProps} title="Hello" announceOnMount>
            <button aria-labelledby="retryLabel" aria-label="Retry" />
          </EuiBanner>
        </>
      );

      await waitFor(() =>
        expect(getByRole('status')).toHaveTextContent(
          /^Hello, Retry connection$/
        )
      );
    });

    it('leaves out the dismiss button when its data-test-subj is overridden', async () => {
      const { getByRole } = render(
        <EuiBanner
          {...requiredProps}
          title="Hello"
          text="World"
          announceOnMount
          onDismiss={() => {}}
          dismissButtonProps={{
            'aria-label': 'Close banner',
            'data-test-subj': 'closeBanner',
          }}
        />
      );

      await waitFor(() =>
        expect(getByRole('status')).toHaveTextContent(/^Hello, World$/)
      );
    });
  });
});
