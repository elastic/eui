import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import { ICON_TYPES } from '@elastic/eui/lib/components/icon/index.js';
import { EuiButton, COLORS, ICON_SIDES, SIZES } from '@elastic/eui/lib/components/button/button.js';


// Define type of property
interface Props {
    text: string;
    iconType: ICON_TYPES;
    color: COLORS;
    iconSide: string;
    size: string,
    showIconProps: boolean,
    fullWidth: boolean,
    fill: boolean,
}

export class button extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        text: "Hello World!",
        color: "primary",
        iconType: null,
        iconSide: "left",
        size: "large",
        showIconProps: false,
        fullWidth: false,
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        text: { type: ControlType.String, title: "text" },
        fill: {
            type: ControlType.Boolean,
            title: "fill",
        },
        size: {
            type: ControlType.SegmentedEnum,
            options: SIZES,
            title: "size",
        },
        fullWidth: {
            type: ControlType.Boolean,
            title: "fullWidth",
        },
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
        <EuiButton 
            size={this.props.size} 
            fill={this.props.fill} 
            color={this.props.color} 
            iconType={this.props.iconType}
            iconSide={this.props.iconSide}
            style={{ width: this.props.fullWidth ? '100%' : 'auto' }}
        >
            {this.props.text}
        </EuiButton>
    );
    }
}