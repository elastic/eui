import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';
import { htmlIdGenerator } from '../../../../src/services';
import { EuiCheckbox, EuiRadio, EuiSwitch } from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const CheckboxConfig = () => {
  const docgenInfo = Array.isArray(EuiCheckbox.__docgenInfo)
    ? EuiCheckbox.__docgenInfo[0]
    : EuiCheckbox.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    value: htmlIdGenerator('generated')(),
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    value: 'onChange',
  };

  return {
    config: {
      componentName: 'EuiCheckbox',
      props: propsToUse,
      scope: {
        EuiCheckbox,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCheckbox'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const RadioConfig = () => {
  const docgenInfo = Array.isArray(EuiRadio.__docgenInfo)
    ? EuiRadio.__docgenInfo[0]
    : EuiRadio.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    type: PropTypes.String,
    value: htmlIdGenerator('generated')(),
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    value: 'onChange',
  };

  return {
    config: {
      componentName: 'EuiRadio',
      props: propsToUse,
      scope: {
        EuiRadio,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiRadio'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const SwitchConfig = () => {
  const docgenInfo = Array.isArray(EuiSwitch.__docgenInfo)
    ? EuiSwitch.__docgenInfo[0]
    : EuiSwitch.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.checked = {
    ...propsToUse.checked,
    value: true,
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    value: 'onChange',
  };

  return {
    config: {
      componentName: 'EuiSwitch',
      props: propsToUse,
      scope: {
        EuiSwitch,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSwitch'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
