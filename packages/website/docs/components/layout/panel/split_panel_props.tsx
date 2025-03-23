import { PropTable } from '@elastic/eui-docusaurus-theme/components';

import docgen from '@elastic/eui-docgen/dist/components/panel/split_panel/split_panel.json';
// Rename the component's generated displayName to match consumer usage
docgen._EuiSplitPanelInner.displayName = 'EuiSplitPanel.Inner';
docgen._EuiSplitPanelOuter.displayName = 'EuiSplitPanel.Outer';

export default () => (
  <>
    <PropTable definition={docgen._EuiSplitPanelOuter} />
    <PropTable definition={docgen._EuiSplitPanelInner} />
  </>
);
