import React, { Component } from 'react';

export default class Button extends Component {

    constructor(props) {
        super(props);
        
        this.handleClickAction = this.handleClickAction.bind(this);
    }

    static defaultProps = {
            buttonText: "Click me!"
        }

    handleClickAction = () => {
        this.props.onClick();
    }

    render() {
        return (
            <div    className="Button" 
                    onClick={this.handleClickAction} >
                <div className="button__link" >{this.props.buttonText}</div>
            </div>
        )
    }
}