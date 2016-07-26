import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {PasswordGenerator} from './PasswordGenerator';

class PasswordWrapper extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <PasswordGenerator/> 
            </MuiThemeProvider>
        )   
    }
}

describe("PasswordGenerator suite", function() {
  it("contains spec with an expectation", function() {
    expect(shallow(<PasswordWrapper />).is('.test')).toBe(false);
  });
});