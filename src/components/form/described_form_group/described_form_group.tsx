/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';

import classNames from 'classnames';

import { CommonProps, PropsOf } from '../../common';

import { EuiTitle, EuiTitleSize, EuiTitleProps } from '../../title';
import { EuiText } from '../../text';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGroupGutterSize,
  EuiFlexItemProps,
} from '../../flex';
import { css } from '@emotion/react';

export type EuiDescribedFormGroupProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /**
     * One or more `EuiFormRow`s.
     */
    children?: ReactNode;
    /**
     * Passed to `EuiFlexGroup`.
     */
    gutterSize?: EuiFlexGroupGutterSize;
    /**
     * Expand to fill 100% of the parent.
     * Default max-width is 800px.
     */
    fullWidth?: boolean;
    /**
     * Width ratio of description column compared to field column.
     * Can be used in conjunction with `fullWidth` and
     * may require `fullWidth` to be applied to child elements.
     */
    ratio?: 'half' | 'third' | 'quarter';
    /**
     * For better accessibility, it's recommended to use an HTML heading.
     */
    title: EuiTitleProps['children'];
    /**
     * Adjust the visual `size` of the EuiTitle that wraps `title`.
     */
    titleSize?: EuiTitleSize;
    /**
     * Added as a child of `EuiText`.
     */
    description?: ReactNode;
    /**
     * For customizing the description container. Extended from `EuiFlexItem`.
     */
    descriptionFlexItemProps?: PropsOf<typeof EuiFlexItem>;
    /**
     * For customizing the field container. Extended from `EuiFlexItem`.
     */
    fieldFlexItemProps?: PropsOf<typeof EuiFlexItem>;
  };

export const EuiDescribedFormGroup: FunctionComponent<EuiDescribedFormGroupProps> = ({
  children,
  className,
  gutterSize = 'l',
  fullWidth = false,
  ratio = 'half',
  titleSize = 'xs',
  title,
  description,
  descriptionFlexItemProps,
  fieldFlexItemProps,
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
    fieldFlexItemProps && fieldFlexItemProps.className
  );

  let renderedDescription: ReactNode;

  if (description) {
    // If the description is just a string, wrap it in a paragraph element
    if (typeof description === 'string') {
      description = <p>{description}</p>;
    }

    renderedDescription = (
      <EuiText
        size="s"
        color="subdued"
        className="euiDescribedFormGroup__description"
      >
        {description}
      </EuiText>
    );
  }

  let fieldGrowth: EuiFlexItemProps['grow'];
  switch (ratio) {
    case 'half':
      fieldGrowth = 1;
      break;
    case 'third':
      fieldGrowth = 2;
      break;
    case 'quarter':
      fieldGrowth = 3;
      break;
    default:
      console.warn('Please provide an allowed ratio to EuiDescribedFromRow');
      break;
  }

  const euiDescribedFormGroupStyle = {
    descriptionItem: css`
      min-width: min(20rem, 50%);
    `,
  };

  return (
    <div role="group" className={classes} {...rest}>
      <EuiFlexGroup alignItems="baseline" gutterSize={gutterSize}>
        <EuiFlexItem
          css={[euiDescribedFormGroupStyle.descriptionItem]}
          grow={1}
          {...descriptionFlexItemProps}
        >
          <EuiTitle size={titleSize} className="euiDescribedFormGroup__title">
            {title}
          </EuiTitle>

          {renderedDescription}
        </EuiFlexItem>

        <EuiFlexItem
          grow={fieldGrowth}
          {...fieldFlexItemProps}
          className={fieldClasses}
        >
          {children}
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
