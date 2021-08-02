import { PropTypes } from 'react-view';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiButtonGroup,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  createOptionalEnum,
  generateCustomProps,
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

export const buttonGroupConfig = () => {
  const docgenInfo = Array.isArray(EuiButtonGroup.__docgenInfo)
    ? EuiButtonGroup.__docgenInfo[0]
    : EuiButtonGroup.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  const options = `[
    {
      id: 'id0',
      label: 'Option one',
    },
    {
      id: 'id1',
      label: 'Option two is selected by default',
    },
    {
      id: 'id2',
      label: 'Option three',
    },
  ]`;

  propsToUse.options = {
    ...propsToUse.options,
    value: options,
  };

  propsToUse.legend = {
    ...propsToUse.legend,
    value: 'Legend is required',
  };

  propsToUse.idSelected = {
    ...propsToUse.idSelected,
    value: 'id1',
  };

  return {
    config: {
      componentName: 'EuiButtonGroup',
      props: propsToUse,
      scope: {
        EuiButtonGroup,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiButtonGroup'],
        },
      },
      customProps: generateCustomProps(['options']),
    },
  };
};

export const buttonIconGroupConfig = () => {
  const docgenInfo = Array.isArray(EuiButtonGroup.__docgenInfo)
    ? EuiButtonGroup.__docgenInfo[0]
    : EuiButtonGroup.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  const options = `[
    {
      id: 'idIcon0',
      label: 'Align left',
      iconType: 'editorAlignLeft',
    },
    {
      id: 'idIcon1',
      label: 'Align center',
      iconType: 'editorAlignCenter',
    },
    {
      id: 'idIcon2',
      label: 'Align right',
      iconType: 'editorAlignRight',
    },
  ]`;

  propsToUse.options = {
    ...propsToUse.options,
    value: options,
  };

  propsToUse.legend = {
    ...propsToUse.legend,
    value: 'Legend is required',
  };

  propsToUse.idSelected = {
    ...propsToUse.idSelected,
    value: 'idIcon1',
  };

  propsToUse.isIconOnly = {
    ...propsToUse.isIconOnly,
    value: true,
  };

  return {
    config: {
      componentName: 'EuiButtonGroup',
      props: propsToUse,
      scope: {
        EuiButtonGroup,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiButtonGroup'],
        },
      },
      customProps: generateCustomProps(['options']),
    },
  };
};
