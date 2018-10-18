import * as React from "react";
import { PropertyControls, ControlType } from "framer";

const style: React.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "flex",
};

// Define type of property
interface Props {
    theme: string;
}

export class theme extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        theme: "light"
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        theme: {
            type: ControlType.Enum,
            options: ["light", "dark"],
            title: "Theme"
        },
    }

    render() {
    require(`@elastic/eui/dist/eui_theme_${this.props.theme}.css`);
    return <div style={style}></div>;
    }
}
