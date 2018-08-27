import React from 'react';

import {
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiIcon,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiStat
          title="8,888"
          description="Much widgets"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="8,888"
          description="Total of things"
          color="accent"
          textAlign="center"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="8,888"
          description="Much widgets"
          color="secondary"
          textAlign="center"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="8,888 €"
          description="Cost of widgets"
          color="danger"
          textAlign="right"
        />
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiPanel paddingSize="s">
          <EuiStat
            title="8,888,888"
            description="Total of things"
            color="primary"
            titleSize="s"
          />
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel paddingSize="s">
          <EuiStat
            title="8,888,888"
            description="Total of things"
            color="accent"
            textAlign="center"
            titleSize="s"
          />
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel paddingSize="s">
          <EuiStat
            title="8,888,888"
            description="Total of things"
            color="secondary"
            textAlign="center"
            titleSize="s"
          />
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel paddingSize="s">
          <EuiStat
            title="$ 8,888.88"
            description="Cost of things"
            color="danger"
            textAlign="right"
            titleSize="s"
          />
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiPanel>
          <EuiStat
            title="8,888,888"
            description="Total of things"
            color="darkest"
            titleSize="m"
          />
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel>
          <EuiStat
            title="8,888,888"
            description="Total of things"
            color="accent"
            textAlign="center"
            titleSize="m"
          />
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel>
          <EuiStat
            title="8,888,888"
            description="Total of things"
            color="secondary"
            textAlign="center"
            titleSize="m"
          />
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel>
          <EuiStat
            title="88.88 %"
            description="Percent of things"
            color="danger"
            textAlign="right"
            titleSize="m"
          />
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiPanel paddingSize="l">
          <EuiStat
            title="8,888"
            description="Total widgets"
          >
            <EuiIcon type="iInCircle" />
          </EuiStat>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel paddingSize="l">
          <EuiStat
            title="2,000"
            description="Pending widgets"
            color="accent"
            textAlign="center"
          >
            <EuiIcon color="accent" type="clock" />
          </EuiStat>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel paddingSize="l">
          <EuiStat
            title="6,800"
            description="Success widgets"
            color="secondary"
            textAlign="center"
          >
            <EuiIcon color="secondary" type="check" />
          </EuiStat>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel paddingSize="l">
          <EuiStat
            title="88"
            description="Error widgets"
            color="danger"
            textAlign="right"
          >
            <EuiIcon color="danger" type="alert" />
          </EuiStat>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
