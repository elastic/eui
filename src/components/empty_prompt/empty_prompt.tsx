import React, {
  FunctionComponent,
  Fragment,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';
import { EuiTitle, EuiTitleSize } from '../title/title';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiIcon, IconColor, IconType } from '../icon/icon';
import { EuiText, EuiTextColor } from '../text';

export type EuiEmptyPromptProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    iconType?: IconType;
    iconColor?: IconColor;
    title?: ReactElement<any>;
    titleSize?: EuiTitleSize;
    body?: ReactNode;
    actions?: ReactNode;
  };

export const EuiEmptyPrompt: FunctionComponent<EuiEmptyPromptProps> = ({
  iconType,
  iconColor = 'subdued',
  title,
  titleSize,
  body,
  actions,
  className,
  ...rest
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
          <EuiTitle size={titleSize}>{title}</EuiTitle>
          <EuiSpacer size="m" />
        </Fragment>
      );
    }

    let bodyEl;

    if (body) {
      bodyEl = (
        <Fragment>
          <EuiText>{body}</EuiText>
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
          direction="column">
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
    <div className={classes} {...rest}>
      {icon}
      {content}
      {body && actions && <EuiSpacer size="l" />}
      {actionsEl}
    </div>
  );
};
