import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '..';

const typesToClassNameMap = {
  row: 'kuiDescriptionList--row',
  column: 'kuiDescriptionList--column',
  inline: 'kuiDescriptionList--inline',
};

export const TYPES = Object.keys(typesToClassNameMap);

const alignmentsToClassNameMap = {
  center: 'kuiDescriptionList--center',
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
  ...rest,
}) => {
  const classes = classNames(
    'kuiDescriptionList',
    typesToClassNameMap[type],
    alignmentsToClassNameMap[align],
    {
      'kuiDescriptionList--compressed': compressed,
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
