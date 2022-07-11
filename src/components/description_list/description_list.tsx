/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiDescriptionListTitle } from './description_list_title';

import { EuiDescriptionListDescription } from './description_list_description';
import { CommonProps } from '../common';

import { useIsWithinBreakpoints } from '../../services';
import { euiDescriptionListStyles } from './description_list.styles';

import { EuiDescriptionListProps } from './description_list_types';

import { EuiDescriptionListContextProvider } from './description_list_context';

export const EuiDescriptionList: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDListElement> & EuiDescriptionListProps
> = ({
  align = 'left',
  children,
  className,
  compressed = false,
  descriptionProps,
  listItems,
  textStyle = 'normal',
  titleProps,
  type = 'row',
  ...rest
}) => {
  const styles = euiDescriptionListStyles();
  const isMobile = useIsWithinBreakpoints(['xs', 's']);

  const cssStyles = [
    styles.euiDescriptionList,
    styles[align],
    (type === 'column' || (type === 'responsiveColumn' && !isMobile)) &&
      styles.column,
  ];

  const classes = classNames(
    'euiDescriptionList',
    { [`euiDescriptionList--${type}`]: type },
    { [`euiDescriptionList--${align}`]: align },
    { [`euiDescriptionList--${textStyle}`]: textStyle },
    {
      'euiDescriptionList--compressed': compressed,
    },
    className
  );

  let childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = listItems.map((item, index) => {
      return [
        <EuiDescriptionListTitle
          key={`title-${index}`}
          {...titleProps}
          data-type={type}
        >
          {item.title}
        </EuiDescriptionListTitle>,

        <EuiDescriptionListDescription
          key={`description-${index}`}
          {...descriptionProps}
          data-type={type}
        >
          {item.description}
        </EuiDescriptionListDescription>,
      ];
    });
  } else {
    childrenOrListItems = children;
  }

  return (
    <EuiDescriptionListContextProvider
      type={type}
      compressed={compressed}
      textStyle={textStyle}
      align={align}
    >
      <dl className={classes} css={cssStyles} {...rest}>
        {childrenOrListItems}
      </dl>
    </EuiDescriptionListContextProvider>
  );
};
