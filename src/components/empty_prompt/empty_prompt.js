import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TITLE_SIZES } from '../title/title';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiIcon, COLORS, IconPropType } from '../icon/icon';
import { EuiText, EuiTextColor } from '../text';
import { EuiTitle } from '../title';

export const EuiEmptyPrompt = ({
  iconType,
  iconColor,
  title,
  titleSize,
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
        <EuiIcon type={iconType} size="xxl" color={iconColor} />
        <EuiSpacer size="s" />
      </Fragment>
    );
  }

  let content;

  if (body || title) {
    let titleEl;

    if (title) {
      titleEl = (
        <Fragment>
          <EuiTitle size={titleSize}>
            {title}
          </EuiTitle>
          <EuiSpacer size="m" />
        </Fragment>
      );
    }

    let bodyEl;

    if (body) {
      bodyEl = (
        <Fragment>
          <EuiText>
            {body}
          </EuiText>
        </Fragment>
      );
    }

    content = (
      <EuiTextColor color="subdued">
        {titleEl}
        {bodyEl}
      </EuiTextColor>
    );
  }

  let actionsEl;

  if (actions) {
    let actionsRow;

    if (Array.isArray(actions)) {
      actionsRow = (
        <EuiFlexGroup
          gutterSize="m"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          {actions.map((action, index) => (
            <EuiFlexItem key={index} grow={false}>
              {action}
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      );
    } else {
      actionsRow = actions;
    }

    actionsEl = (
      <Fragment>
        <EuiSpacer size="s" />
        {actionsRow}
      </Fragment>
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      {icon}
      {content}
      {body && actions &&
        <EuiSpacer size="l" />
      }
      {actionsEl}
    </div>
  );
};

EuiEmptyPrompt.propTypes = {
  iconType: IconPropType,

  /**
   * Pass `null` to use original icon color
   */
  iconColor: PropTypes.oneOf(COLORS),
  title: PropTypes.node,
  titleSize: PropTypes.oneOf(TITLE_SIZES),
  body: PropTypes.node,
  actions: PropTypes.node,
  className: PropTypes.string,
};

EuiEmptyPrompt.defaultProps = {
  iconColor: 'subdued',
};
