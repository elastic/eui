import React, { Fragment } from 'react';
import { EuiBasicTable, EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './selection';
const source = require('!!raw-loader!./selection');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding selection to a BasicTable',
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    },
    {
      type: GuideSectionTypes.HTML,
      code: html,
    },
  ],
  text: (
    <Fragment>
      <p>
        The following example shows how to configure selection via the{' '}
        <EuiCode>selection</EuiCode> property.
      </p>
      <p>
        It is important to provide a <EuiCode>getAriaLabel</EuiCode> modifier
        function for accessibility. If no modifier function is provided, the
        default aria-label value is &ldquo;Select this row&rdquo;.
      </p>
    </Fragment>
  ),
  components: { EuiBasicTable },
  demo: <Table />,
};
