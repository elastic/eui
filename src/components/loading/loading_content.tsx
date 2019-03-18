import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { htmlIdGenerator } from '../../services';

const getMaskId = htmlIdGenerator('euiLoadingContent__mask--');

export const EuiLoadingContent: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      lines?: number;
    }
> = ({ lines = 3, className, ...rest }) => {
  const classes = classNames('euiLoadingContent', className);
  const maskId = getMaskId();
  const lineElements = [];
  for (let i = 0; i < lines; i++) {
    lineElements.push(
      <rect
        key={i}
        className="euiLoadingContent__single-line"
        y={i * 24}
        width={lines === i + 1 ? '75%' : '100%'}
        height="16"
        rx="4"
      />
    );
  }
  return (
    // TODO: Remove the styles! They're only there for 👇development
    <div className={classes} {...rest} style={{ marginBottom: '800px' }}>
      <svg
        viewBox="0 0"
        height={lineElements.length * 24}
        fill="none"
        className="euiLoadingContent__loader">
        <mask id={maskId}>{lineElements}</mask>

        <linearGradient
          id="euiLoadingContent__gradient"
          x1="0%"
          x2="100%"
          y1="38%"
          y2="40%">
          <stop
            className="euiLoadingContent__gradient--start-end"
            offset="0%"
          />
          <stop className="euiLoadingContent__gradient--middle" offset="50%" />
          <stop
            className="euiLoadingContent__gradient--start-end"
            offset="100%"
          />
          <animate
            attributeName="x2"
            dur="900ms"
            from="20%"
            to="300%"
            repeatCount="indefinite"
          />
        </linearGradient>

        <rect
          id="shimmer"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#euiLoadingContent__gradient)"
          mask={`url(#${maskId}`}
        />
      </svg>
    </div>
  );
};
