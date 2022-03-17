import React, { useState } from 'react';
import {
  EuiTimelineItem,
  EuiTimelineItemPanel,
  EuiAvatar,
  EuiText,
  EuiSwitch,
  EuiAccordion,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiLink,
  EuiMarkdownEditor,
  EuiPanel,
  EuiBadge,
  EuiTitle,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const toggleTextSwitchId = useGeneratedHtmlId({ prefix: 'toggleTextSwitch' });
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

  const phase = (title: string, checked: boolean, onChange: any) => (
    <EuiTimelineItem
      icon={
        checked ? (
          <EuiAvatar size="m" name={title} iconType="check" />
        ) : (
          <EuiAvatar size="s" name={title} iconType="dot" color="shade" />
        )
      }
    >
      <EuiTimelineItemPanel
        hasBorder
        headerColor="subdued"
        paddingSize="m"
        header={
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
        }
      >
        <EuiText size="s" grow={false}>
          <p>
            Move data to the cold tier when you are searching it less often and
            don’t need to update it. The cold tier is optimized for cost savings
            over search performance.
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
              <EuiPanel color="subdued">
                Any content inside of <strong>EuiAccordion</strong> will appear
                here.
              </EuiPanel>
            </EuiAccordion>
          </>
        )}
      </EuiTimelineItemPanel>
    </EuiTimelineItem>
  );

  return (
    <div>
      <EuiTimelineItem
        icon={<EuiAvatar size="m" name="Checked" iconType="check" />}
      >
        <EuiTimelineItemPanel
          hasBorder
          headerColor="subdued"
          paddingSize="m"
          header={
            <EuiTitle size="s">
              <h2>
                Hot phase <EuiBadge color="warning">Required</EuiBadge>
              </h2>
            </EuiTitle>
          }
        >
          <p>
            Store your most recent, most frequently-searched data in the hot
            tier. The hot tier provides the best indexing and search performance
            by using the most powerful, expensive hardware.
          </p>
        </EuiTimelineItemPanel>
      </EuiTimelineItem>

      {phase('Warm phase', checked1, onChange1)}

      {phase('Cold phase', checked2, onChange2)}

      {phase('Frozen phase', checked3, onChange3)}
    </div>
  );
};
