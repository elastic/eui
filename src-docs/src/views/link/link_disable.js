import React, { Component, Fragment } from 'react';
import { EuiLink, EuiSwitch } from '../../../../src/components';

export class LinkDisable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            disableLink: true
        };
    }

    toggleLinkDisable = () => {
        console.log(this.state.disableLink);
        this.setState(prevState => ({ disableLink: !prevState.disableLink }));
    };

    render() {
        return (
            <Fragment>
                <p>When links are disabled, they inherit the color of surrounding text.</p>
                <EuiSwitch
                    label="Toggle Disabled State"
                    checked={this.state.disableLink}
                    onChange={this.toggleLinkDisable}
                />
                <p>Lo and behold</p>
                <EuiLink disabled={this.state.disableLink} onClick={() => window.alert('Button clicked')}>
                    ghost
                </EuiLink>
            </Fragment>
        );
    }
}   