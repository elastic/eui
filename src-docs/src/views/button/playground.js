import { PropTypes } from 'react-view';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
} from '../../../../src/components/';
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

export const buttonIconConfig = () => {
  const docgenInfo = Array.isArray(EuiButtonIcon.__docgenInfo)
    ? EuiButtonIcon.__docgenInfo[0]
    : EuiButtonIcon.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType, 'help');

  propsToUse['aria-label'] = {
    ...propsToUse['aria-label'],
    value: 'Icon button',
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'EuiButtonIcon',
      props: propsToUse,
      scope: {
        EuiButtonIcon,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiButtonIcon'],
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

  propsToUse.flush = createOptionalEnum(propsToUse.flush);

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
