import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiSuperSelectControl } from './super_select_control';
import { EuiPopover } from '../../popover';
import { EuiContextMenuItem } from '../../context_menu';
import { keyCodes } from '../../../services';

const SHIFT_BACK = 'back';
const SHIFT_FORWARD = 'forward';

export class EuiSuperSelect extends Component {
  constructor(props) {
    super(props);

    this.itemNodes = [];
    this.state = {
      isPopoverOpen: props.isOpen || false,
    };
  }

  setItemNode = (node, index) => {
    this.itemNodes[index] = node;
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

      // valueOfSelected is optional, and options may not exist yet
      if (indexOfSelected != null) {
        // wait for the CSS classes to be applied, removing visibility: hidden
        requestAnimationFrame(() => this.focusItemAt(indexOfSelected));
      } else {
        requestAnimationFrame(focusSelected);
      }
    };

    requestAnimationFrame(focusSelected);
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  itemClicked = (value) => {
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
  }

  onItemKeyDown = e => {
    if (e.keyCode === keyCodes.ESCAPE) {
      // close the popover and prevent ancestors from handling
      e.preventDefault();
      e.stopPropagation();
      this.closePopover();
    } else if (e.keyCode === keyCodes.TAB) {
      // no-op
      e.preventDefault();
      e.stopPropagation();
    } else if (e.keyCode === keyCodes.UP) {
      e.preventDefault();
      e.stopPropagation();
      this.shiftFocus(SHIFT_BACK);
    } else if (e.keyCode === keyCodes.DOWN) {
      e.preventDefault();
      e.stopPropagation();
      this.shiftFocus(SHIFT_FORWARD);
    }
  }

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
        targetElementIndex = currentIndex === 0 ? this.itemNodes.length - 1 : currentIndex - 1;
      } else {
        targetElementIndex = currentIndex === this.itemNodes.length - 1 ? 0 : currentIndex + 1;
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
      hasDividers,
      itemClassName,
      itemLayoutAlign,
      ...rest
    } = this.props;

    const buttonClasses = classNames(
      {
        'euiSuperSelect--isOpen__button': this.state.isPopoverOpen,
      },
      className,
    );

    const itemClasses = classNames(
      'euiSuperSelect__item',
      {
        'euiSuperSelect__item--hasDividers': hasDividers,
      },
      itemClassName,
    );

    const button = (
      <EuiSuperSelectControl
        options={options}
        value={valueOfSelected}
        onChange={onChange}
        onClick={this.state.isPopoverOpen ? this.closePopover : this.openPopover}
        onKeyDown={this.onSelectKeyDown}
        className={buttonClasses}
        {...rest}
      />
    );

    const items = options.map((option, index) => {
      return (
        <EuiContextMenuItem
          key={index}
          className={itemClasses}
          icon={valueOfSelected === option.value ? 'check' : 'empty'}
          onClick={() => this.itemClicked(option.value)}
          onKeyDown={this.onItemKeyDown}
          layoutAlign={itemLayoutAlign}
          buttonRef={node => this.setItemNode(node, index)}
        >
          {option.dropdownDisplay || option.inputDisplay}
        </EuiContextMenuItem>
      );
    });

    return (
      <EuiPopover
        className="euiSuperSelect"
        panelClassName="euiSuperSelect__popoverPanel"
        button={button}
        isOpen={isOpen || this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="downCenter"
        ownFocus={false}
      >
        {items}
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
    }),
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
};

EuiSuperSelect.defaultProps = {
  options: [],
};
