import React, { FunctionComponent } from 'react';
import { EuiPanel } from '../../../../src/components/panel';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiButtonIcon } from '../../../../src/components/button';
import { EuiIcon } from '../../../../src/components/icon';

type CircleIndicatorProps = {
  name: string;
};

const CircleIndicator: FunctionComponent<CircleIndicatorProps> = ({ name }) => (
  <span className="guideDemo__notificationEventCircleIndicator">{name}</span>
);

export default () => {
  return (
    <EuiPanel
      paddingSize="s"
      className="guideDemo__highlightGrid"
      style={{ maxWidth: '540px' }}>
      <div className="guideDemo__notificationEvent">
        <div className="guideDemo__notificationEventTopRow">
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="A" />
            <EuiButtonIcon
              iconType="dot"
              className="euiNotificationEventReadButton"
            />
          </div>
          <div className="guideDemo__notificationEventMeta guideDemo__notificationEventHighlight">
            <CircleIndicator name="B" />
            <div className="euiNotificationEventMeta">
              <div className="euiNotificationEventMeta__section">
                <EuiIcon type="logoElastic" />
                <EuiBadge color="hollow">meta.type: meta.severity</EuiBadge>
              </div>

              <div className="euiNotificationEventMeta__section">meta.time</div>
            </div>
          </div>
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="C" />
            <EuiButtonIcon iconType="boxesVertical" color="subdued" />
          </div>
        </div>
        <div className="guideDemo__notificationEventSections">
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="D" /> <span>title</span>
          </div>
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="E" /> <span>messages</span>
          </div>
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="F" /> <span>primaryAction</span>
          </div>
        </div>
      </div>
    </EuiPanel>
  );
};
