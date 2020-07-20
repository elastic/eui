import React from 'react';
import { Link } from 'react-router-dom';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiFocusTrap } from '../../../../src/components';

import FocusTrap from './focus_trap';
const focusTrapSource = require('!!raw-loader!./focus_trap');
const focusTrapHtml = renderToHtml(FocusTrap);

export const FocusTrapExample = {
  title: 'Focus trap',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: focusTrapSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: focusTrapHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            Use <strong>EuiFocusTrap</strong> to prevent keyboard-initiated
            focus from leaving a defined area. Temporary flows and UX escapes
            that occur in components such as{' '}
            <Link to="/layout/modal">
              <strong>EuiModal</strong>
            </Link>{' '}
            and{' '}
            <Link to="/layout/flyout">
              <strong>EuiFlyout</strong>
            </Link>{' '}
            are prime examples.
          </p>
          <p>
            For components that project content in a React portal,{' '}
            <strong>EuiFocusTrap</strong> will maintain the tab order expected
            by users.
          </p>
          <p>
            Use <EuiCode>clickOutsideDisables</EuiCode> to disable the focus
            trap when the user clicks outside the trap.
          </p>
        </React.Fragment>
      ),
      props: { EuiFocusTrap },
      demo: <FocusTrap />,
    },
  ],
};
