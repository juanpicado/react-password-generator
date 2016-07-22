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
import injectTapEventPlugin from 'react-tap-event-plugin';
import Toggle from 'material-ui/Toggle';

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

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 40,
    },
    block: {
        maxWidth: 250,
        textAlign: 'left',
        margin: '0 auto'
    },
    input : {
        textAlign: 'center',
        padding: 20,
        fontWeight: 'bolder',
        fontSize: '2em'
    },
    sliders : {
        padding: '0px 45px',
        paddingTop: 10,
    },
    label : {
        padding: '0px 25px',
        fontSize: '2em'
    },
    password: {
        color:'black',
        fontSize: 18,
        textAlign: 'center'
    },
    dialog_text: {
        color:'black',
        fontSize: 16,
        width: '100%',
        textAlign: 'center'
    },
    save_text: {
        color:'black',
        fontSize: 16,
        width: '100%',
        textAlign: 'center'
    },
    toggle: {
        marginBottom: 16,
    }
};

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
    copy() {
        cordova.plugins.clipboard.copy(this.props.password);
        this.setState({
            open: true
        });
    }
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
                        inputStyle={styles.password}
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
                <div>
                    <IconButton touch={false}
                                tooltipPosition="top-left"
                                onTouchTap={this.copy.bind(this)}>
                        <Copy></Copy>
                    </IconButton>
                    <IconButton touch={false}
                                tooltipPosition="top-left"
                                onTouchTap={this.props.clean}
                                tooltip="Clean">
                        <Clear></Clear>
                    </IconButton>
                    <IconButton touch={false}
                                tooltipPosition="top-left"
                                onTouchTap={this.save.bind(this)}
                                tooltip="Save">
                        <Save></Save>
                    </IconButton>
                    <Dialog
                        title="Save Password"
                        actions={actions}
                        modal={false}
                        open={this.state.dialog}
                        onRequestClose={this.handleClose.bind(this)}>
                        <TextField
                            disabled={true}
                            id="text-field-controlled"
                            inputStyle={styles_dialog}
                            style={styles.dialog_text}
                            underlineStyle={styles.dialog_text}
                            textareaStyle={styles.dialog_text}
                            underlineDisabledStyle={styles.dialog_text}
                            underlineShow={false}
                            fullWidth={false}
                            value={this.props.password}
                        />
                        <TextField
                            disabled={false}
                            id="text-field-label"
                            onChange={this.handleChange.bind(this)}
                            style={styles.save_text}
                            value={this.state.label}
                        />
                        <div>
                            <Alert></Alert> This will save password locally and non encrypted.
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }
}


class Password {
    constructor(randomLength) {
        this.randomLength = randomLength || 8;
    }
    customPassword() {
        let password = generatePassword(this.randomLength, false, /[\w\d\?\-]/);
        return password;
    }
}

class PasswordGeneratorApp extends Component {
    constructor() {
        super();
        this.state = {
            password : "",
            complexity: 0.5
        }
    }
    launchPassword(event) {
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
    render() {
        var input = <span></span>;
        if (this.state.password != "") {
           input = (
               <div>
                   <PasswordInput
                       clean={this.clean.bind(this)}
                       password={this.state.password}>
                   </PasswordInput>
                   <div style={styles.sliders}>
                        <Slider name="strong"
                            description="How strong you need the password?"
                            onChange={this.changeComplexity.bind(this)}
                            value={this.state.complexity}
                            min={0.1}
                            defaultValue={0.5} />
                   </div>
                   <div style={styles.block}>
                       <Toggle
                           label="Include Numbers"
                           style={styles.toggle}
                       />
                       <Toggle
                           label="Include Uppercase"
                           defaultToggled={true}
                           style={styles.toggle}
                       />
                       <Toggle
                           label="Ambiguous Characters"
                           style={styles.toggle}
                       />
                       <Toggle
                           label="ASCII Characters"
                           defaultToggled={true}
                           style={styles.toggle}
                       />
                   </div>
               </div>
           );
        } else {
            input =(<div>
                <RaisedButton
                    label="Get your new password !!"
                    secondary={true}
                    onTouchTap={this.launchPassword.bind(this)}
                />
                </div>)
        }
        return (
            <div>
                <div style={styles.container}>
                    {input}
                </div>
            </div>
        );
    }
}

export default PasswordGeneratorApp;