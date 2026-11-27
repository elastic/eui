/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useEuiTheme } from '../../services';
import { useEuiFontSize } from '../../global_styling';
import { CommonProps } from '../common';

import { euiShimmeringTextStyles } from './loading_shimmer_text.styles';

type LinePhase = 'live' | 'enter' | 'exit';

type Line = {
  id: number;
  text: string;
  phase: LinePhase;
};

export type EuiShimmeringTextProps = CommonProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> & {
    /**
     * The status line. Ignored when `texts` is set.
     */
    children?: string;
    /**
     * Lines that swap while the component is mounted. The box stays as wide
     * as the longest line, and each line starts at the same edge.
     */
    texts?: string[];
    /**
     * Sweeps a highlight across the current line.
     * @default true
     */
    isLoading?: boolean;
  };

/**
 * A status line that shimmers while something is loading. Pass `texts` to
 * swap through a sequence: the current line leaves upward as the next rises in.
 *
 * @see {@link https://eui.elastic.co/docs/components/display/loading/|EuiShimmeringText documentation}
 */
export const EuiShimmeringText: FunctionComponent<EuiShimmeringTextProps> = ({
  children = '',
  texts,
  isLoading = true,
  className,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiShimmeringTextStyles);
  const { euiTheme } = useEuiTheme();
  const { fontSize, lineHeight } = useEuiFontSize('m');
  const phrases = texts?.length ? texts : [children];
  const phraseKey = phrases.join('\n');
  const longest = phrases.reduce((widest, phrase) =>
    phrase.length > widest.length ? phrase : widest
  );
  const holdMs = Math.round(parseFloat(euiTheme.animation.extraSlow ?? '') * 4);
  const swapMs = Math.round(parseFloat(euiTheme.animation.slow ?? ''));

  const [lines, setLines] = useState<Line[]>([
    { id: 0, text: phrases[0], phase: 'live' },
  ]);

  useEffect(() => {
    const sequence = phraseKey.split('\n');
    setLines([{ id: 0, text: sequence[0], phase: 'live' }]);
    if (sequence.length < 2) {
      return;
    }

    let index = 0;
    let id = 0;
    const timers = new Set<number>();
    const interval = window.setInterval(() => {
      index = (index + 1) % sequence.length;
      const next = ++id;
      setLines((current) => [
        ...current.map((line) => ({ ...line, phase: 'exit' as const })),
        { id: next, text: sequence[index], phase: 'enter' },
      ]);
      const done = window.setTimeout(() => {
        timers.delete(done);
        setLines((current) =>
          current
            .filter((line) => line.id === next)
            .map((line) => ({ ...line, phase: 'live' as const }))
        );
      }, swapMs);
      timers.add(done);
    }, holdMs);

    return () => {
      window.clearInterval(interval);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [phraseKey, holdMs, swapMs]);

  const classes = classNames('euiShimmeringText', className);

  return (
    <span
      className={classes}
      css={[styles.euiShimmeringText, isLoading && styles.loading]}
      style={{ fontSize, lineHeight }}
      role="status"
      {...rest}
    >
      <span css={styles.sizer} aria-hidden="true">
        {longest}
      </span>
      {lines.map((line) => (
        <span
          key={line.id}
          className="euiShimmeringText__line"
          css={[
            styles.line,
            line.phase === 'enter' && styles.enter,
            line.phase === 'exit' && styles.exit,
          ]}
          data-text={line.text}
          aria-hidden={line.phase === 'exit' ? true : undefined}
        >
          {line.text}
        </span>
      ))}
    </span>
  );
};
