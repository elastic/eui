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
  EuiFieldText,
  EuiText,
  EuiTextColor,
  EuiCallOut,
  EuiAccordion,
  EuiHorizontalRule,
  EuiButton,
} from '../../../../src/components';

export const Step2 = ({
  onSelection,
}) => {
  return (
    <div className="euiAnimateContentLoad">

      <EuiTitle>
        <h4>Edit policy</h4>
      </EuiTitle>
      <EuiSpacer/>
      <EuiFlexGroup alignItems="flexEnd">
        <EuiFlexItem grow={false}>
          <EuiFormRow label="Select an existing policy">
            <EuiSelect
              options={[
                { value: 'logstash_template', text: 'Big cluster cooldown' },
                { value: 'option_two', text: 'Small cluster always hot' },
              ]}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiTextColor color="subdued">
            <EuiTitle size="s">
              <p>OR</p>
            </EuiTitle>
          </EuiTextColor>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton>Create a new policy</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiHorizontalRule className="ilmHrule" />
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <div style={{ background: '#00A69B', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
            <EuiIcon type="indexFlush" size="xl" />
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Live and hot</h4>
          </EuiTitle>
          <EuiTextColor color="subdued">
            <EuiText size="s">
              <p>By default your indices operate at full speed and can be searched with no delay</p>
            </EuiText>
          </EuiTextColor>
          <EuiSpacer size="m" />
          <EuiAccordion
            id="hot"
            buttonContent="Tweak advanced settings"
            buttonClassName="ilmAccordion__button"
            buttonContentClassName="ilmAccordion__buttonContent"
          >
            <div style={{ padding: '16px 16px 16px 17px', marginLeft: '-16px' }}>
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiFormRow label="Maximum size stored">
                    <EuiFieldNumber />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiFormRow hasEmptyLabelSpace>
                    <EuiSelect
                      options={[
                        { value: 'option_one', text: 'gigabytes' },
                        { value: 'option_two', text: 'terabyes' },
                        { value: 'option_one', text: 'megabytes' },
                      ]}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{ paddingLeft: 16 }}>
                  <EuiFormRow label="Maximum age of data stored">
                    <EuiFieldNumber />
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
            </div>
          </EuiAccordion>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiHorizontalRule className="ilmHrule" />

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
                    { value: 'option_one', text: 'box_type: warm' },
                  ]}
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer size="m" />
          <EuiAccordion
            id="warm"
            buttonContent="Tweak advanced settings"
            buttonClassName="ilmAccordion__button"
            buttonContentClassName="ilmAccordion__buttonContent"
          >
            <div style={{ padding: '16px 16px 16px 17px', marginLeft: '-16px' }}>
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiFormRow label="Maximum size stored">
                    <EuiFieldNumber />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiFormRow hasEmptyLabelSpace>
                    <EuiSelect
                      options={[
                        { value: 'option_one', text: 'gigabytes' },
                        { value: 'option_two', text: 'terabyes' },
                        { value: 'option_one', text: 'megabytes' },
                      ]}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiFormRow label="Maximum age of data stored">
                    <EuiFieldNumber />
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
              <EuiSpacer />
              <EuiFormRow label="Shrink to this number of shards">
                <EuiFieldNumber style={{ width: 100 }}/>
              </EuiFormRow>
              <EuiFormRow label="Compress into this many segments">
                <EuiFieldNumber style={{ width: 100 }}/>
              </EuiFormRow>
              <EuiFormRow label="Number of replicas allowed">
                <EuiFieldNumber style={{ width: 100 }}/>
              </EuiFormRow>
            </div>
          </EuiAccordion>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiHorizontalRule className="ilmHrule" />

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
              <EuiFormRow isInvalid error={['No node.attr.* could be found. Use node name instead.']} label="Match nodes with this name">
                <EuiFieldText placeholder="dave.sleepy.*"/>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiAccordion
            id="cold"
            buttonContent="Tweak advanced settings"
            buttonClassName="ilmAccordion__button"
            buttonContentClassName="ilmAccordion__buttonContent"
          >
            <div style={{ padding: '16px 16px 16px 17px', marginLeft: '-16px' }}>
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiFormRow label="Maximum size stored">
                    <EuiFieldNumber />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiFormRow hasEmptyLabelSpace>
                    <EuiSelect
                      options={[
                        { value: 'option_one', text: 'gigabytes' },
                        { value: 'option_two', text: 'terabyes' },
                        { value: 'option_one', text: 'megabytes' },
                      ]}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiFormRow label="Maximum age of data stored">
                    <EuiFieldNumber />
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
              <EuiSpacer />
              <EuiFormRow label="Shrink to this number of shards">
                <EuiFieldNumber style={{ width: 100 }}/>
              </EuiFormRow>
              <EuiFormRow label="Compress into this many segments">
                <EuiFieldNumber style={{ width: 100 }}/>
              </EuiFormRow>
              <EuiFormRow label="Number of replicas allowed">
                <EuiFieldNumber style={{ width: 100 }}/>
              </EuiFormRow>
            </div>
          </EuiAccordion>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiHorizontalRule className="ilmHrule" />

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

      <EuiHorizontalRule className="ilmHrule" />

      <EuiButton fill iconSide="right" iconType="sortRight" onClick={onSelection}>
        Save and continue
      </EuiButton>
    </div>
  );
};
