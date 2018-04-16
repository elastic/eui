import React, { Component } from 'react';
import { EuiContextMenuItem, EuiContextMenuPanel } from '../context_menu';
import { EuiPopover } from '../popover';
import { EuiButtonIcon } from '../button';

export class CollapsedItemActions extends Component {

  constructor(props) {
    super(props);
    this.state = { popoverOpen: false };
  }

  togglePopover = () => {
    this.setState(prevState => ({ popoverOpen: !prevState.popoverOpen }));
  };

  closePopover = () => {
    this.setState({ popoverOpen: false });
  };

  onPopoverBlur = () => {
    // you must be asking... WTF? I know... but this timeout is
    // required to make sure we process the onBlur events after the initial
    // event cycle. Reference:
    // https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b
    window.requestAnimationFrame(() => {
      if (!this.popoverDiv.contains(document.activeElement)) {
        this.props.onBlur();
      }
    });
  };

  registerPopoverDiv = (popoverDiv) => {
    if (!this.popoverDiv) {
      this.popoverDiv = popoverDiv;
      this.popoverDiv.addEventListener('focusout', this.onPopoverBlur);
    }
  };

  componentWillUnmount() {
    if (this.popoverDiv) {
      this.popoverDiv.removeEventListener('focusout', this.onPopoverBlur);
    }
  }

  render() {

    const { actions, itemId, item, actionEnabled, onFocus, className } = this.props;

    const isOpen = this.state.popoverOpen;

    let allDisabled = true;
    const controls = actions.reduce((controls, action, index) => {
      const key = `action_${itemId}_${index}`;
      const available = action.available ? action.available(item) : true;
      if (!available) {
        return controls;
      }
      const enabled = actionEnabled(action);
      allDisabled = allDisabled && !enabled;
      if (action.render) {
        const actionControl = action.render(item, enabled);
        const actionControlOnClick = actionControl && actionControl.props && actionControl.props.onClick;
        controls.push(
          <EuiContextMenuItem key={key} onClick={actionControlOnClick ? actionControlOnClick.bind(null, item) : () => {}}>
            {actionControl}
          </EuiContextMenuItem>
        );
      } else {
        controls.push(
          <EuiContextMenuItem
            key={key}
            disabled={!enabled}
            icon={action.icon}
            onClick={action.onClick.bind(null, item)}
          >
            {action.name}
          </EuiContextMenuItem>
        );
      }
      return controls;
    }, []);

    const popoverButton = (
      <EuiButtonIcon
        className={className}
        aria-label="actions"
        iconType="gear"
        color="text"
        isDisabled={allDisabled}
        onClick={this.togglePopover.bind(this)}
        onFocus={onFocus}
      />
    );

    return (
      <EuiPopover
        className={className}
        popoverRef={this.registerPopoverDiv}
        id={`${itemId}-actions`}
        isOpen={isOpen}
        button={popoverButton}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="leftCenter"
      >
        <EuiContextMenuPanel items={controls}/>
      </EuiPopover>
    );
  }
}
