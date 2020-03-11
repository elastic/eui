import React, { ReactNode, HTMLAttributes } from 'react';

import classNames from 'classnames';

import { CommonProps, keysOf } from '../../common';

import { EuiTitle, EuiTitleSize, EuiTitleProps } from '../../title';
import { EuiText } from '../../text';
import { EuiFlexGroup, EuiFlexItem, EuiFlexGroupGutterSize } from '../../flex';

const paddingSizeToClassNameMap = {
  xxxs: 'euiDescribedFormGroup__fieldPadding--xxxsmall',
  xxs: 'euiDescribedFormGroup__fieldPadding--xxsmall',
  xs: 'euiDescribedFormGroup__fieldPadding--xsmall',
  s: 'euiDescribedFormGroup__fieldPadding--small',
  m: 'euiDescribedFormGroup__fieldPadding--medium',
  l: 'euiDescribedFormGroup__fieldPadding--large',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type EuiDescribedFormGroupPaddingSize = keyof typeof paddingSizeToClassNameMap;

export type EuiDescribedFormGroupProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /**
     * One or more `EuiFormRow`s
     */
    children?: ReactNode;
    /**
     * Passed to `EuiFlexGroup`
     */
    gutterSize?: EuiFlexGroupGutterSize;
    fullWidth?: boolean;
    /**
     * For better accessibility, it's recommended the use of HTML headings
     */
    title: EuiTitleProps['children'];
    titleSize?: EuiTitleSize;
    /**
     * Added as a child of `EuiText`
     */
    description?: ReactNode;
  };

export const EuiDescribedFormGroup: React.FunctionComponent<
  EuiDescribedFormGroupProps
> = ({
  children,
  className,
  gutterSize = 'l',
  fullWidth = false,
  titleSize = 'xs',
  title,
  description,
  ...rest
}) => {
  const classes = classNames(
    'euiDescribedFormGroup',
    {
      'euiDescribedFormGroup--fullWidth': fullWidth,
    },
    className
  );

  const fieldClasses = classNames(
    'euiDescribedFormGroup__fields',
    paddingSizeToClassNameMap[titleSize]
  );

  let renderedDescription: ReactNode;

  if (description) {
    renderedDescription = (
      <EuiText
        size="s"
        color="subdued"
        className="euiDescribedFormGroup__description">
        {description}
      </EuiText>
    );
  }

  return (
    <div role="group" className={classes} {...rest}>
      <EuiFlexGroup gutterSize={gutterSize}>
        <EuiFlexItem>
          <EuiTitle size={titleSize} className="euiDescribedFormGroup__title">
            {title}
          </EuiTitle>

          {renderedDescription}
        </EuiFlexItem>

        <EuiFlexItem className={fieldClasses}>{children}</EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
