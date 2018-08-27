import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiText } from '../text';
import { EuiTitle } from '../title';

const titleSizePropMap = {
  s: 's',
  m: 'm',
  l: 'l',
};

export const TITLESIZES = Object.keys(titleSizePropMap);

const colorToClassNameMap = {
  default: null,
  darkest: 'euiStat--darkest',
  primary: 'euiStat--primary',
  secondary: 'euiStat--secondary',
  danger: 'euiStat--danger',
  accent: 'euiStat--accent',
};

export const COLORS = Object.keys(colorToClassNameMap);

const textAlignToClassNameMap = {
  left: 'euiStat--leftAligned',
  center: 'euiStat--centerAligned',
  right: 'euiStat--rightAligned',
};

export const ALIGNMENTS = Object.keys(textAlignToClassNameMap);

export const EuiStat = ({
  children,
  className,
  description,
  title,
  titleSize,
  color,
  textAlign,
  ...rest,
}) => {

  const classes = classNames(
    'euiStat',
    colorToClassNameMap[color],
    textAlignToClassNameMap[textAlign],
    className,
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiText size="s" className="euiStat__description">
        <p>{description}</p>
      </EuiText>

      <EuiTitle size={titleSize} className="euiStat__title">
        <p>{title}</p>
      </EuiTitle>

      {children}
    </div>
  );
};

EuiStat.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,

  /**
   * Define the size of the value text
   */
  titleSize: PropTypes.oneOf(TITLESIZES),

  /**
   * Define the color of the value text
   */
  color: PropTypes.oneOf(COLORS),

  /**
   * Define how you want the content aligned
   */
  textAlign: PropTypes.oneOf(ALIGNMENTS),
};

EuiStat.defaultProps = {
  color: 'default',
  textAlign: 'left',
  titleSize: 'l',
};
