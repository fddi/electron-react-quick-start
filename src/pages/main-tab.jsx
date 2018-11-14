import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
const electron = window.require('electron');
const win = electron.remote.getCurrentWindow();

export default class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        win.maximize()
    }

    render() {
        return (<div>test</div>)
    }
}