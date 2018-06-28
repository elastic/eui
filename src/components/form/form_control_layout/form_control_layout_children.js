import React, {
  cloneElement,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';

export const LABEL_SIDES = ['left', 'right'];

export const EuiFormControlLayoutChildren = ({
  children,
  inlineLabel,
}) => {

  const labelSide = inlineLabel && inlineLabel.side ? inlineLabel.side : 'left';

  let leftLabel;
  let rightLabel;
  let clonedChildren;

  if (inlineLabel) {
    const labelNode = inlineLabel.node ? inlineLabel.node : inlineLabel;
    const labelClone = cloneElement(labelNode, {
      className: 'euiFormControlLayout__inlineLabel'
    });

    if (labelSide === 'left') {
      leftLabel = labelClone;
    }
    else if (labelSide === 'right') {
      rightLabel = labelClone;
    }

    clonedChildren = cloneElement(children, {
      className: `${children.props.className} euiFormControlLayout__child--noStyle`,
    });
  }


  return (
    <Fragment>
      {leftLabel}
      {clonedChildren || children}
      {rightLabel}
    </Fragment>
  );
};

EuiFormControlLayoutChildren.propTypes = {
  inlineLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      label: PropTypes.node,
      side: PropTypes.oneOf(LABEL_SIDES),
    }),
  ]),
};
