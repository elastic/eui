import React, { useState } from 'react';

import {
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiIcon,
  EuiSwitch,
  EuiSpacer,
  EuiTextColor,
} from '../../../../src/components';

export default () => {
  const [isLoading, setLoading] = useState(false);

  const onToggleChange = (e) => {
    setLoading(e.target.checked);
  };

  return (
    <div>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel hasBorder={true}>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiStat
                  title="2,000"
                  textAlign="left"
                  isLoading={isLoading}
                  titleColor="accent"
                  description={
                    <EuiTextColor color="accent">
                      <span>
                        <EuiIcon type="clock" color="accent" /> 70,29%
                      </span>
                    </EuiTextColor>
                  }
                >
                  Pending widgets
                </EuiStat>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiStat
                  title="22,550"
                  textAlign="left"
                  isLoading={isLoading}
                  titleColor="success"
                  description={
                    <EuiTextColor color="success">
                      <span>
                        <EuiIcon type="check" color="success" /> 88,88%
                      </span>
                    </EuiTextColor>
                  }
                >
                  Successes
                </EuiStat>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel hasBorder={true}>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiStat
                  title="1,554"
                  textAlign="left"
                  isLoading={isLoading}
                  titleColor="danger"
                  description={
                    <EuiTextColor color="accent">
                      <span>
                        <EuiIcon type="error" color="danger" /> 12,20%
                      </span>
                    </EuiTextColor>
                  }
                >
                  Errors
                </EuiStat>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiStat
                  title="8,888"
                  description={
                    <EuiTextColor color="success">
                      <span>
                        <EuiIcon type="sortUp" /> 23,30%
                      </span>
                    </EuiTextColor>
                  }
                  textAlign="left"
                  isLoading={isLoading}
                >
                  Visitor count
                </EuiStat>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel hasBorder={true}>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiStat
                  title="1,554"
                  textAlign="left"
                  isLoading={isLoading}
                  titleColor="danger"
                  description="Good news"
                >
                  <EuiTextColor color="accent">
                    <span>
                      <EuiIcon type="error" color="danger" /> 66,55%
                    </span>
                  </EuiTextColor>
                </EuiStat>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiStat
                  title="8,888"
                  description="Great news"
                  textAlign="left"
                  isLoading={isLoading}
                >
                  <EuiTextColor color="success">
                    <span>
                      <EuiIcon type="sortUp" /> 27,83%
                    </span>
                  </EuiTextColor>
                </EuiStat>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiSwitch
        label="Show as loading"
        checked={isLoading}
        onChange={onToggleChange}
      />
    </div>
  );
};
