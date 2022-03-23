import React, { useState } from 'react';
import {
  EuiTimelineItem,
  EuiAvatar,
  EuiText,
  EuiSwitch,
  EuiAccordion,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiBadge,
  EuiTitle,
  EuiSplitPanel,
  EuiPanel,
  EuiHorizontalRule,
} from '../../../../src/components';

import {
  useGeneratedHtmlId,
  euiPaletteColorBlind,
} from '../../../../src/services';

export default () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const buttonElementAccordionId = useGeneratedHtmlId({
    prefix: 'buttonElementAccordion',
  });

  const onChange1 = (e: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setChecked1(e.target.checked);
  };

  const onChange2 = (e: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setChecked2(e.target.checked);
  };

  const onChange3 = (e: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setChecked3(e.target.checked);
  };

  const phase = (
    title: string,
    checked: boolean,
    onChange: any,
    avatarColor: string
  ) => (
    <EuiTimelineItem
      icon={
        checked ? (
          <EuiAvatar
            size="m"
            name="check icon"
            iconType="check"
            color={avatarColor}
          />
        ) : (
          <EuiAvatar size="s" name="dot icon" iconType="dot" color="subdued" />
        )
      }
    >
      <EuiSplitPanel.Outer color="transparent" hasBorder grow>
        <EuiSplitPanel.Inner color={checked ? 'transparent' : 'subdued'}>
          <EuiFlexGroup alignItems="center" gutterSize="s">
            <EuiFlexItem grow={false}>
              <EuiSwitch
                showLabel={false}
                label={checked ? `${title} is on` : `${title} is off`}
                checked={checked}
                onChange={onChange}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiTitle size="s">
                <h2>{title}</h2>
              </EuiTitle>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiSplitPanel.Inner>
        <EuiHorizontalRule margin="none" />
        <EuiSplitPanel.Inner>
          <EuiText size="s" grow={false}>
            <p>
              Move data to the cold tier when you are searching it less often
              and don’t need to update it. The cold tier is optimized for cost
              savings over search performance.
            </p>
          </EuiText>

          {checked && (
            <>
              <EuiSpacer />
              <EuiAccordion
                id={buttonElementAccordionId}
                buttonElement="div"
                buttonContent="Advanced settings"
              >
                <EuiPanel color="transparent">
                  Any content inside of <strong>EuiAccordion</strong> will
                  appear here.
                </EuiPanel>
              </EuiAccordion>
            </>
          )}
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </EuiTimelineItem>
  );

  return (
    <div>
      <EuiTimelineItem
        icon={
          <EuiAvatar
            size="m"
            name="check icon"
            iconType="check"
            color={euiPaletteColorBlind()[0]}
          />
        }
      >
        <EuiSplitPanel.Outer color="transparent" hasBorder grow>
          <EuiSplitPanel.Inner>
            <EuiTitle size="s">
              <h2>
                Hot phase <EuiBadge color="warning">Required</EuiBadge>
              </h2>
            </EuiTitle>
          </EuiSplitPanel.Inner>
          <EuiHorizontalRule margin="none" />
          <EuiSplitPanel.Inner>
            <EuiText grow={false} size="s">
              <p>
                Store your most recent, most frequently-searched data in the hot
                tier. The hot tier provides the best indexing and search
                performance by using the most powerful, expensive hardware.
              </p>
            </EuiText>
          </EuiSplitPanel.Inner>
        </EuiSplitPanel.Outer>
      </EuiTimelineItem>

      {phase('Warm phase', checked1, onChange1, euiPaletteColorBlind()[1])}

      {phase('Cold phase', checked2, onChange2, euiPaletteColorBlind()[2])}

      {phase('Frozen phase', checked3, onChange3, euiPaletteColorBlind()[3])}
    </div>
  );
};
