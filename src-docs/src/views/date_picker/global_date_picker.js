
import React, {
  Component, Fragment,
} from 'react';

import moment from 'moment';
import { CalendarContainer } from 'react-datepicker';

import {
  EuiDatePicker,
  EuiDatePickerRange,
  EuiFormControlLayout,
  EuiButtonEmpty,
  EuiIcon,
  EuiLink, EuiTitle, EuiFlexGrid, EuiFlexItem,
  EuiPopover,
  EuiSpacer,
  EuiText,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFormRow,
  EuiSelect,
  EuiFieldNumber,
  EuiButton,
  EuiTabbedContent,
  EuiForm,
  EuiSwitch,
  EuiTextColor,
} from '../../../../src/components';

const commonDates = [
  'Today', 'Yesterday', 'This week', 'Week to date', 'This month', 'Month to date', 'This year', 'Year to date',
];

const relativeSelectOptions = [
  { text: 'Seconds ago', value: 'string:s' },
  { text: 'Minutes ago', value: 'string:m' },
  { text: 'Hours ago', value: 'string:h' },
  { text: 'Days ago', value: 'string:d' },
  { text: 'Weeks ago', value: 'string:w' },
  { text: 'Months ago', value: 'string:M' },
  { text: 'Years ago', value: 'string:y' },
  { text: 'Seconds from now', value: 'string:s+' },
  { text: 'Minutes from now', value: 'string:m+' },
  { text: 'Hours from now', value: 'string:h+' },
  { text: 'Days from now', value: 'string:d+' },
  { text: 'Weeks from now', value: 'string:w+' },
  { text: 'Months from now', value: 'string:M+' },
  { text: 'Years from now', value: 'string:y+' },
];

class GlobalDatePopover extends Component {
  constructor(props) {
    super(props);

    this.tabs = [{
      id: 'absolute',
      name: 'Absolute',
      content: (
        <CalendarContainer className={props.className} style={{ width: 390 }}>
          {props.children}
        </CalendarContainer>
      ),
    }, {
      id: 'relative',
      name: 'Relative',
      content: (
        <EuiForm style={{ width: 390, padding: 16 }}>
          <EuiFlexGroup gutterSize="s" responsive={false}>
            <EuiFlexItem>
              <EuiFormRow>
                <EuiFieldNumber aria-label="Count of" defaultValue="3" />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow>
                <EuiSelect options={relativeSelectOptions} defaultValue="string:d" />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFormRow>
            <EuiDatePicker selected={moment().subtract(3, 'day')} disabled />
          </EuiFormRow>
          <EuiFormRow>
            <EuiSwitch label="Round to the day" />
          </EuiFormRow>
        </EuiForm>
      ),
    }, {
      id: 'now',
      name: 'Now',
      content: (
        <EuiText textAlign="center" style={{ width: 390, padding: 16 }}>
          <EuiTitle size="m"><span>{moment().format('MMMM Do YYYY')}</span></EuiTitle>
          <EuiSpacer size="s" />
          <EuiTitle size="m">
            <EuiTextColor color="subdued">
              <span>{moment().format('h:mm:ss a')}</span>
            </EuiTextColor>
          </EuiTitle>
        </EuiText>
      ),
    }];

    this.state = {
      selectedTab: this.tabs[0],
    };
  }

  onTabClick = (selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        selectedTab={this.state.selectedTab}
        onTabClick={this.onTabClick}
        expand
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment().add(11, 'd'),
      isPopoverOpen: false,
      recentlyUsed: [
        ['11/25/2017 00:00 AM', '11/25/2017 11:59 PM'],
        ['3 hours ago', '4 minutes ago'],
        'Last 6 months',
        ['06/11/2017 06:11 AM', '06/11/2017 06:11 PM'],
      ],
    };
  }

  handleChangeStart = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd = (date) => {
    this.setState({
      endDate: date
    });
  }

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const quickSelectButton = (
      <EuiButtonEmpty
        className="euiFormControlLayout__prepend"
        style={{ borderRight: 'none' }}
        onClick={this.onButtonClick}
        aria-label="Date quick select"
        size="xs"
        iconType="arrowDown"
        iconSide="right"
      >
        <EuiIcon type="calendar" />
      </EuiButtonEmpty>
    );

    const commonlyUsed = this.renderCommonlyUsed(commonDates);
    const recentlyUsed = this.renderRecentlyUsed(this.state.recentlyUsed);

    const quickSelectPopover = (
      <EuiPopover
        id="QuickSelectPopover"
        button={quickSelectButton}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover.bind(this)}
        anchorPosition="downLeft"
        ownFocus
      >
        <div style={{ width: '400px' }}>
          {this.renderQuickSelect()}
          <EuiHorizontalRule />
          {commonlyUsed}
          <EuiHorizontalRule />
          {recentlyUsed}
        </div>
      </EuiPopover>
    );

    return (
      <EuiFormControlLayout
        prepend={quickSelectPopover}
      >
        <EuiDatePickerRange
          className="euiDatePickerRange--inGroup"
          iconType={false}
          startDateControl={
            <EuiDatePicker
              selected={this.state.startDate}
              onChange={this.handleChangeStart}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              isInvalid={this.state.startDate > this.state.endDate}
              aria-label="Start date"
              calendarContainer={GlobalDatePopover}
              showTimeSelect
            />
          }
          endDateControl={
            <EuiDatePicker
              selected={this.state.endDate}
              onChange={this.handleChangeEnd}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              isInvalid={this.state.startDate > this.state.endDate}
              aria-label="End date"
              calendarContainer={GlobalDatePopover}
              showTimeSelect
            />
          }
        />
      </EuiFormControlLayout>
    );
  }

  renderQuickSelect = () => {
    const firstOptions = [
      { value: 'last', text: 'Last' },
      { value: 'previous', text: 'Previous' },
    ];

    const lastOptions = [
      { value: 'seconds', text: 'seconds' },
      { value: 'minutes', text: 'minutes' },
      { value: 'hours', text: 'hours' },
      { value: 'days', text: 'days' },
      { value: 'weeks', text: 'weeks' },
      { value: 'months', text: 'months' },
      { value: 'years', text: 'years' },
    ];

    return (
      <Fragment>
        <EuiTitle size="xxxs"><span>Quick select</span></EuiTitle>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiSelect options={firstOptions} />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiFieldNumber aria-label="Count of" defaultValue="256" />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiSelect options={lastOptions} />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow>
              <EuiButton onClick={this.closePopover} style={{ minWidth: 0 }}>Apply</EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }

  renderCommonlyUsed = (commonDates) => {
    const links = commonDates.map((date) => {
      return (
        <EuiFlexItem key={date}><EuiLink onClick={this.closePopover}>{date}</EuiLink></EuiFlexItem>
      );
    });

    return (
      <Fragment>
        <EuiTitle size="xxxs"><span>Commonly used</span></EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s">
          <EuiFlexGrid gutterSize="s" columns={2} responsive={false}>
            {links}
          </EuiFlexGrid>
        </EuiText>
      </Fragment>
    );
  }

  renderRecentlyUsed = (recentDates) => {
    const links = recentDates.map((date) => {
      let dateRange;
      if (typeof date !== 'string') {
        dateRange = `${date[0]} – ${date[1]}`;
      }

      return (
        <EuiFlexItem key={date}><EuiLink onClick={this.closePopover}>{dateRange || date}</EuiLink></EuiFlexItem>
      );
    });

    return (
      <Fragment>
        <EuiTitle size="xxxs"><span>Recently used date ranges</span></EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s">
          <EuiFlexGroup gutterSize="s" direction="column">
            {links}
          </EuiFlexGroup>
        </EuiText>
      </Fragment>
    );
  }
}
