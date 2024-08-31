/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps, PropsOf } from '../../common';
import { EuiTitle, EuiTitleSize, EuiTitleProps } from '../../title';
import { EuiText } from '../../text';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGroupGutterSize,
  EuiFlexItemProps,
} from '../../flex';

import { useFormContext } from '../eui_form_context';
import { euiDescribedFormGroupStyles } from './described_form_group.styles';

export type EuiDescribedFormGroupProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /**
     * One or more `EuiFormRow`s.
     */
    children?: ReactNode;
    /**
     * Passed to `EuiFlexGroup`.
     * @default l
     */
    gutterSize?: EuiFlexGroupGutterSize;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * Default max-width is 800px.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Width ratio of description column compared to field column.
     * Can be used in conjunction with `fullWidth` and
     * may require `fullWidth` to be applied to child elements.
     * @default half
     */
    ratio?: 'half' | 'third' | 'quarter';
    /**
     * For better accessibility, it's recommended to use an HTML heading.
     */
    title: EuiTitleProps['children'];
    /**
     * Adjust the visual `size` of the EuiTitle that wraps `title`.
     * @default xs
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

export const EuiDescribedFormGroup: FunctionComponent<
  EuiDescribedFormGroupProps
> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    children,
    className,
    gutterSize = 'l',
    fullWidth = defaultFullWidth,
    ratio = 'half',
    titleSize = 'xs',
    title,
    description,
    descriptionFlexItemProps,
    fieldFlexItemProps,
    ...rest
  } = props;

  const styles = useEuiMemoizedStyles(euiDescribedFormGroupStyles);
  const cssStyles = [
    styles.euiDescribedFormGroup,
    fullWidth ? styles.fullWidth : styles.formWidth,
  ];
  const descriptionColumnStyles = [
    styles.euiDescribedFormGroup__descriptionColumn,
    descriptionFlexItemProps?.css,
  ];
  const fieldColumnStyles = [
    styles.euiDescribedFormGroup__fields,
    fieldFlexItemProps?.css,
  ];

  const classes = classNames('euiDescribedFormGroup', className);

  const fieldClasses = classNames(
    'euiDescribedFormGroup__fields',
    fieldFlexItemProps && fieldFlexItemProps.className
  );

  let renderedDescription: ReactNode;

  if (description) {
    renderedDescription = (
      <EuiText
        size="s"
        color="subdued"
        css={styles.euiDescribedFormGroup__description}
        className="euiDescribedFormGroup__description"
      >
        {
          // If the description is just a string, wrap it in a paragraph element
          typeof description === 'string' ? <p>{description}</p> : description
        }
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

  return (
    <EuiFlexGroup
      role="group"
      {...rest}
      css={cssStyles}
      className={classes}
      alignItems="baseline"
      gutterSize={gutterSize}
    >
      <EuiFlexItem
        grow={1}
        {...descriptionFlexItemProps}
        css={descriptionColumnStyles}
        className={classNames(
          'euiDescribedFormGroup__descriptionColumn',
          descriptionFlexItemProps?.className
        )}
      >
        <EuiTitle size={titleSize} className="euiDescribedFormGroup__title">
          {title}
        </EuiTitle>

        {renderedDescription}
      </EuiFlexItem>

      <EuiFlexItem
        grow={fieldGrowth}
        {...fieldFlexItemProps}
        css={fieldColumnStyles}
        className={fieldClasses}
      >
        {children}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
