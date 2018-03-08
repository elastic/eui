import React, { Component } from 'react';
import { EuiContextMenuItem, EuiContextMenuPanel } from '../context_menu';
import { EuiPopover } from '../popover';
import { EuiButtonIcon } from '../button';

export class CollapsedRecordActions extends Component {

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

    const { actions, recordId, record, model, actionEnabled, onFocus } = this.props;

    const isOpen = this.state.popoverOpen;

    let allDisabled = true;
    const items = actions.reduce((items, action, index) => {
      const key = `action_${recordId}_${index}`;
      const available = action.available ? action.available(record, model) : true;
      if (!available) {
        return items;
      }
      const enabled = actionEnabled(action);
      allDisabled = allDisabled && !enabled;
      if (action.render) {
        const item = action.render(record, model, enabled);
        items.push(
          <EuiContextMenuItem key={key}>
            {item}
          </EuiContextMenuItem>
        );
      } else {
        items.push(
          <EuiContextMenuItem
            key={key}
            disabled={!enabled}
            icon={action.icon}
            onClick={action.onClick.bind(null, record, model)}
          >
            {action.name}
          </EuiContextMenuItem>
        );
      }
      return items;
    }, []);

    const popoverButton = (
      <EuiButtonIcon
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
        popoverRef={this.registerPopoverDiv}
        id={`${recordId}-actions`}
        isOpen={isOpen}
        button={popoverButton}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="leftCenter"
      >
        <EuiContextMenuPanel items={items}/>
      </EuiPopover>
    );
  }
}
