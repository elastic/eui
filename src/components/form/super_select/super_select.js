import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiSuperSelectControl } from './super_select_control';
import { EuiPopover } from '../../popover';
import { EuiContextMenuItem } from '../../context_menu';
import { keyCodes } from '../../../services';
import { EuiI18n } from '../../i18n';

const SHIFT_BACK = 'back';
const SHIFT_FORWARD = 'forward';

export class EuiSuperSelect extends Component {
  constructor(props) {
    super(props);

    this.itemNodes = [];
    this.state = {
      isPopoverOpen: props.isOpen || false,
      menuWidth: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setItemNode = (node, index) => {
    this.itemNodes[index] = node;
  };

  setPopoverRef = ref => {
    this.popoverRef = ref;
  };

  openPopover = () => {
    this.setState({
      isPopoverOpen: true,
    });

    const focusSelected = () => {
      const indexOfSelected = this.props.options.reduce(
        (indexOfSelected, option, index) => {
          if (indexOfSelected != null) return indexOfSelected;
          if (option == null) return null;
          return option.value === this.props.valueOfSelected ? index : null;
        },
        null
      );

      requestAnimationFrame(() => {
        if (!this._isMounted) {
          return;
        }
        this.setState({
          menuWidth: this.popoverRef.getBoundingClientRect().width - 2, // account for border not inner shadow
        });

        if (this.props.valueOfSelected != null) {
          if (indexOfSelected != null) {
            this.focusItemAt(indexOfSelected);
          } else {
            focusSelected();
          }
        }
      });
    };

    requestAnimationFrame(focusSelected);
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  itemClicked = value => {
    this.setState({
      isPopoverOpen: false,
    });
    this.props.onChange(value);
  };

  onSelectKeyDown = e => {
    if (e.keyCode === keyCodes.UP || e.keyCode === keyCodes.DOWN) {
      e.preventDefault();
      e.stopPropagation();
      this.openPopover();
    }
  };

  onItemKeyDown = e => {
    switch (e.keyCode) {
      case keyCodes.ESCAPE:
        // close the popover and prevent ancestors from handling
        e.preventDefault();
        e.stopPropagation();
        this.closePopover();
        break;

      case keyCodes.TAB:
        // no-op
        e.preventDefault();
        e.stopPropagation();
        break;

      case keyCodes.UP:
        e.preventDefault();
        e.stopPropagation();
        this.shiftFocus(SHIFT_BACK);
        break;

      case keyCodes.DOWN:
        e.preventDefault();
        e.stopPropagation();
        this.shiftFocus(SHIFT_FORWARD);
        break;
    }
  };

  focusItemAt(index) {
    const targetElement = this.itemNodes[index];
    if (targetElement != null) {
      targetElement.focus();
    }
  }

  shiftFocus(direction) {
    const currentIndex = this.itemNodes.indexOf(document.activeElement);
    let targetElementIndex;

    if (currentIndex === -1) {
      // somehow the select options has lost focus
      targetElementIndex = 0;
    } else {
      if (direction === SHIFT_BACK) {
        targetElementIndex =
          currentIndex === 0 ? this.itemNodes.length - 1 : currentIndex - 1;
      } else {
        targetElementIndex =
          currentIndex === this.itemNodes.length - 1 ? 0 : currentIndex + 1;
      }
    }

    this.focusItemAt(targetElementIndex);
  }

  render() {
    const {
      className,
      options,
      valueOfSelected,
      onChange,
      isOpen,
      isInvalid,
      hasDividers,
      itemClassName,
      itemLayoutAlign,
      fullWidth,
      popoverClassName,
      ...rest
    } = this.props;

    const popoverClasses = classNames(
      'euiSuperSelect',
      {
        'euiSuperSelect--fullWidth': fullWidth,
      },
      popoverClassName
    );

    const buttonClasses = classNames(
      {
        'euiSuperSelect--isOpen__button': this.state.isPopoverOpen,
      },
      className
    );

    const itemClasses = classNames(
      'euiSuperSelect__item',
      {
        'euiSuperSelect__item--hasDividers': hasDividers,
      },
      itemClassName
    );

    const button = (
      <EuiSuperSelectControl
        options={options}
        value={valueOfSelected}
        onClick={
          this.state.isPopoverOpen ? this.closePopover : this.openPopover
        }
        onKeyDown={this.onSelectKeyDown}
        className={buttonClasses}
        fullWidth={fullWidth}
        isInvalid={isInvalid}
        {...rest}
      />
    );

    const items = options.map((option, index) => {
      const { value, dropdownDisplay, inputDisplay, ...optionRest } = option;

      return (
        <EuiContextMenuItem
          key={index}
          className={itemClasses}
          icon={valueOfSelected === value ? 'check' : 'empty'}
          onClick={() => this.itemClicked(value)}
          onKeyDown={this.onItemKeyDown}
          layoutAlign={itemLayoutAlign}
          buttonRef={node => this.setItemNode(node, index)}
          style={{ width: this.state.menuWidth }}
          role="option"
          id={value}
          aria-selected={valueOfSelected === value}
          {...optionRest}>
          {dropdownDisplay || inputDisplay}
        </EuiContextMenuItem>
      );
    });

    return (
      <EuiPopover
        className={popoverClasses}
        anchorClassName="euiSuperSelect__popoverAnchor"
        panelClassName="euiSuperSelect__popoverPanel"
        button={button}
        isOpen={isOpen || this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="downCenter"
        ownFocus={false}
        popoverRef={this.setPopoverRef}
        hasArrow={false}>
        <EuiScreenReaderOnly>
          <p role="alert">
            <EuiI18n
              token="euiSuperSelect.screenReaderAnnouncement"
              default="You are in a form selector of {optionsCount} items and must select a single option.
              Use the up and down keys to navigate or escape to close."
              values={{ optionsCount: options.length }}
            />
          </p>
        </EuiScreenReaderOnly>
        <div
          role="listbox"
          aria-activedescendant={valueOfSelected}
          tabIndex="0">
          {items}
        </div>
      </EuiPopover>
    );
  }
}

EuiSuperSelect.propTypes = {
  /**
   * Classes (and `...rest`) will be applied to the control
   */
  className: PropTypes.string,
  /**
   * Classes for the context menu item
   */
  itemClassName: PropTypes.string,
  /**
   * You must pass an `onChange` function to handle the update of the value
   */
  onChange: PropTypes.func,
  /**
   * Pass an array of options that must at least include:
   * `value`: storing unique value of item,
   * `inputDisplay`: what shows inside the form input when selected
   * `dropdownDisplay` (optional): what shows for the item in the dropdown
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      inputDisplay: PropTypes.node,
      dropdownDisplay: PropTypes.node,
    })
  ).isRequired,
  valueOfSelected: PropTypes.string,
  /**
   * Change to `true` if you want horizontal lines between options.
   * This is best used when options are multi-line.
   */
  hasDividers: PropTypes.bool,
  /**
   * Change `EuiContextMenuItem` layout position of icon
   */
  itemLayoutAlign: PropTypes.string,
  /**
   * Make it wide
   */
  fullWidth: PropTypes.bool,
  /**
   * Provides invalid styling
   */
  isInvalid: PropTypes.bool,
  /**
   * Provides loading indictor
   */
  isLoading: PropTypes.bool,
  /**
   * Make it short
   */
  compressed: PropTypes.bool,
  /**
   * Applied to the outermost wrapper (popover)
   */
  popoverClassName: PropTypes.string,
};

EuiSuperSelect.defaultProps = {
  hasDividers: false,
  fullWidth: false,
  compressed: false,
  isInvalid: false,
};
