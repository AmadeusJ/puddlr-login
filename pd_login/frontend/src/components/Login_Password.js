import React, { Component } from 'react';
import Button from './Login_Button';
import { getSaltKey, submitPassword } from '../util/api.config';
import async from '@babel/polyfill';

var CryptoJS = require('crypto-js');

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonActive: 'disabled',
            passwordValue: '',
            passwdToken: null,
            salt: null,
        }
    }

    handlePasswordInput(event) {
        if (event.target.value.length > 1) {
            this.setState({
                buttonActive: 'abled',
                passwordValue: event.target.value
            })
        } else {
            this.setState({
                buttonActive: 'disabled',
                passwordValue: event.target.value
            })
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.getSaltKeyFromServer();
        const passwdToken = this.encryptPasswd();
        const axiosData = submitPassword(this.props.row.server, passwdToken);
        axiosData.then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        });
    }

    async getSaltKeyFromServer() {
        const axiosEvent = getSaltKey();
        await axiosEvent.then(res => {
            console.log(res)
            this.setState({
                salt: res.salt,
                passwdToken: res.token
            });
        }).catch(error=> {
            console.log(error)
        });
    }

    encryptPasswd() {
        const cipherText = CryptoJS.enc.Base64.parse(this.state.passwdToken)
        const init_iv = cipherText.clone();
        const salt = CryptoJS.enc.Utf8.parse(this.state.salt)
        init_iv.sigBytes = 16;
        init_iv.clamp();
        cipherText.words.splice(0, 4);
        cipherText.sigBytes -= 16;
        let plainText = CryptoJS.AES.decrypt({ ciphertext: cipherText }, salt, { iv: init_iv, mode: CryptoJS.mode.CBC } )
        let key = CryptoJS.PBKDF2(plainText, salt, 
                    {
                        hasher: CryptoJS.algo.SHA256,
                        keySize: 8,
                        iterations: 999
                    },
        );
        let iv = CryptoJS.lib.WordArray.random(16);
        let password = CryptoJS.AES.encrypt(this.state.passwordValue, key, { iv: iv }).ciphertext;
        password = iv.concat(password).toString(CryptoJS.enc.Base64)
        let out = {
            'key': key.toString(CryptoJS.enc.Base64),
            'token': password
        }

        return out
    }

    render() {
        return (
            <div className="webmail-login">
                <form name="authentiocate" onSubmit={(event) => {this.handleSubmit(event)}} id="login-form">
                    <div className="form-group">
                        <div>
                            <input 
                                className="form-control" 
                                name="password" 
                                value={this.state.passwordValue} 
                                onChange={(event) => {this.handlePasswordInput(event)}} 
                            />
                        </div>
                    </div>
                    <Button action={'Submit'} buttonActive={this.state.buttonActive} />
                </form>
            </div>

        );
    }
}

export default Password;