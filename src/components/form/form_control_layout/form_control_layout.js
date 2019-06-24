import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFormControlLayoutIcons } from './form_control_layout_icons';

export const ICON_SIDES = ['left', 'right'];

export class EuiFormControlLayout extends Component {
  render() {
    const {
      children,
      icon,
      clear,
      fullWidth,
      isLoading,
      compressed,
      className,
      prepend,
      append,
      readOnly,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiFormControlLayout',
      {
        'euiFormControlLayout--fullWidth': fullWidth,
        'euiFormControlLayout--compressed': compressed,
        'euiFormControlLayout--readOnly': readOnly,
        'euiFormControlLayout--group': prepend || append,
      },
      className
    );

    const prependNodes = this.renderPrepends();
    const appendNodes = this.renderAppends();

    let clonedChildren;
    if ((prepend || append) && children) {
      clonedChildren = cloneElement(children, {
        className: `${
          children.props.className
        } euiFormControlLayout__child--noStyle`,
      });
    }

    return (
      <div className={classes} {...rest}>
        {prependNodes}
        <div className="euiFormControlLayout__childrenWrapper">
          {clonedChildren || children}

          <EuiFormControlLayoutIcons
            icon={icon}
            clear={clear}
            isLoading={isLoading}
          />
        </div>
        {appendNodes}
      </div>
    );
  }

  renderPrepends() {
    const { prepend } = this.props;

    if (!prepend) {
      return;
    }

    let prependNodes;

    if (Array.isArray(prepend)) {
      prependNodes = prepend.map((item, index) => {
        return this.createSideNode(item, 'prepend', index);
      });
    } else {
      prependNodes = this.createSideNode(prepend, 'prepend');
    }

    return prependNodes;
  }

  renderAppends() {
    const { append } = this.props;

    if (!append) {
      return;
    }

    let appendNodes;

    if (Array.isArray(append)) {
      appendNodes = append.map((item, index) => {
        return this.createSideNode(item, 'append', index);
      });
    } else {
      appendNodes = this.createSideNode(append, 'append');
    }

    return appendNodes;
  }

  createSideNode(node, side, key) {
    return cloneElement(node, {
      className: `euiFormControlLayout__${side}`,
      key: key,
    });
  }
}

EuiFormControlLayout.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      type: PropTypes.string,
      side: PropTypes.oneOf(ICON_SIDES),
      onClick: PropTypes.func,
    }),
  ]),
  clear: PropTypes.shape({
    onClick: PropTypes.func,
  }),
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  compressed: PropTypes.bool,
  /**
   * Creates an input group with element(s) coming before children
   */
  prepend: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Creates an input group with element(s) coming after children
   */
  append: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

EuiFormControlLayout.defaultProps = {
  isLoading: false,
  compressed: false,
};
