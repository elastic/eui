import { PropTypes } from 'react-view';
import { EuiSuggest } from '../../../../src/components';
import {
  propUtilityForPlayground,
  generateCustomProps,
  createOptionalEnum,
  simulateFunction,
  dummyFunction,
} from '../../services/playground';

export const suggestConfig = () => {
  const docgenInfo = Array.isArray(EuiSuggest.__docgenInfo)
    ? EuiSuggest.__docgenInfo[0]
    : EuiSuggest.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  const suggestions = `[
    {
      type: { iconType: 'kqlField', color: 'tint4' },
      label: 'Field sample',
    },
    {
      type: { iconType: 'kqlValue', color: 'tint0' },
      label: 'Value sample',
    },
    {
      type: { iconType: 'kqlSelector', color: 'tint2' },
      label: 'Conjunction sample',
    },
    {
      type: { iconType: 'kqlOperand', color: 'tint1' },
      label: 'Operator sample',
    },
    {
      type: { iconType: 'search', color: 'tint8' },
      label: 'Recent search',
    },
    {
      type: { iconType: 'save', color: 'tint3' },
      label: 'Saved search',
    },
  ]`;
  propsToUse.suggestions = {
    ...propsToUse.suggestions,
    value: suggestions,
  };

  propsToUse.status = {
    ...createOptionalEnum(propsToUse.status),
    defaultValue: 'unchanged',
  };

  propsToUse.onItemClick = simulateFunction(propsToUse.onItemClick);
  propsToUse.onInputChange = simulateFunction(propsToUse.onInputChange);
  propsToUse.onSearchChange = simulateFunction(propsToUse.onSearchChange);

  propsToUse.maxHeight = {
    ...propsToUse.maxHeight,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiSuggest',
      props: propsToUse,
      scope: {
        EuiSuggest,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSuggest'],
        },
      },
      customProps: {
        ...generateCustomProps(['suggestions']),
        onItemClick: dummyFunction,
        onInputChange: dummyFunction,
        onSearchChange: dummyFunction,
      },
    },
  };
};
