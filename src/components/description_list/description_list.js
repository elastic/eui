import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiDescriptionListTitle,
} from './description_list_title';

import {
  EuiDescriptionListDescription,
} from './description_list_description';

const typesToClassNameMap = {
  row: 'euiDescriptionList--row',
  column: 'euiDescriptionList--column',
  inline: 'euiDescriptionList--inline',
};

export const TYPES = Object.keys(typesToClassNameMap);

const alignmentsToClassNameMap = {
  center: 'euiDescriptionList--center',
  left: '',
};

export const ALIGNMENTS = Object.keys(alignmentsToClassNameMap);

const textStylesToClassNameMap = {
  normal: '',
  reverse: 'euiDescriptionList--reverse',
};

export const TEXT_STYLES = Object.keys(textStylesToClassNameMap);

export const EuiDescriptionList = ({
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
    typesToClassNameMap[type],
    alignmentsToClassNameMap[align],
    textStylesToClassNameMap[textStyle],
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
          </EuiDescriptionListDescription>
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

EuiDescriptionList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.node,
    description: PropTypes.node,
  })),
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Text alignment
   */
  align: PropTypes.oneOf(ALIGNMENTS),

  /**
   * Smaller text and condensed spacing
   */
  compressed: PropTypes.bool,

  /**
   * How should the content be styled, by default
   * this will emphasize the title
   */
  textStyle: PropTypes.oneOf(TEXT_STYLES),

  /**
   * How each item should be layed out
   */
  type: PropTypes.oneOf(TYPES),
};

EuiDescriptionList.defaultProps = {
  align: 'left',
  compressed: false,
  textStyle: 'normal',
  type: 'row',
};
