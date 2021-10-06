import React, { Fragment } from 'react';

import {
  EuiBadge,
  EuiPopover,
  EuiButton,
  EuiProgress,
  EuiSpacer,
} from '../../../../src/components';

const data = [
  { label: 'Basic percentage', value: '80' },
  {
    label: 'Long percentage',
    value: '60.0703850454546453168415365451354641354684531',
  },
  { label: 'Another basic percent', value: '45' },
  { label: 'Custom valueText', value: '40', valueText: <span>4,005,678</span> },
  { label: "Women's Accessories", value: '24.0256' },
];

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Show popover
    </EuiButton>
  );

  return (
    <Fragment>
      <EuiPopover
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
      >
        <EuiBadge>Text</EuiBadge>
        <div style={{ maxWidth: 160 }}>
          {data.map((item) => (
            <>
              <EuiProgress
                valueText={true}
                max={100}
                color="success"
                size="s"
                {...item}
              />
              <EuiSpacer size="s" />
            </>
          ))}
        </div>
        <EuiSpacer size="m" />
        <div style={{ maxWidth: 200 }}>
          {data.map((item) => (
            <>
              <EuiProgress
                valueText={true}
                max={100}
                color="primary"
                size="m"
                {...item}
              />
              <EuiSpacer size="s" />
            </>
          ))}
        </div>
      </EuiPopover>
    </Fragment>
  );
};
