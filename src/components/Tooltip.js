import React from "react";

import "./Tooltip.css";

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:  false
        }
    }

    show = () => {
        this.setVisibility(true);
    }

    hide = () => {
        this.setVisibility(false);
    }

    setVisibility = visible => {
        this.setState({ visible });
    }

    render() {
        const { visible } = this.state;
        const { children, content } = this.props;
        return(
            <span className="tooltip-wrapper">
                { visible && !!content && <span className="tooltip">{content}</span> }
                <span 
                    className="target-element"
                    onMouseEnter={this.show}
                    onMouseLeave={this.hide}
                >{children}</span>
            </span>
        );
    }
}