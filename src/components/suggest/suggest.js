import React, { Component } from 'react';

import { EuiButtonEmpty, EuiButton } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiIcon } from '../icon';
import { EuiPopover, EuiPopoverTitle } from '../popover';
// import { EuiSpacer } from '../spacer';
import { EuiSuggestItem } from './suggest_item';
import { EuiSuggestInput } from './suggest_input';

export class EuiSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      status: 'notYetSaved',
      // menuWidth: null,
    };
  }

  render() {
    const {
      className,
      // status,
      // label,
      // prefix,
      suggestions,
      ...rest
    } = this.props;

    const mySuggestions = (suggestions.map((item, index) => (
      <EuiSuggestItem
        type={item.type}
        key={index}
        label={item.label}
        description={item.description}
      />
    )));

    // const hashtagButton = (
    //   <EuiButtonEmpty
    //     onClick={this.onButtonClick.bind(this)}
    //     iconType="arrowDown"
    //     iconSide="right">
    //     <EuiIcon type="number" />
    //   </EuiButtonEmpty>
    // );

    // const hashtag = (
    //   <EuiPopover
    //     id="popover"
    //     button={hashtagButton}
    //     isOpen={this.state.isHashtagPopoverOpen}
    //     anchorPosition="downLeft"
    //     closePopover={this.closeHashtagPopover.bind(this)}>
    //     <EuiPopoverTitle>SAVED QUERIES</EuiPopoverTitle>
    //     <div>
    //       <EuiFlexGroup direction="rowReverse" alignItems="center">
    //         <EuiFlexItem>
    //           <ul>
    //             <li>
    //               <EuiButtonEmpty flush="left">Popular shoes in America</EuiButtonEmpty>
    //               <EuiButtonEmpty iconType="trash" color="danger" />
    //             </li>
    //             <li>
    //               <EuiButtonEmpty flush="left">Popular shirts in Canada</EuiButtonEmpty>
    //               <EuiButtonEmpty iconType="trash" color="danger" />
    //             </li>
    //           </ul>
    //         </EuiFlexItem>
    //       </EuiFlexGroup>
    //       {this.state.value ? (
    //         <EuiFlexGroup direction="rowReverse" alignItems="center">
    //           <EuiFlexItem grow={false}>
    //             <EuiButton fill>Save</EuiButton>
    //           </EuiFlexItem>
    //         </EuiFlexGroup>
    //       ) : (
    //         undefined
    //       )}
    //     </div>
    //   </EuiPopover>
    // );

    const suggestInput = (
      <EuiSuggestInput
        status={this.state.status}
        label={'KQL'}
        prefix={<span>hashtag</span>}
        suggestions={mySuggestions}
      />
    );

    return <div>{suggestInput}</div>;
  }
}
