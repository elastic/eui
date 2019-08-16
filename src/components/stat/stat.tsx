import React, {
  Fragment,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
} from 'react';
import { CommonProps, keysOf, Omit } from '../common';
import classNames from 'classnames';

import { EuiText } from '../text';
import { EuiTitle, EuiTitleSize } from '../title/title';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';
import makeId from '../form/form_row/make_id';

const colorToClassNameMap = {
  default: null,
  subdued: 'euiStat__title--subdued',
  primary: 'euiStat__title--primary',
  secondary: 'euiStat__title--secondary',
  danger: 'euiStat__title--danger',
  accent: 'euiStat__title--accent',
};

export const COLORS = keysOf(colorToClassNameMap);

const textAlignToClassNameMap = {
  left: 'euiStat--leftAligned',
  center: 'euiStat--centerAligned',
  right: 'euiStat--rightAligned',
};

export const ALIGNMENTS = keysOf(textAlignToClassNameMap);

export interface EuiStatProps {
  /**
   * Set the description (label) text
   */
  description: ReactNode;
  /**
   * Will hide the title with an animation until false
   */
  isLoading?: boolean;
  /**
   * Flips the order of the description and title
   */
  reverse?: boolean;
  textAlign?: keyof typeof textAlignToClassNameMap;
  /**
   * The (value) text
   */
  title: ReactNode;
  /**
   * The color of the title text
   */
  titleColor?: keyof typeof colorToClassNameMap;
  /**
   * Size of the title. See EuiTitle for options ('s', 'm', 'l'... etc)
   */
  titleSize?: EuiTitleSize;
}

export const EuiStat: FunctionComponent<
  CommonProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'> & EuiStatProps
> = ({
  children,
  className,
  description,
  isLoading = false,
  reverse = false,
  textAlign = 'left',
  title,
  titleColor = 'default',
  titleSize = 'l',
  ...rest
}) => {
  const classes = classNames(
    'euiStat',
    textAlignToClassNameMap[textAlign],
    className
  );

  const ariaId = makeId();

  const titleClasses = classNames(
    'euiStat__title',
    colorToClassNameMap[titleColor],
    {
      'euiStat__title-isLoading': isLoading,
    }
  );

  const descriptionDisplay = (
    <EuiText size="s" className="euiStat__description">
      <p id={ariaId} aria-hidden="true">
        {description}
      </p>
    </EuiText>
  );

  const titleDisplay = (
    <EuiTitle size={titleSize} className={titleClasses}>
      <p aria-hidden="true">{title}</p>
    </EuiTitle>
  );

  let statDisplay;

  if (isLoading) {
    statDisplay = (
      <Fragment>
        {!reverse && descriptionDisplay}
        <EuiTitle size={titleSize} className={titleClasses}>
          <p aria-hidden="true">--</p>
        </EuiTitle>
        {reverse && descriptionDisplay}
        <EuiScreenReaderOnly>
          <p>
            <EuiI18n
              token="euiStat.loadingText"
              default="Statistic is loading"
            />
          </p>
        </EuiScreenReaderOnly>
      </Fragment>
    );
  } else {
    statDisplay = (
      <Fragment>
        {reverse ? (
          <Fragment>
            {titleDisplay}
            {descriptionDisplay}
            <EuiScreenReaderOnly>
              <p>{`${title} ${description}`}</p>
            </EuiScreenReaderOnly>
          </Fragment>
        ) : (
          <Fragment>
            {descriptionDisplay}
            {titleDisplay}
            <EuiScreenReaderOnly>
              <p>{`${description} ${title}`}</p>
            </EuiScreenReaderOnly>
          </Fragment>
        )}
      </Fragment>
    );
  }

  return (
    <div className={classes} {...rest}>
      {statDisplay}
      {children}
    </div>
  );
};
