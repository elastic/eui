import React from 'react';
import {
  EuiCode,
  EuiCallOut
} from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './container';
import { EuiLink } from '../../../../../src/components/link/link';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./container');
const html = renderToHtml(Table);

export const section = {
  title: 'Container',
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    }, {
      type: GuideSectionTypes.HTML,
      code: html,
    }
  ],
  text: (
    <div>
      <p>
        The <EuiCode>EuiBasicTableContainer</EuiCode> is a higher level component wrapper around&nbsp;
        <EuiCode>EuiBasicTable</EuiCode> that takes care of state management and exposes the minimum required
        for the consumer to implement. For this reason, if you are not using a centralized state management
        in your application, or if you simply want the state management of the table to be contained within the
        table component - you probably want to use this container.
      </p>
      <EuiCallOut title="What's in a name?" iconType="iInCircle" color="primary">
        The &quot;Container&quot; suffix is based on the common distinction between&nbsp;
        <EuiLink href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" target="_blank">
          Presentational and Container components
        </EuiLink>
      </EuiCallOut>
    </div>
  ),
  props: propsInfo,
  demo: <Table/>
};
