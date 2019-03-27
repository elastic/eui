import React, { Component, Fragment } from 'react';
import { orderBy } from 'lodash';
import {
  EuiButton,
  EuiCode,
  EuiFlyout,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

import { Options } from './data';
import { createDataStore } from '../tables/data_store';

export default class extends Component {
  constructor(props) {
    super(props);

    this.countries = createDataStore().countries.map(country => {
      return {
        id: country.code,
        label: `${country.name}`,
        append: country.flag,
      };
    });

    this.state = {
      options: Options,
      countries: this.countries,
      isPopoverOpen: false,
      isFlyoutVisible: false,
    };
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      options: orderBy(prevState.options, ['checked'], ['asc']),
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  }

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  }

  onChange = options => {
    this.setState({
      options,
    });
  };

  onFlyoutChange = options => {
    this.setState({
      countries: options,
    });
  };

  closeFlyout = () => {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout = () => {
    this.setState({ isFlyoutVisible: true });
  }

  render() {
    const { isPopoverOpen, options, countries } = this.state;

    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}
      >
        Show popover
      </EuiButton>
    );

    return (
      <Fragment>
        <EuiPopover
          id="popover"
          panelPaddingSize="none"
          button={button}
          isOpen={isPopoverOpen}
          closePopover={this.closePopover}
        >
          <EuiSelectable
            searchable
            searchProps={{
              placeholder: 'Filter list',
              compressed: true,
            }}
            options={options}
            onChange={this.onChange}
          >
            {(list, search) => (
              <div style={{ width: 240 }}>
                <EuiPopoverTitle>{search}</EuiPopoverTitle>
                {list}
                <EuiPopoverFooter>
                  <EuiButton size="s" fullWidth>
                    Manage this list
                  </EuiButton>
                </EuiPopoverFooter>
              </div>
            )}
          </EuiSelectable>
        </EuiPopover>

        <EuiSpacer />

        <EuiButton onClick={this.showFlyout}>
          Show flyout
        </EuiButton>

        {this.state.isFlyoutVisible &&
          <EuiFlyout
            ownFocus
            onClose={this.closeFlyout}
            aria-labelledby="flyoutTitle"
          >
            <EuiSelectable
              searchable
              options={countries}
              onChange={this.onFlyoutChange}
              height="full"
            >
              {(list, search) => (
                <Fragment>
                  <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                      <h2 id="flyoutTitle">
                        Be mindful of the flexbox
                      </h2>
                    </EuiTitle>
                    <EuiSpacer />
                    {search}
                  </EuiFlyoutHeader>
                  <EuiSpacer size="xs" />
                  {list}
                </Fragment>
              )}
            </EuiSelectable>
            <EuiSpacer size="xs" />
            <EuiFlyoutFooter>
              <EuiButton fill>Some extra action</EuiButton>
            </EuiFlyoutFooter>
          </EuiFlyout>
        }

        <EuiSpacer />

        <EuiTitle size="xxs"><h4>Using <EuiCode>listProps.bordered = true</EuiCode></h4></EuiTitle>

        <EuiSpacer />

        <EuiSelectable
          options={options}
          onChange={() => {}}
          style={{ width: 300 }}
          listProps={{ bordered: true }}
        >
          {list => list}
        </EuiSelectable>

      </Fragment>
    );
  }
}
