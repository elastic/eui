import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Expression from './expression';
const expressionSource = require('!!raw-loader!./expression');
const expressionHtml = renderToHtml(Expression);

export const ExpressionExample = {
  title: 'Expression',
  sections: [{
    title: 'Expression',
    source: [{
      type: GuideSectionTypes.JS,
      code: expressionSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: expressionHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>EuiExpression</EuiCode> component to surface editable expressions.
      </p>
    ),
    demo: <Expression />,
  }],
};
