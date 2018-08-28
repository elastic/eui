import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiText } from '../text';
import { EuiTitle, TITLE_SIZES } from '../title/title';

const colorToClassNameMap = {
  default: null,
  dark: 'euiStat--dark',
  full: 'euiStat--full',
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
  titleColor,
  textAlign,
  reverse,
  ...rest,
}) => {

  const classes = classNames(
    'euiStat',
    colorToClassNameMap[titleColor],
    textAlignToClassNameMap[textAlign],
    className,
  );

  const descriptionDisplay = (
    <EuiText size="s" className="euiStat__description">
      <p>{description}</p>
    </EuiText>
  );

  const titleDisplay = (
    <EuiTitle size={titleSize} className="euiStat__title">
      <p>{title}</p>
    </EuiTitle>
  );

  let statDisplay;

  if (reverse) {
    statDisplay = (
      <div>
        {titleDisplay}
        {descriptionDisplay}
      </div>
    );
  } else {
    statDisplay = (
      <div>
        {descriptionDisplay}
        {titleDisplay}
      </div>
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      {statDisplay}
      {children}
    </div>
  );
};

EuiStat.propTypes = {
  /**
   * Set the title (value) text
   */
  title: PropTypes.node.isRequired,

  /**
   * Set the description (label) text
   */
  description: PropTypes.node.isRequired,

  /**
   * Places the title (value) above the description (label)
   */
  reverse: PropTypes.bool.isRequired,

  /**
   * Define the size of the title text. See EuiTitle for sizing options ('s', 'm', 'l'... etc)
   */
  titleSize: PropTypes.oneOf(TITLE_SIZES),

  /**
   * Define the color of the title text
   */
  titleColor: PropTypes.oneOf(COLORS),

  /**
   * Define how you want the content aligned
   */
  textAlign: PropTypes.oneOf(ALIGNMENTS),

  /**
   * Appends additional classes to parent
   */
  className: PropTypes.string,

  /**
   * Additional content that appears after the title and description
   */
  children: PropTypes.node,
};

EuiStat.defaultProps = {
  titleColor: 'default',
  textAlign: 'left',
  titleSize: 'l',
  reverse: false,
};
