import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiTitle,
  EuiSpacer,
  EuiFormRow,
  EuiSelect,
  EuiFieldNumber,
  EuiText,
  EuiTextColor,
  EuiCallOut,
} from '../../../../src/components';

export const Step2 = ({
}) => {
  return (
    <div className="euiAnimateContentLoad">
      <EuiTitle>
        <h4>When should an index be moved to each phase?</h4>
      </EuiTitle>
      <EuiSpacer />
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <div style={{ background: '#00A69B', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
            <EuiIcon type="indexFlush" size="xl" />
          </div>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiTitle size="s">
            <h4>Live and hot</h4>
          </EuiTitle>
          <EuiTextColor color="subdued">
            <EuiText size="s">
              <p>By default your indices operate at full speed and can be searched with no delay</p>
            </EuiText>
          </EuiTextColor>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="xxl" />

      <EuiCallOut
        size="s"
        title="These steps are optional. Leaving them empty will keep your indices hot at all times."
      />
      <EuiSpacer size="m" />

      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <div style={{ background: '#00a69b7d', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
            <EuiIcon type="sortDown" size="xl" />
          </div>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSpacer size="s" />
          <EuiTitle size="s">
            <h4>Keep warm phase</h4>
          </EuiTitle>
          <EuiTextColor color="subdued">
            <EuiText size="s">
              <p>While in the warm phase your indices can be searched at a reduced speed?</p>
            </EuiText>
          </EuiTextColor>

          <EuiSpacer />

          <EuiFlexGroup gutterSize="s">
            <EuiFlexItem grow={false}>
              <EuiFormRow label="Move to cold after">
                <EuiFieldNumber id="cold" placeholder="30" />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiSelect
                  options={[
                    { value: 'option_one', text: 'minutes' },
                    { value: 'option_two', text: 'hours' },
                    { value: 'option_three', text: 'days' },
                    { value: 'option_four', text: 'months' },
                  ]}
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{ paddingLeft: 16 }}>
              <EuiFormRow label="Store on these nodes">
                <EuiSelect
                  options={[
                    { value: 'option_one', text: 'Magnolia Electric Company' },
                  ]}
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="xxl" />

      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <div style={{ background: '#dd0a7373', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
            <EuiIcon type="sortDown" size="xl" />
          </div>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSpacer size="s" />
          <EuiTitle size="s">
            <h4>Cold storage phase</h4>
          </EuiTitle>

          <EuiTextColor color="subdued">
            <EuiText size="s">
              <p>Indices are archived during the cold phase and must be warmed up before searching.</p>
            </EuiText>
          </EuiTextColor>

          <EuiSpacer />

          <EuiFlexGroup gutterSize="s">
            <EuiFlexItem grow={false}>
              <EuiFormRow label="Move to cold after">
                <EuiFieldNumber id="cold" placeholder="30" />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiSelect
                  options={[
                    { value: 'option_one', text: 'minutes' },
                    { value: 'option_two', text: 'hours' },
                    { value: 'option_three', text: 'days' },
                    { value: 'option_four', text: 'months' },
                  ]}
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{ paddingLeft: 16 }}>
              <EuiFormRow label="Store on these nodes">
                <EuiSelect
                  options={[
                    { value: 'option_one', text: 'Magnolia Electric Company' },
                  ]}
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="xxl" />

      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <div style={{ background: '#DD0A73', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
            <EuiIcon type="indexClose" size="xl" />
          </div>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSpacer size="s" />
          <EuiTitle size="s">
            <h4>No longer useful, delete phase</h4>
          </EuiTitle>

          <EuiTextColor color="subdued">
            <EuiText size="s">
              <p>You will not be able to retrive your index beyond this point and must rely on your own backups</p>
            </EuiText>
          </EuiTextColor>

          <EuiSpacer size="m" />

          <EuiFlexGroup gutterSize="s">
            <EuiFlexItem grow={false}>
              <EuiFormRow label="Delete my indices after">
                <EuiFieldNumber id="cold" placeholder="30" />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiSelect
                  options={[
                    { value: 'option_one', text: 'minutes' },
                    { value: 'option_two', text: 'hours' },
                    { value: 'option_three', text: 'days' },
                    { value: 'option_four', text: 'months' },
                  ]}
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>

        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
