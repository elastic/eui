/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';

import { useEuiTheme, useIsWithinBreakpoints } from '../../services';
import { CommonProps } from '../common';

import { EuiDescriptionListProps } from './description_list_types';
import { EuiDescriptionListContext } from './description_list_context';
import { EuiDescriptionListTitle } from './description_list_title';
import { EuiDescriptionListDescription } from './description_list_description';
import { euiDescriptionListStyles } from './description_list.styles';

export const EuiDescriptionList: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDListElement> & EuiDescriptionListProps
> = ({
  align = 'left',
  children,
  className,
  style,
  compressed = false,
  descriptionProps,
  listItems,
  textStyle = 'normal',
  titleProps,
  type: _type = 'row',
  rowGutterSize = 's',
  columnGutterSize = 's',
  columnWidths,
  ...rest
}) => {
  const showResponsiveColumns = useIsWithinBreakpoints(['xs', 's']);
  const type = useMemo(() => {
    if (_type === 'responsiveColumn') {
      return showResponsiveColumns ? 'row' : 'column';
    } else {
      return _type;
    }
  }, [_type, showResponsiveColumns]);

  const euiTheme = useEuiTheme();
  const styles = euiDescriptionListStyles(euiTheme);

  const cssStyles = [
    styles.euiDescriptionList,
    styles[type],
    styles[align],
    type === 'column' && styles.rowGap[rowGutterSize],
    type === 'column' && styles.columnGap[columnGutterSize],
  ];

  const inlineStyles = useMemo(() => {
    if (type === 'column' && columnWidths) {
      // Leave string values as is - e.g. if a consumer passes in a specific '200px' or 'minmax()'
      const convertNumbersToFr = (value: number | string) =>
        typeof value === 'number' ? `${value}fr` : value;

      const titleWidth = convertNumbersToFr(columnWidths[0]);
      const descriptionWidth = convertNumbersToFr(columnWidths[1]);
      return {
        gridTemplateColumns: `${titleWidth} ${descriptionWidth}`,
        ...style,
      };
    }
    return style;
  }, [style, type, columnWidths]);

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
      value={{ type, compressed, textStyle, align, rowGutterSize }}
    >
      <dl
        className={classes}
        css={cssStyles}
        style={inlineStyles}
        {...rest}
        data-type={_type}
      >
        {childrenOrListItems}
      </dl>
    </EuiDescriptionListContext.Provider>
  );
};
