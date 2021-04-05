import React from 'react';

import { EuiCode, EuiLink, EuiCallOut } from '../../../../src/components';

export const CodeEditorExample = {
  title: 'Code editor',
  sections: [
    {
      text: (
        <>
          <EuiCallOut iconType="alert" color="danger" title="Deprecated">
            <p>
              The <strong>EuiCodeEditor</strong>, a wrapper of{' '}
              <EuiCode>react-ace</EuiCode>, has been deprecated and will be
              removed in a{' '}
              <EuiLink href="https://github.com/elastic/eui/issues/1469">
                future release
              </EuiLink>
              .
              <br />
              If you are a Kibana developer, we recommend using the{' '}
              <EuiLink href="https://github.com/elastic/kibana/tree/master/packages/kbn-monaco">
                <EuiCode>@kbn/monaco</EuiCode> package
              </EuiLink>{' '}
              within the Kibana codebase.
            </p>
          </EuiCallOut>
        </>
      ),
    },
  ],
};
