import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import { ICON_TYPES } from '@elastic/eui/lib/components/icon/index.js';
import { EuiBadge, COLORS, ICON_SIDES } from '@elastic/eui/lib/components/badge/badge.js';

// Define type of property
interface Props {
    text: string;
    iconType: ICON_TYPES;
    color: COLORS;
    iconSide: string;
    showIconProps: boolean,
}

export class badge extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        text: "Hello World!",
        color: "primary",
        iconType: null,
        iconSide: "left",
        showIconProps: false,
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        text: { type: ControlType.String, title: "text" },
        color: {
            type: ControlType.Enum,
            options: COLORS,
            title: "color",
        },
        showIconProps: {
            type: ControlType.Boolean,
            title: "Need icon?",
        },
        iconType: {
            type: ControlType.Enum,
            options: ICON_TYPES,
            title: "iconType",
            hidden(props) {
                return props.showIconProps === false
            },
        },
        iconSide: {
            type: ControlType.SegmentedEnum,
            options: ICON_SIDES,
            title: "iconSide",
            hidden(props) {
                return props.showIconProps === false
            },
        },
    }

    render() {
    return (
        <EuiBadge 
            color={this.props.color} 
            iconType={this.props.iconType}
            iconSide={this.props.iconSide}
        >
            {this.props.text}
        </EuiBadge>
    );
    }
}