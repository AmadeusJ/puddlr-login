import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigator extends Component {
    constructor(props) {
        super(props);
        // TODO: define state
        // this.strate = {

        // }
    }

    render() {

        const iconStyle = {
            marginRight: '-4px'
        };

        return (
            <div className="nav-container">
                <div className="nav-wrapper">
                    <div className="nav-content">
                        <div className="menu-background"></div>
                        <div className="menu-special">
                            <a
                                href="https://gcloud.puddlr.com?utm_source=login&utm_medium=main&utm_campaign=in_app"
                                className="has-clickable-bezel"
                                target="_blank"
                            >
                                <img src="/static/images/logo-homepage.png" />
                            </a>
                            <span className="icon is-medium is-hidden-desktop" style={iconStyle}>
                                <i className="mdi mdi-menu"></i>
                            </span>
                        </div>
                        <div className="menu-container">
                            <div className="menu-wrapper">
                                {/*  */}
                                <NavLink exact to="/" className="menu-content has-clickable-bezel">로그인</NavLink>
                                <a className="menu-content has-clickable-bezel" href="">데모체험</a>
                                <a className="menu-content has-clickable-bezel" href="">업데이트 내역</a>
                                {/* <NavLink to="/group_list" className="menu-content has-clickable-bezel">데모체험</NavLink> */}
                                {/* <NavLink to="/group_list" className="menu-content has-clickable-bezel">업데이트 내역</NavLink> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigator;
