import React, { Component } from 'react';
import PropTypes  from 'prop-types';

class Login_Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let button;
        const buttonActive = this.props.buttonActive;
        const buttonClass = "btn btn-login btrn-block btn-blue";

        if (buttonActive === 'disabled') {
            button = <button disabled={buttonActive} className={buttonClass}><span>{this.props.action}</span></button>
        } else {
            button = <button className={buttonClass}>{this.props.action}</button>
        }

        return (
            <div className="form-group">
                {button}
            </div>
        );
    }
}
Login_Button.defaultProps = {
    action: 'LOGIN',
    buttonActive: 'disabled'
};
Login_Button.propTypes = {
    action: PropTypes.string.isRequired,
};

export default Login_Button;