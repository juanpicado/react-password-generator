import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {PasswordGenerator} from '../PasswordGenerator.js';

class Main extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <PasswordGenerator 
                    title="Generate Password"/>
            </MuiThemeProvider>
        )   
    }
}

export default Main;