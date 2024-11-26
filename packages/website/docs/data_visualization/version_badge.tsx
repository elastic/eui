import { EuiBadge } from '@elastic/eui';

import pkg from '../../package.json';
const chartsVersion = pkg.dependencies['@elastic/charts'].replace(
  /[^0-9\.]/g,
  ''
);

export default () => (
  <EuiBadge
    iconType="popout"
    iconSide="right"
    href={`https://github.com/elastic/elastic-charts/tree/v${chartsVersion}`}
  >
    @elastic/charts v{chartsVersion}
  </EuiBadge>
);
