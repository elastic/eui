import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export const EuiLoadingContent: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      lines?: number;
    }
> = ({ lines = 3, className, ...rest }) => {
  const classes = classNames('euiLoadingContent', className);
  // We need an array for mapping the lines
  const newLineArray = Array(lines).fill(undefined);
  return (
    <div className={classes} {...rest}>
      <svg
        viewBox="0 0"
        height={newLineArray.length * 32}
        fill="none"
        className="euiLoadingContent__loader">
        <mask id="euiLoadingContent__mask">
          {newLineArray.map((line: undefined, index) => {
            return (
              <rect
                className="euiLoadingContent__single-line"
                y={index * 32}
                width={newLineArray.length === index + 1 ? '75%' : '100%'}
                height="24"
                rx="4"
              />
            );
          })}
        </mask>

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
          mask="url(#euiLoadingContent__mask)"
        />
      </svg>
    </div>
  );
};
