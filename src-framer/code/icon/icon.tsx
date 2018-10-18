import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import { EuiIcon, SIZES, COLORS, TYPES } from '@elastic/eui/lib/components/icon/icon.js';

// Define type of property
interface Props {
    type: TYPES;
    size: SIZES;
    color: COLORS;
    width: number;
    height: number;
}

export class icon extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        size: "xl",
        type: "logoElasticsearch",
        width: 32,
        height: 32,
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        type: {
            type: ControlType.Enum,
            options: TYPES,
            title: "type",
        },
        color: {
            type: ControlType.Enum,
            options: COLORS,
            title: "color",
        },
        size: {
            type: ControlType.SegmentedEnum,
            options: SIZES,
            title: "size",
        },
    }

    render() {
        return (
            <EuiIcon 
                type={this.props.type} 
                color={this.props.color} 
                size={this.props.size} 
                width={this.props.width}
                height={this.props.height}
            />
        );
    }
}
