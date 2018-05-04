import React, { Component } from 'react';

export default class Dropdown extends Component {

    constructor(props) {
        super(props);
        
        this.handleMouseEnterAction = this.handleMouseEnterAction.bind(this);
        this.handleMouseLeaveAction = this.handleMouseLeaveAction.bind(this);
    }

    static defaultProps = {
        buttonText: "Hover me!"
    }

    handleMouseEnterAction = () => {
        if(this.props.onMouseEnter) {
            this.props.onMouseEnter();
        }
    }

    handleMouseLeaveAction = () => {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave();
        }    
    }

    render() {
        return (
            <div
                className="Button" 
                onMouseEnter={this.handleMouseEnterAction} 
                onMouseLeave={this.handleMouseLeaveAction}>
                <div className="button__link" >{this.props.buttonText}</div>
            </div>
        )
    }
}