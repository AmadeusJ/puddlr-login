import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { Main, Group_list } from './pages';
import { Navigator, MainLogo, EmailForm } from './components';


class App extends Component {
    render() {

        // const emailFormEndpoint = URL().test;       // Endpoint for django API


        return (
            <div>
                <Navigator />
                <MainLogo />
                <EmailForm />

                <Route exact path="/" component={Main} ></Route>
                <Switch>
                    
                    <Route path="/group_list" component={Group_list}></Route>
                </Switch>
            </div>
        )
    }
}

export default App;
