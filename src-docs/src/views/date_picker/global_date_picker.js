
import React, {
  Component, Fragment,
} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import classNames from 'classnames';

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
  EuiToolTip,
  EuiFieldText,
  EuiButtonIcon,
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
        <div style={{ width: 390, padding: 0 }}>
          <EuiDatePicker
            inline
            showTimeSelect
            shadow={false}
          />
          <EuiFormRow style={{ padding: '0 8px 8px' }}>
            <EuiFieldText />
          </EuiFormRow>
        </div>
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
            <EuiFieldText defaultValue={String(moment().subtract(3, 'day'))} readOnly />
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
        <EuiText size="s" color="subdued" style={{ width: 390, padding: 16 }}>
          <p>
            Setting the time to &quot;Now&quot; means that on every refresh
            this time will be set to the time of the refresh.
          </p>
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
        size="s"
        expand
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class GlobalDateButton extends Component {
  static propTypes = {
    position: PropTypes.oneOf(['start', 'end']),
    isInvalid: PropTypes.bool,
    needsUpdating: PropTypes.bool,
    buttonOnly: PropTypes.bool,
    date: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  togglePopover = () => {
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
    const {
      position,
      isInvalid,
      needsUpdating,
      date,
      buttonProps,
      buttonOnly,
      ...rest
    } = this.props;

    const {
      isPopoverOpen,
    } = this.state;

    const classes = classNames([
      'euiGlobalDatePicker__dateButton',
      `euiGlobalDatePicker__dateButton--${position}`,
      {
        'euiGlobalDatePicker__dateButton-isSelected': isPopoverOpen,
        'euiGlobalDatePicker__dateButton-isInvalid': isInvalid,
        'euiGlobalDatePicker__dateButton-needsUpdating': needsUpdating
      }
    ]);

    let title = date;
    if (isInvalid) {
      title = `Invalid date: ${title}`;
    } else if (needsUpdating) {
      title = `Update needed: ${title}`;
    }

    const button = (
      <button
        onClick={buttonOnly ? undefined : this.togglePopover}
        className={classes}
        title={title}
        {...buttonProps}
      >
        {date}
      </button>
    );

    return buttonOnly ? button : (
      <EuiPopover
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        anchorPosition="downRight"
        panelPaddingSize="none"
        ownFocus
        {...rest}
      >
        <GlobalDatePopover />
      </EuiPopover>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment().format('MMM DD YYYY h:mm:ss.SSS'),
      endDate: moment().add(11, 'd').format('MMM DD YYYY hh:mm:ss.SSS'),
      isPopoverOpen: false,
      showPrettyFormat: false,
      showNeedsUpdate: false,
      isUpdating: false,
      timerIsOn: false,
      recentlyUsed: [
        ['11/25/2017 00:00 AM', '11/25/2017 11:59 PM'],
        ['3 hours ago', '4 minutes ago'],
        'Last 6 months',
        ['06/11/2017 06:11 AM', '06/11/2017 06:11 PM'],
      ],
    };
  }

  setTootipRef = node => (this.tooltip = node);

  showTooltip = () => this.tooltip.showToolTip();
  hideTooltip = () => this.tooltip.hideToolTip();

  togglePopover = (e) => {
    // HACK TODO:
    // this works because react listens to all events at the
    // document level, and you need to interact with the native
    // event's propagation to short-circuit outside click handler
    // see also: https://stackoverflow.com/a/24421834
    e.nativeEvent.stopImmediatePropagation();

    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  }

  togglePrettyFormat = () => {
    this.setState(prevState => ({
      showPrettyFormat: !prevState.showPrettyFormat,
    }));
  }

  toggleNeedsUpdate = () => {
    this.setState(prevState => {

      if (!prevState.showNeedsUpdate) {
        clearTimeout(this.tooltipTimeout);
        this.showTooltip();
        this.tooltipTimeout = setTimeout(() => {
          this.hideTooltip();
        }, 10000);
      }

      return ({
        showNeedsUpdate: !prevState.showNeedsUpdate,
      });
    });
  }

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  }

  toggleTimer = () => {
    this.setState(prevState => ({
      timerIsOn: !prevState.timerIsOn,
    }));
  }

  toggleIsUpdating = () => {
    this.setState(prevState => ({
      isUpdating: !prevState.isUpdating,
    }));
  }


  render() {
    const quickSelectButton = (
      <EuiButtonEmpty
        className="euiFormControlLayout__prepend euiGlobalDatePicker__quickSelectButton"
        textProps={{ className: 'euiGlobalDatePicker__quickSelectButtonText' }}
        onClick={this.togglePopover}
        aria-label="Date quick select"
        size="xs"
        iconType="arrowDown"
        iconSide="right"
      >
        <EuiIcon type={this.state.timerIsOn ? 'clock' : 'calendar'} />
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
      >
        <div style={{ width: 400, maxWidth: '100%' }}>
          {this.renderQuickSelect()}
          <EuiHorizontalRule margin="s" />
          {commonlyUsed}
          <EuiHorizontalRule margin="s" />
          {recentlyUsed}
          <EuiHorizontalRule margin="s" />
          {this.renderTimer()}
        </div>
      </EuiPopover>
    );

    return (
      <Fragment>
        <EuiSwitch label="Pretty format" onChange={this.togglePrettyFormat} checked={this.state.showPrettyFormat} /> &nbsp;
        <EuiSwitch label="Needs update" onChange={this.toggleNeedsUpdate} checked={this.state.showNeedsUpdate} /> &nbsp;
        <EuiSwitch label="Is Updating" onChange={this.toggleIsUpdating} checked={this.state.isUpdating} />
        <EuiSpacer />

        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem style={{ maxWidth: 480 }}>
            <EuiFormControlLayout
              className="euiGlobalDatePicker"
              prepend={quickSelectPopover}
            >
              <EuiDatePickerRange
                className="euiDatePickerRange--inGroup"
                iconType={false}
                isCustom
                startDateControl={
                  <GlobalDateButton
                    date={this.state.startDate.toString()}
                    position="start"
                    needsUpdating={this.state.showNeedsUpdate}
                  />
                }
                endDateControl={
                  <GlobalDateButton
                    date={this.state.endDate.toString()}
                    position="end"
                    needsUpdating={this.state.showNeedsUpdate}
                  />
                }
              >
                {this.state.showPrettyFormat &&
                  <Fragment>
                    <GlobalDateButton
                      buttonOnly
                      date="Some pretty format"
                      position="end"
                      needsUpdating={this.state.showNeedsUpdate}
                      buttonProps={{ onClick: this.togglePopover }}
                    />
                    <EuiButtonEmpty size="xs" style={{ flexGrow: 0 }} onClick={this.togglePrettyFormat}>Show dates</EuiButtonEmpty>
                  </Fragment>
                }
              </EuiDatePickerRange>
            </EuiFormControlLayout>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            {this.renderUpdateButton()}
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }

  renderUpdateButton = () => {
    const color = this.state.showNeedsUpdate ? 'secondary' : 'primary';
    const icon = this.state.showNeedsUpdate ? 'kqlFunction' : 'refresh';
    let text = this.state.showNeedsUpdate ? 'Update' : 'Refresh';

    if (this.state.isUpdating) {
      text = 'Updating';
    }

    return (
      <EuiToolTip ref={this.setTootipRef} content={this.state.showNeedsUpdate ? 'Click to apply' : undefined} position="bottom">
        <EuiButton
          isLoading={this.state.isUpdating}
          className="euiGlobalDatePicker__updateButton"
          color={color}
          fill
          iconType={icon}
          textProps={{ className: 'euiGlobalDatePicker__updateButtonText' }}
        >
          {text}
        </EuiButton>
      </EuiToolTip>
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
        <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
          <EuiFlexItem>
            <EuiTitle size="xxxs"><span>Quick select</span></EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiToolTip content="Previous time window">
              <EuiButtonIcon aria-label="Previous time window" iconType="arrowLeft" />
            </EuiToolTip>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiToolTip content="Next time window">
              <EuiButtonIcon aria-label="Next time window" iconType="arrowRight" />
            </EuiToolTip>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiSelect options={firstOptions} />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiFieldNumber aria-label="Count of" defaultValue="256" />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiSelect options={lastOptions} />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow>
              <EuiButton size="s" onClick={this.closePopover} style={{ minWidth: 0 }}>Apply</EuiButton>
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
        <EuiText size="s" className="euiGlobalDatePicker__popoverSection">
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
        <EuiFlexItem grow={false} key={date}><EuiLink onClick={this.closePopover}>{dateRange || date}</EuiLink></EuiFlexItem>
      );
    });

    return (
      <Fragment>
        <EuiTitle size="xxxs"><span>Recently used date ranges</span></EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" className="euiGlobalDatePicker__popoverSection">
          <EuiFlexGroup gutterSize="s" direction="column">
            {links}
          </EuiFlexGroup>
        </EuiText>
      </Fragment>
    );
  }

  renderTimer = () => {
    const lastOptions = [
      { value: 'minutes', text: 'minutes' },
      { value: 'hours', text: 'hours' },
    ];

    return (
      <Fragment>
        <EuiTitle size="xxxs"><span>Refresh every</span></EuiTitle>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiFieldNumber aria-label="Count of" defaultValue="256" />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiSelect options={lastOptions} />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow>
              <EuiButton
                iconType={this.state.timerIsOn ? 'stop' : 'play'}
                size="s"
                onClick={this.toggleTimer}
                style={{ minWidth: 90 }}
              >
                {this.state.timerIsOn ? 'Stop' : 'Start'}
              </EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }

}
