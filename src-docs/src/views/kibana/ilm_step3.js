import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCard,
  EuiTitle,
  EuiSpacer,
  EuiPanel,
  EuiText,
  EuiTextColor,
  EuiHealth,
  EuiCallOut,
  EuiHorizontalRule,
  EuiAccordion,
  EuiFormRow,
  EuiFieldNumber,
  EuiFieldText,
  EuiSelect,
  EuiSwitch,
  EuiButton,
  EuiButtonEmpty,
  EuiLink,
} from '../../../../src/components';

const policies = [
  { name: 'Running hot', hot: true, warm: true },
  { name: 'On call', hot: true, warm: true, cold: true, remove: true},
  { name: 'Archives', hot: true, cold: true},
  { name: 'Deep storage', hot: true, cold: true, remove: true},
  { name: 'Dailies', hot: true},
  { name: 'Dailies archive', hot: true, cold: true, remove: true},
  { name: 'Weeklies', hot: true},
];

export class Step3 extends Component {

  constructor(props) {
    super(props);

  }

  renderPhases() {
    return (
      <div className="euiAnimateContentLoad">
        <EuiTitle>
          <h4>Edit policy: {'{Policy Name}'}</h4>
        </EuiTitle>
        <EuiSpacer size="m" />
        <EuiCallOut
          size="s"
          color="warning"
          title={<span><strong>Only the hot phase is required.</strong> This policy is attached to <strong>3 other templates</strong> besides <strong>logstash_template</strong>.</span>}
        />
        <EuiHorizontalRule className="ilmHrule" />
        <EuiAccordion
          id="cold"
          buttonContent={
            <EuiFlexGroup alignItems="center">
              <EuiFlexItem grow={false}>
                <div style={{ background: '#A30000', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
                  <EuiIcon type="indexFlush" size="xl" />
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiTitle size="s">
                  <h4>Hot phase</h4>
                </EuiTitle>
                <EuiTextColor color="subdued">
                  <EuiText>
                    <p>This phase is required. Rollover data by time and size.</p>
                  </EuiText>
                </EuiTextColor>
              </EuiFlexItem>
            </EuiFlexGroup>
          }
          buttonClassName="ilmAccordion__button"
          buttonContentClassName="ilmAccordion__buttonContent"
        >
          <div style={{ padding: '16px 16px 16px 40px', marginLeft: '-16px' }}>
            <EuiTitle size="s">
              <p>Configuration</p>
            </EuiTitle>
            <EuiSpacer size="m" />
            <EuiFlexGroup>
              <EuiFlexItem style={{ maxWidth: 188 }}>
                <EuiFormRow label="Maximum size stored">
                  <EuiFieldNumber />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem style={{ maxWidth: 188 }}>
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
            <EuiFlexGroup>
              <EuiFlexItem style={{ maxWidth: 188 }}>
                <EuiFormRow label="Maximum age">
                  <EuiFieldNumber />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem  style={{ maxWidth: 188 }}>
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiSelect
                    options={[
                      { value: 'option_one', text: 'minutes' },
                      { value: 'option_two', text: 'days' },
                      { value: 'option_one', text: 'hours' },
                      { value: 'option_one', text: 'weeks' },
                      { value: 'option_one', text: 'months' },
                    ]}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </EuiAccordion>


        <EuiHorizontalRule className="ilmHrule" />
        <EuiAccordion
          id="warm"
          buttonContent={
            <EuiFlexGroup alignItems="center">
              <EuiFlexItem grow={false}>
                <div style={{ background: '#DD0A73', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
                  <EuiIcon type="sortDown" size="xl" />
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiTitle size="s">
                  <h4>Warm phase</h4>
                </EuiTitle>
                <EuiTextColor color="subdued">
                  <EuiText>
                    <p>This phase is optional. Re-allocate indices, redefine number of active shards, replicas, and compress even further.</p>
                  </EuiText>
                </EuiTextColor>
              </EuiFlexItem>
            </EuiFlexGroup>
          }
          buttonClassName="ilmAccordion__button"
          buttonContentClassName="ilmAccordion__buttonContent"
          extraAction={<EuiSwitch label="Enable this phase" />}
        >
          <div style={{ padding: '16px 16px 16px 40px', marginLeft: '-16px' }}>
            <EuiTitle size="s">
              <p>Configuration</p>
            </EuiTitle>
            <EuiSpacer size="m" />
            <EuiFlexGroup>
              <EuiFlexItem style={{ maxWidth: 188 }}>
                <EuiFormRow
                  label="Move to warm phase after"
                  helpText={
                    <span>Or <EuiLink>apply on rollover</EuiLink> instead.</span>
                  }
                >
                  <EuiFieldNumber />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem style={{ maxWidth: 188 }}>
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiSelect
                    options={[
                      { value: 'option_one', text: 'minutes' },
                      { value: 'option_two', text: 'days' },
                      { value: 'option_one', text: 'hours' },
                      { value: 'option_one', text: 'weeks' },
                      { value: 'option_one', text: 'months' },
                    ]}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiFormRow label="Where would you like to allocate these indices?">
              <EuiSelect
                options={[
                  { value: 'option_one', text: 'box_type:warm' },
                  { value: 'option_two', text: 'box_type:hot' },
                  { value: 'option_one', text: 'box_type:cold' },
                ]}
              />
            </EuiFormRow>

            <EuiFlexGroup>
              <EuiFlexItem grow={false} style={{ maxWidth: 188 }}>
                <EuiFormRow label="Number of active shards">
                  <EuiFieldNumber />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiButtonEmpty flush="left">
                    Set to same as hot phase
                  </EuiButtonEmpty>
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiFlexGroup>
              <EuiFlexItem grow={false} style={{ maxWidth: 188 }}>
                <EuiFormRow label="Number of replicas">
                  <EuiFieldNumber />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiButtonEmpty flush="left">
                    Set to same as hot phase
                  </EuiButtonEmpty>
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer />

            <EuiTitle size="s">
              <p>Optional compression</p>
            </EuiTitle>

            <EuiSpacer size="m" />
            <EuiSwitch label="Should we attempt to further compress your data?" />

            <EuiSpacer />

            <EuiFormRow label="How many segments should we compress down to?">
              <EuiFieldNumber />
            </EuiFormRow>

          </div>
        </EuiAccordion>


        <EuiHorizontalRule className="ilmHrule" />
        <EuiAccordion
          id="cold"
          buttonContent={
            <EuiFlexGroup alignItems="center">
              <EuiFlexItem grow={false}>
                <div style={{ background: '#0079a5', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
                  <EuiIcon type="sortDown" size="xl" />
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiTitle size="s">
                  <h4>Cold phase</h4>
                </EuiTitle>
                <EuiTextColor color="subdued">
                  <EuiText>
                    <p>This phase is optional. Re-allocate your indices again and modify the number of replicas.</p>
                  </EuiText>
                </EuiTextColor>
              </EuiFlexItem>
            </EuiFlexGroup>
          }
          buttonClassName="ilmAccordion__button"
          buttonContentClassName="ilmAccordion__buttonContent"
          extraAction={<EuiSwitch label="Enable this phase" />}
        >
          <div style={{ padding: '16px 16px 16px 40px', marginLeft: '-16px' }}>
            <EuiTitle size="s">
              <p>Configuration</p>
            </EuiTitle>
            <EuiSpacer size="m" />
            <EuiFlexGroup>
              <EuiFlexItem style={{ maxWidth: 188 }}>
                <EuiFormRow label="Move to cold phase after">
                  <EuiFieldNumber />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem style={{ maxWidth: 188 }}>
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiSelect
                    options={[
                      { value: 'option_one', text: 'minutes' },
                      { value: 'option_two', text: 'days' },
                      { value: 'option_one', text: 'hours' },
                      { value: 'option_one', text: 'weeks' },
                      { value: 'option_one', text: 'months' },
                    ]}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiFormRow label="Where would you like to allocate these indices?">
              <EuiSelect
                options={[
                  { value: 'option_one', text: 'box_type:warm' },
                  { value: 'option_two', text: 'box_type:hot' },
                  { value: 'option_one', text: 'box_type:cold' },
                ]}
              />
            </EuiFormRow>

            <EuiFlexGroup>
              <EuiFlexItem grow={false} style={{ maxWidth: 188 }}>
                <EuiFormRow label="Number of replicas">
                  <EuiFieldNumber />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiButtonEmpty flush="left">
                    Set to same as hot phase
                  </EuiButtonEmpty>
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>

          </div>
        </EuiAccordion>


        <EuiHorizontalRule className="ilmHrule" />
        <EuiAccordion
          id="delete"
          buttonContent={
            <EuiFlexGroup alignItems="center">
              <EuiFlexItem grow={false}>
                <div style={{ background: '#333', borderRadius: 4, height: 64, width: 64, lineHeight: '64px', textAlign: 'center', color: 'white' }}>
                  <EuiIcon type="indexClose" size="xl" />
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiTitle size="s">
                  <h4>Delete phase</h4>
                </EuiTitle>
                <EuiTextColor color="subdued">
                  <EuiText>
                    <p>This phase is optional. Delete your indices after a configured amount of time.</p>
                  </EuiText>
                </EuiTextColor>
              </EuiFlexItem>
            </EuiFlexGroup>
          }
          buttonClassName="ilmAccordion__button"
          buttonContentClassName="ilmAccordion__buttonContent"
          extraAction={<EuiSwitch label="Enable this phase" />}
        >
          <div style={{ padding: '16px 16px 16px 40px', marginLeft: '-16px' }}>
            <EuiTitle size="s">
              <p>Configuration</p>
            </EuiTitle>
            <EuiSpacer size="m" />
            <EuiFlexGroup>
              <EuiFlexItem style={{ maxWidth: 188 }}>
                <EuiFormRow label="Delete indices after">
                  <EuiFieldNumber />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem style={{ maxWidth: 188 }}>
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiSelect
                    options={[
                      { value: 'option_one', text: 'minutes' },
                      { value: 'option_two', text: 'days' },
                      { value: 'option_one', text: 'hours' },
                      { value: 'option_one', text: 'weeks' },
                      { value: 'option_one', text: 'months' },
                    ]}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </EuiAccordion>
        <EuiHorizontalRule className="ilmHrule" />

        <EuiFormRow label="Policy name">
          <EuiFieldText value="stag-metrics-lifecycle" />
        </EuiFormRow>
        <EuiFormRow
          label="Policy options"
          style={{ maxWidth: '100%' }}
        >
          <EuiSwitch
            style={{ maxWidth: '100%' }}
            label={<span>Save this <strong>as a new policy</strong> so it does not effect other templates.</span>}
          />
        </EuiFormRow>

        <EuiHorizontalRule className="ilmHrule" />
        <EuiButton fill iconSide="right" iconType="sortRight" onClick={this.props.onSelection}>
          Save and continue
        </EuiButton>
      </div>
    );
  }

  render() {
    const {
      onSelection,
      ...rest
    } = this.props;


    return (
      <div>
        {this.renderPhases()}
      </div>
    );
  }
};
