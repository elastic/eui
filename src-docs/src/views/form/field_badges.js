import React, {
  Component,
} from 'react';

import {
  EuiBadge,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldBadges,
  EuiCode,
} from '../../../../src/components';

import { Twemoji } from '../../components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  state = {
    simple: ['a', 'b', 'c'],
    parsing: ['a', 'b', 'c'],
    transform: ['a', 'b', 'c'],
    validation: ['🤯', '😒']
  }

  render() {
    return (
      <div>
        { this.renderSimpleExample() }
        { this.renderParseExample() }
        { this.renderTransformExample() }
        { this.renderValidationExample() }
      </div>
    );
  }

  renderSimpleExample() {
    const { simple } = this.state;
    const onInsert = value => this.setState({ simple: [...simple, value] });
    const onRemove = value => this.setState({ simple: simple.filter(source => source !== value) });

    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow
            label="Field with discrete values"
            helpText="
              Once the user presses Enter, the value is inserted to the list.
              They can then click on items on that list to remove them.
            "
          >
            <EuiFieldBadges
              values={simple}
              onInsert={onInsert}
              onRemove={onRemove}
              placeholder="Type and press Enter …"
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="State"
            helpText="These are the values realized as state."
          >
            <div>
              {
                simple.map(value => (
                  <span key={makeId()}>
                    <EuiBadge>{ value }</EuiBadge>
                    { ` ` }
                  </span>
                ))
              }
            </div>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderParseExample() {
    const { parsing } = this.state;
    const onInsert = value => this.setState({ parsing: [...parsing, value] });
    const onRemove = value => this.setState({ parsing: parsing.filter(source => source !== value) });
    const parse = value => value.toUpperCase();

    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow
            label="Field with custom parsing"
            helpText={
              <span>
                Values can be parsed from the user input string by using the
                <EuiCode>parse</EuiCode> prop into any plain JavaScript value or objects we need.
              </span>
            }
          >
            <EuiFieldBadges
              values={parsing}
              onInsert={onInsert}
              onRemove={onRemove}
              placeholder="Type and press Enter …"
              parse={parse}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="State"
            helpText="These are the values realized as state."
          >
            <div>
              {
                parsing.map(value => (
                  <span key={makeId()}>
                    <EuiBadge>{ value }</EuiBadge>
                    { ` ` }
                  </span>
                ))
              }
            </div>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderTransformExample() {
    const { transform } = this.state;
    const onInsert = value => this.setState({ transform: [...transform, value] });
    const onRemove = value => this.setState({ transform: transform.filter(source => source !== value) });
    const renderContent = value => <strong>{value.toUpperCase()}</strong>;

    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow
            label="Field with custom renderContent"
            helpText={
              <span>
                Values can be transformed into any display content with the
                <EuiCode>renderContent</EuiCode> prop, while preserving the underlying data
              </span>
            }
          >
            <EuiFieldBadges
              values={transform}
              onInsert={onInsert}
              onRemove={onRemove}
              placeholder="Type and press Enter …"
              renderContent={renderContent}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="State"
            helpText="These are the values realized as state."
          >
            <div>
              {
                transform.map(value => (
                  <span key={makeId()}>
                    <EuiBadge>{ value }</EuiBadge>
                    { ` ` }
                  </span>
                ))
              }
            </div>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderValidationExample() {
    const { validation } = this.state;
    const onInsert = value => this.setState({ validation: [...validation, value] });
    const onRemove = value => this.setState({ validation: validation.filter(source => source !== value) });
    const validate = value => /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g.test(value); // eslint-disable-line max-len

    const renderContent = value => <Twemoji>{ value }</Twemoji>;

    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow
            label="Field with validation logic"
            helpText={
              <span>
                User input can be validated before parsing occurs via the <EuiCode>isValid</EuiCode> prop.
                Only valid input will be parsed via <EuiCode>parse</EuiCode> and raised
                to <EuiCode>onInsert</EuiCode>. This prevents bad data from making its way onto your state.
              </span>
            }
          >
            <div>
              <EuiFieldBadges
                values={validation}
                onInsert={onInsert}
                onRemove={onRemove}
                placeholder="Only emoji here …"
                isValid={validate}
                renderContent={renderContent}
              />
            </div>
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="State"
            helpText="These are the values realized as state."
          >
            <div>
              {
                validation.map(value => (
                  <span key={makeId()}>
                    <EuiBadge>{ value }</EuiBadge>
                    { ` ` }
                  </span>
                ))
              }
            </div>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
