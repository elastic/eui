import { PropTypes } from 'react-view';
import { EuiButton, EuiButtonEmpty } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  createOptionalEnum,
} from '../../services/playground';

export const buttonConfig = () => {
  const docgenInfo = Array.isArray(EuiButton.__docgenInfo)
    ? EuiButton.__docgenInfo[0]
    : EuiButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.children = {
    value: 'Button',
    type: PropTypes.String,
    description: 'Visible label',
    hidden: false,
  };

  propsToUse.minWidth = {
    ...propsToUse.minWidth,
    type: PropTypes.Number,
  };

  propsToUse.color = {
    ...propsToUse.color,
    defaultValue: 'primary',
  };

  propsToUse.size = {
    ...propsToUse.size,
    defaultValue: 'm',
  };

  propsToUse.flush = createOptionalEnum(propsToUse.flush);

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'EuiButton',
      props: propsToUse,
      scope: {
        EuiButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiButton'],
        },
      },
    },
    setGhostBackground,
  };
};

export const buttonEmptyConfig = () => {
  const docgenInfo = Array.isArray(EuiButtonEmpty.__docgenInfo)
    ? EuiButtonEmpty.__docgenInfo[0]
    : EuiButtonEmpty.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.children = {
    value: 'Empty button',
    type: PropTypes.String,
    description: 'Visible label',
    hidden: false,
  };

  propsToUse.color = {
    ...propsToUse.color,
    defaultValue: 'primary',
  };

  propsToUse.size = {
    ...propsToUse.size,
    defaultValue: 'm',
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'EuiButtonEmpty',
      props: propsToUse,
      scope: {
        EuiButtonEmpty,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiButtonEmpty'],
        },
      },
    },
    setGhostBackground,
  };
};
