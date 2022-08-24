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

import { useEuiTheme } from '../../services';
import { euiDescriptionListStyles } from './description_list.styles';

import { EuiDescriptionListProps } from './description_list_types';

import { EuiDescriptionListContext } from './description_list_context';

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
  gutterSize = 'm',
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiDescriptionListStyles(euiTheme);

  const cssStyles = [styles.euiDescriptionList, styles[type], styles[align]];

  const classes = classNames('euiDescriptionList', className);

  let childrenOrListItems = null;

  if (listItems) {
    childrenOrListItems = listItems.map((item, index) => {
      return [
        <EuiDescriptionListTitle key={`title-${index}`} {...titleProps}>
          {item.title}
        </EuiDescriptionListTitle>,

        <EuiDescriptionListDescription
          key={`description-${index}`}
          {...descriptionProps}
        >
          {item.description}
        </EuiDescriptionListDescription>,
      ];
    });
  } else {
    childrenOrListItems = children;
  }

  return (
    <EuiDescriptionListContext.Provider
      value={{ type, compressed, textStyle, align, gutterSize }}
    >
      <dl className={classes} css={cssStyles} {...rest} data-type={type}>
        {childrenOrListItems}
      </dl>
    </EuiDescriptionListContext.Provider>
  );
};
