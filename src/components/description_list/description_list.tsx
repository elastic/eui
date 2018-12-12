import React, { HTMLAttributes, ReactNode, SFC } from 'react';
import classNames from 'classnames';

import {
  EuiDescriptionListTitle,
} from './description_list_title';

import {
  EuiDescriptionListDescription,
} from './description_list_description';
import { CommonProps, keysOf } from '../common';

export type EuiDescriptionListType = keyof typeof typesToClassNameMap;
export type EuiDescriptionListAlignment = keyof typeof alignmentsToClassNameMap;
export type EuiDescriptionListTextStyle = keyof typeof textStylesToClassNameMap;

export interface EuiDescriptionListProps {
  listItems?: Array<{ title: ReactNode, description: ReactNode }>;
  /**
   * Text alignment
   */
  align?: EuiDescriptionListAlignment;
  /**
   * Smaller text and condensed spacing
   */
  compressed?: boolean;
  /**
   * How should the content be styled, by default
   * this will emphasize the title
   */
  textStyle?: EuiDescriptionListTextStyle;
  /**
   * How each item should be layed out
   */
  type?: EuiDescriptionListType;
}

const typesToClassNameMap = {
  row: 'euiDescriptionList--row',
  column: 'euiDescriptionList--column',
  inline: 'euiDescriptionList--inline',
};

export const TYPES = keysOf(typesToClassNameMap);

const alignmentsToClassNameMap = {
  center: 'euiDescriptionList--center',
  left: '',
};

export const ALIGNMENTS = keysOf(alignmentsToClassNameMap);

const textStylesToClassNameMap = {
  normal: '',
  reverse: 'euiDescriptionList--reverse',
};

export const TEXT_STYLES = keysOf(textStylesToClassNameMap);

export const EuiDescriptionList: SFC<CommonProps & HTMLAttributes<HTMLDListElement> & EuiDescriptionListProps> = ({
  children,
  className,
  listItems,
  align,
  compressed,
  textStyle,
  type,
  ...rest
}) => {
  const classes = classNames(
    'euiDescriptionList',
    type ? typesToClassNameMap[type] : undefined,
    align ? alignmentsToClassNameMap[align] : undefined,
    textStyle ? textStylesToClassNameMap[textStyle] : undefined,
    {
      'euiDescriptionList--compressed': compressed,
    },
    className
  );

  let childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = (
      listItems.map((item, index) => {
        return [
          <EuiDescriptionListTitle key={`title-${index}`}>
            {item.title}
          </EuiDescriptionListTitle>,

          <EuiDescriptionListDescription key={`description-${index}`}>
            {item.description}
          </EuiDescriptionListDescription>,
        ];
      })
    );
  } else {
    childrenOrListItems = children;
  }

  return (
    <dl
      className={classes}
      {...rest}
    >
      {childrenOrListItems}
    </dl>
  );
};

EuiDescriptionList.defaultProps = {
  align: 'left',
  compressed: false,
  textStyle: 'normal',
  type: 'row',
};
