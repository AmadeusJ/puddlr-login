import React, { Component } from 'react';
import Button from './Login_Button';
import GroupList from './Login_GroupList';
import PropTypes from 'prop-types';
import {submitEmailData} from '../util/api.config';

class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonActive: 'disabled',
            emailValue: '',
            isSubmitSuccess: false,
            returnedData: '',
        }
    }

    static propTypes = {
        // endpoint: PropTypes.string.isRequired
    };


    handleEmailInput(event) {
        if (event.target.value.length > 0 ) {
            this.setState({
                buttonActive: 'abled',
                emailValue: event.target.value
            })
        } else {
            this.setState({
                buttonActive: 'disabled',
                emailValue: event.target.value
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const axiosData = submitEmailData(this.state.emailValue)
        axiosData.then(res => {
            // console.log(res)
            if (res.status === 200) {
                this.setState({
                    isSubmitSuccess: true,
                    returnedData: res.group,
                })
            }
        }).catch(error => {
            console.log(error);
        });
    };

    render() {
        if (this.state.isSubmitSuccess === true) {
            return (<GroupList groupList={this.state.returnedData} />);
        }

        return (
            <div className="webmail-login">
                <form name="authenticate" onSubmit={(event) => {this.handleSubmit(event)}} id="login-form">
                    <div className="form-group">
                        <div>
                            <i className="head mdi mdi-email d-none d-lg-block"></i>
                            <input 
                                className="form-control" 
                                name="useremail"
                                value={this.state.emailValue}
                                onChange={(event) => {this.handleEmailInput(event)}} 
                            />
                        </div>
                    </div>
                    <Button action={'LOGIN'} buttonActive={this.state.buttonActive} />
                </form>
            </div>
        );
    }
}

export default EmailForm;
