import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {PasswordGenerator} from '../index';
import style from './password.css';

class Main extends Component {
    render() {
        return (
            <div className={style.container}>
            <h3>Password Generator Text</h3>
            <MuiThemeProvider>
                <PasswordGenerator 
                    title="Generate Password"/>
            </MuiThemeProvider>
            </div>
        )   
    }
}

export default Main;