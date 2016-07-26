import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {PasswordGenerator} from 'react-password-generator';

class Main extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <PasswordGenerator/>
            </MuiThemeProvider>
        )   
    }
}

export default Main;