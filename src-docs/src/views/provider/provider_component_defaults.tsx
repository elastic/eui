import React, { FunctionComponent } from 'react';

import { EuiComponentDefaults } from '../../../../src/components/provider/component_defaults';

// Used to generate a "component" that is parsed for its types
// and used to generate a prop table
export const EuiComponentDefaultsProps: FunctionComponent<
  EuiComponentDefaults
> = () => <></>;

// Used by both getting started and EuiProvider component documentation pages
// Exported in one place for DRYness
export const euiProviderComponentDefaultsSnippet = `<EuiProvider
  componentDefaults={{
    EuiTablePagination: { itemsPerPage: 20, },
    EuiFocusTrap: { crossFrame: true },
    EuiPortal: { insert },
  }}
>
  <App />
</EuiProvider>
`;
