import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import { EuiPanel, SIZES } from '@elastic/eui/lib/components/panel/panel.js';

// Define type of property
interface Props {
    hasShadow: boolean;
    paddingSize: SIZES;
    betaBadgeLabel: string;
}

export class panel extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        paddingSize: 'm',
        hasShadow: false,
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        hasShadow: { type: ControlType.Boolean, title: "hasShadow" },
        betaBadgeLabel: { type: ControlType.String, title: "betaBadgeLabel" },
        paddingSize: {
            type: ControlType.SegmentedEnum,
            options: SIZES,
            title: "paddingSize",
        },
    }

    render() {
    return (
        <div style={{ display: 'flex', position: 'absolute', height: '100%', width: '100%' }}>
            <EuiPanel
                hasShadow={this.props.hasShadow}
                paddingSize={this.props.paddingSize}
                betaBadgeLabel={this.props.betaBadgeLabel}
            >
                {this.props.children}
            </EuiPanel>
        </div>
    );
    }
}
