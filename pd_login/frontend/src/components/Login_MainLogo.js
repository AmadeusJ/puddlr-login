import React, { Component } from 'react';

class MainLogo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container auth" style={{marginTop: "227px"}}>
                <div id="logo-block" style={{position: "relative"}}>
                    <div className="logo">
                        <img src="/static/images/logo-puddlr.png" />
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}

export default MainLogo;