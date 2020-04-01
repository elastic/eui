import React, { useState } from 'react';

import { EuiSwitch, EuiStat, EuiSpacer } from '../../../../src/components';

export default () => {
  const [isLoading, setLoading] = useState(true);

  const onToggleChange = e => {
    setLoading(e.target.checked);
  };

  return (
    <div>
      <EuiStat
        title="7,600 mm"
        description="Total People"
        isLoading={isLoading}
      />
      <EuiSpacer />
      <EuiSwitch
        label="Show as loading"
        checked={isLoading}
        onChange={onToggleChange}
      />
    </div>
  );
};
