import React from "react";
import Portal from "./Portal";
import Button from "./Button";

import "./Modal.css";

export default class Modal extends React.Component {
    render () {
        const {isOpen, title, children, onSubmit, onCancel} = this.props;
    return (
        <>
            { isOpen && 
                <Portal>
                    <div className="modal-overlay">
                        <div className="modal-window">
                            <div className="modal-header">
                                <div className="modal-title">{title}</div>
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                <Button onClick={onSubmit}>Принять</Button>
                                <Button onClick={onCancel}>Отменить</Button>
                            </div>
                        </div>
                    </div>
                </Portal>
            }
        </>
      );
    }
}