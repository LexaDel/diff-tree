import React from "react";
import classNames from "classnames";

import "./Button.css";

export default class Button extends React.Component {
    render() {
        const { className, children, onClick } = this.props;
        const classes = classNames(
            "btn",
            className
        )
        return(
            <button className={classes} onClick={onClick}>{children}</button>
        )
    }
}