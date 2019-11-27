import React from "react";
import { TreeView } from "./components/TreeView";
import { compareTree, createTreeStore, getContentFromFile, getDataFromContent } from "./utils/Utils"

import "./App.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.mapNodes = {};
        this.tree = {}
    }

    handlerChange = () => {
        const control = document.getElementById("file-upload");
        const [ file ]  = control.files;
        getContentFromFile(file).then(content => {
            const data = getDataFromContent(content);
            if (data) {
                this.tree = createTreeStore(data);
                this.setState(state => {
                    let diff;
                    if (state.tree) {
                        if (this.tree.id === state.tree.id && this.tree.name === state.tree.name) {
                            diff = {
                                name: this.tree.name,
                                state: "",
                                children: []
                            }
                            compareTree(this.tree.children, state.tree.children, diff.children);
                        }
                    }
                    return {
                        tree: this.tree,
                        diff: diff
                    }
                });
            }
        });
    }


    onChangeComment = (node, text) => {
        node.comment = text;
        this.setState(state => {
            return {
                tree: state.tree,
                diff: state.diff
            }
        });
    }

    render() {
        const hasTree = !!this.state.tree;
        const tree = this.state.diff || this.state.tree
        return (
            <div className = "App">
                <div className = "file-upload-form">
                    <input type = "file" id = "file-upload" onChange = {this.handlerChange}/>
                    <div id="file-status-msg"/>
                </div>
                {hasTree && <div className="tree-view">
                    <TreeView nodes = {tree} onChangeComment={this.onChangeComment}/>
                </div>}
            </div>
        );
    }
}