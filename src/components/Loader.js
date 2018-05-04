import React, { Component } from 'react';

export default class Loader extends Component {

    render() {
        return (
            <div className="Loader">
                <div className="loader__animation" >
                    <div className="dots__wrapper">
                        <div className="dot-1"></div>
                        <div className="dot-2"></div>
                    </div>
                </div>
            </div>
        )
    }
}