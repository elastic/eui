import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiIcon } from '../icon';
import { EuiText, EuiTextColor } from '../text';
import { EuiTitle } from '../title';

export const EuiEmptyPrompt = ({
  iconType,
  title,
  body,
  actions,
  className,
  ...rest,
}) => {
  const classes = classNames('euiEmptyPrompt', className);

  let icon;

  if (iconType) {
    icon = (
      <Fragment>
        <EuiIcon type={iconType} size="xxl" color="subdued" />
        <EuiSpacer size="s" />
      </Fragment>
    )
  }

  let content;

  if (body || title) {
    let titleEl;

    if (title) {
      titleEl = (
        <Fragment>
          <EuiTitle>
            {title}
          </EuiTitle>
          <EuiSpacer size="m" />
        </Fragment>
      )
    }

    let bodyEl;

    if (body) {
      bodyEl = (
        <Fragment>
          <EuiText>
            {body}
          </EuiText>
          <EuiSpacer size="l" />
        </Fragment>
      )
    }

    content = (
      <EuiTextColor color="subdued">
        {titleEl}
        {bodyEl}
      </EuiTextColor>
    )
  }

  let actionsEl;

  if (actions) {
    let actionsRow;

    if (Array.isArray(actions)) {
      actionsRow = (
        <EuiFlexGroup gutterSize="m" alignItems="center" justifyContent="center">
          {
            actions.map((action, index) => (
              <EuiFlexItem key={index} grow={false}>
                {action}
              </EuiFlexItem>
            ))
          }
        </EuiFlexGroup>
      )
    } else {
      actionsRow = actions
    }

    actionsEl = (
      <Fragment>
        <EuiSpacer size="s" />
        {actionsRow}
      </Fragment>
    )
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      {icon}
      {content}
      {actionsEl}

    </div>
  );
};

EuiEmptyPrompt.propTypes = {
  iconType: PropTypes.string,
  title: PropTypes.node,
  body: PropTypes.node,
  actions: PropTypes.node,
  className: PropTypes.string,
};
