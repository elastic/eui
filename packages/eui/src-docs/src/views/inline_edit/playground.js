import { PropTypes } from 'react-view';
import {
  EuiInlineEditText,
  EuiInlineEditTitle,
} from '../../../../src/components';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

const setCommonPropsToUse = (propsToUse) => {
  propsToUse.inputAriaLabel = {
    ...propsToUse.inputAriaLabel,
    value: 'Edit text inline',
    type: PropTypes.String,
  };

  propsToUse.isLoading = {
    type: PropTypes.Boolean,
  };

  propsToUse.isInvalid = {
    type: PropTypes.Boolean,
  };

  propsToUse.startWithEditOpen = {
    type: PropTypes.Boolean,
  };

  propsToUse.onSave = simulateFunction(propsToUse.onSave);
};

export const inlineEditTextConfig = () => {
  const docgenInfo = Array.isArray(EuiInlineEditText.__docgenInfo)
    ? EuiInlineEditText.__docgenInfo[0]
    : EuiInlineEditText.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.defaultValue = {
    ...propsToUse.defaultValue,
    value: 'Hello! You are editing text content!',
    type: PropTypes.String,
  };

  setCommonPropsToUse(propsToUse);

  return {
    config: {
      componentName: 'EuiInlineEditText',
      props: propsToUse,
      scope: {
        EuiInlineEditText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiInlineEditText'],
        },
      },
      customProps: {
        onSave: dummyFunction,
      },
    },
  };
};

export const inlineEditTitleConfig = () => {
  const docgenInfo = Array.isArray(EuiInlineEditTitle.__docgenInfo)
    ? EuiInlineEditTitle.__docgenInfo[0]
    : EuiInlineEditTitle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.defaultValue = {
    ...propsToUse.defaultValue,
    value: 'Hello! You are editing a title!',
    type: PropTypes.String,
  };

  propsToUse.heading = {
    ...propsToUse.heading,
    value: 'h4',
  };

  setCommonPropsToUse(propsToUse);

  return {
    config: {
      componentName: 'EuiInlineEditTitle',
      props: propsToUse,
      scope: {
        EuiInlineEditTitle,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiInlineEditTitle'],
        },
      },
      customProps: {
        onSave: dummyFunction,
      },
    },
  };
};
