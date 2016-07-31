import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {PasswordGeneratorApp} from './PasswordGenerator';

class PasswordWrapper extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <PasswordGeneratorApp/> 
            </MuiThemeProvider>
        )   
    }
}

class Foo extends React.Component {
  render() {
    return (<div className="in-foo" />);
  }
}

class Bar extends React.Component {
  render() {
    return (
      <div className="in-bar">
        <Foo />
      </div>
    );
  }
}

describe("PasswordGenerator suite", function() {
  it("contains spec with an expectation", function() {
      var wrapper = shallow(<PasswordWrapper />);
      var pw = render(<PasswordWrapper />);
      var pw2 = mount(<PasswordWrapper />);
      console.log("1", wrapper.debug());
      console.log("2", wrapper.find('.text'));
      console.log("3", pw2.render().find('.test'));
      expect(shallow(<PasswordWrapper />).is('.test')).toBe(false);
      expect("6", wrapper.find(PasswordWrapper).render().find('.in-foo')).toEqual(1);

    const wrapper2 = mount(<Bar />);
    console.log("4", wrapper2.find(Foo).render().find('.in-foo'));
    expect(wrapper2.find(Foo).render().find('.in-foo')).toEqual(1);
  });
});