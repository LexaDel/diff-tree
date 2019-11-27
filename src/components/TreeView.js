import React from "react";
import Tooltip from "./Tooltip";
import Button from "./Button";
import Modal from "./Modal";
import classNames from "classnames";

import "./TreeView.css";

export class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            isOpenModal: false,
            inputValue: props.nodes.comment
        }
    }

    openModal = () => {
        this.setState({
            isOpenModal: true
        });
    }

    handleSubmit = () => {
        const { onChangeComment, nodes } = this.props;
        const value = this.textInput.current.value;
        onChangeComment(nodes, value);
        this.setState({ isOpenModal: false });
    }

    handleCancel = () => {
        this.setState({ isOpenModal: false });
    }

    handleChange = e => this.setState({ inputValue: e.target.value });

    render() {
        const {name, children, state, comment} = this.props.nodes;
        const classes = classNames(
            `tree-${children.length > 0 ? "node" : "item"}`,
            state
        )
        return (
            <ul>
                <li className={classes}>
                    <Tooltip content={comment}>
                        <div>
                            <span>{name}</span>
                            <Button title="редактировать комментарий" onClick={this.openModal}>
                                <span className="edit"></span>
                            </Button>
                            <Modal
                                title={`Редактирование комментария для узла: ${name}`}
                                isOpen={this.state.isOpenModal}                  
                                onCancel={this.handleCancel}
                                onSubmit={this.handleSubmit}
                            >
                                <label for="modal-input-comment">Комментарий</label>
                                <input type="text" id="modal-input-comment" value={this.state.inputValue} onChange={this.handleChange} ref={this.textInput}/>
                            </Modal>
                        </div>
                    </Tooltip>
                    <span>
                        {children.map(child => <TreeView nodes={child} onChangeComment={this.props.onChangeComment}/>)}
                    </span>
                </li>
            </ul>
        );
    }
}