/**
 * Created by jpicado on 15/07/16.
 */
import React, {Component} from 'react';
import generatePassword from 'password-generator';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import Slider from 'material-ui/Slider';
import Copy from 'material-ui/svg-icons/content/content-copy';
import Clear from 'material-ui/svg-icons/content/clear';
import Save from 'material-ui/svg-icons/content/save';
import Alert from 'material-ui/svg-icons/notification/priority-high';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import styles from './password-style.css';

var maxLength = 18;
var minLength = 12;
var uppercaseMinCount = 3;
var lowercaseMinCount = 3;
var numberMinCount = 2;
var specialMinCount = 2;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var SPECIAL_CHAR_RE = /([\?\-])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

/**
 * Password Input
 */
class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            completed: this.scorePassword(props.password),
            dialog: false
        };
    }
    handleRequestClose() {
        this.setState({
            open: false
        });
    };
    shouldComponentUpdate() {
        let score = this.scorePassword(this.props.password);
        this.setState({
            completed: score
        });
        return true;
    }
    scorePassword(pass) {
        var score = 0;
        if (!pass)
            return score;

        // award every unique letter until 5 repetitions
        var letters = new Object();
        for (var i=0; i<pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }

        // bonus points for mixing it up
        var variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass),
        }

        var variationCount = 0;
        for (var check in variations) {
            variationCount += (variations[check] == true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;
        console.log(score);
        return parseInt(score);
    }
    save() {
        this.setState({
            dialog: true,
            label: ""
        });
    }
    handleClose() {
        let label = this.state.label;
        localStorage.setItem(label, this.props.password);
        this.closeDialog();
        this.props.clean();
    }
    closeDialog() {
        this.setState({
            dialog: false,
            label: ""
        });
    }
    handleCancel() {
        this.closeDialog();
    }
    handleChange(event) {
        this.setState({
            label: event.target.value
        });
    };
    render() {
        const password = {
            color:'black',
            fontSize: 18,
            textAlign: 'center'
        };
        const actions = [
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label="Cancel"
                primary={false}
                keyboardFocused={true}
                onTouchTap={this.handleCancel.bind(this)}
            />
        ];
        var styles_dialog = styles.dialog_text;
        if (this.props.password.length >= 18) {
            styles_dialog.fontSize = 12;
        }
        return  (
            <div>
                <div>
                    <TextField
                        disabled={true}
                        id="text-field-controlled"
                        inputStyle={password}
                        fullWidth={false}
                        underlineShow={false}
                        value={this.props.password}
                    />
                    <Snackbar
                        open={this.state.open}
                        message="Password copied to the clipboard"
                        autoHideDuration={4000}
                    />
                    <LinearProgress mode="determinate" value={this.state.completed} />
                </div>
            </div>
        );
    }
}

/**
 * Password Generator.
 */
class Password {
    constructor(randomLength) {
        this.randomLength = randomLength || 8;
    }
    customPassword() {
        let password = generatePassword(this.randomLength, false, /[\w\d\?\-]/);
        return password;
    }
}

/**
 * App.
 */
class PasswordGeneratorApp extends Component {
    constructor() {
        super();
        this.state = {
            password : "",
            complexity: 0.5
        }
    }
    launchPassword(event) {
        console.log("launchPassword");
        this.generateNewPassword(8);
    }
    generateNewPassword(maxLength) {
        let password = new Password(maxLength);
        let textPass = password.customPassword();
        this.changePassword(textPass);
    }
    changePassword(password) {
        this.setState({
            password: password
        });
    }
    clean() {
        this.changePassword("")
    }
    changeComplexity(event, complexity) {
       let c = complexity * 25;
       this.generateNewPassword(c);
    }
    includeNumbers(event, value) {
        this.setState({
            numbers: value
        });    
    }
    upperCase(event, value) {
         this.setState({
            upperCase: value
        }); 
    }
    ambiguous(event, value) {
         this.setState({
            ambiguous: value
        }); 
    }
    asciiCharacters(event, value) {
         this.setState({
            ascii: value
        }); 
    }

    render() {
        console.log(JSON.stringify(this.state));
        var input = <span></span>;
        if (this.state.password !== "") {
           this.props.handler(this.state.password); 
           input = (
               <div className="test">
                   <PasswordInput 
                       clean={this.clean.bind(this)}
                       {...this.state}
                       password={this.state.password}>
                   </PasswordInput>                   
                   <div className={styles.block}>
                       <Toggle
                           label="Include Numbers"
                           onToggle={this.includeNumbers.bind(this)}
                           className={styles.toggle}
                       />
                       <Toggle
                           label="Include Uppercase"
                           defaultToggled={true}
                           onToggle={this.upperCase.bind(this)}
                           className={styles.toggle}
                       />
                       <Toggle
                           label="Ambiguous Characters"
                           onToggle={this.ambiguous.bind(this)}
                           className={styles.toggle}
                       />
                       <Toggle
                           label="ASCII Characters"
                           defaultToggled={true}
                           onToggle={this.asciiCharacters.bind(this)}
                           className={styles.toggle}
                       />
                   </div>
                   <div className={styles.sliders}>
                        <Slider name="strong"
                            description="How strong you need the password?"
                            onChange={this.changeComplexity.bind(this)}
                            value={this.state.complexity}
                            min={0.1}
                            defaultValue={0.5} />
                   </div>
               </div>
           );
        } else {
            input =(<div>
                <RaisedButton
                    label={this.props.title}
                    secondary={true}
                    onTouchTap={this.launchPassword.bind(this)}
                />
                </div>);
        }
        return (
            <div>
                <div className={styles.container}>
                    {input}
                </div>
            </div>
        );
    }
}

export default PasswordGeneratorApp;