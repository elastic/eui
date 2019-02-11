import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiFocusTrap,
} from '../../../../src/components';

import FocusTrap from './focus_trap';
const focusTrapSource = require('!!raw-loader!./focus_trap');
const focusTrapHtml = renderToHtml(FocusTrap);

export const FocusTrapExample = {
  title: 'Focus Trap',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: focusTrapSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: focusTrapHtml,
    }],
    text: (
      <p>
      Use the <EuiCode>clickOutsideDisables</EuiCode> prop to disabled focus lock on clicks outside of the locked area.
      </p>
    ),
    props: { EuiFocusTrap },
    demo: <FocusTrap />,
  }],
};
