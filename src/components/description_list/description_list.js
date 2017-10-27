import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '..';

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

export const EuiDescriptionList = ({
  children,
  className,
  listItems,
  align,
  compressed,
  type,
  ...rest
}) => {
  const classes = classNames(
    'euiDescriptionList',
    typesToClassNameMap[type],
    alignmentsToClassNameMap[align],
    {
      'euiDescriptionList--compressed': compressed,
    },
    className
  );

  let childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = (
      listItems.map((item) => {
        return [
          <EuiDescriptionListTitle>{item.title}</EuiDescriptionListTitle>,
          <EuiDescriptionListDescription>{item.description}</EuiDescriptionListDescription>
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
  children: PropTypes.node,
  className: PropTypes.string,
  compressed: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  align: PropTypes.oneOf(ALIGNMENTS),
};

EuiDescriptionList.defaultProps = {
  type: 'row',
  align: 'left',
  compressed: false,
};
