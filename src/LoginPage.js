import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showError: false,
        response: "",
        validPhoneNumber: "",
        validStrongPassword: ""
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }


    login = () => {
        axios.get("http://localhost:8989/sign-in", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
                .then((response) => {
                    if (response.data && response.data.length > 0) {
                        const cookies = new Cookies();
                        cookies.set("logged_in", response.data);
                        window.location.reload();
                    } else {
                        this.setState({
                            showError: true,
                            response: "failed to log in"
                        })
                    }
                })
    }

    signUp = () =>{
        this.setState({validPhoneNumber:"",validStrongPassword:"",response:""})
        let reg = new RegExp(/[0][5][023458]\d{7}/);
        const validPhoneNumber = reg.test(this.state.username) && this.state.username.length === 10;
        if(!validPhoneNumber){this.setState({validPhoneNumber: "* your phone number isn't valid"})}
        const validStrongPassword = (/[a-zA-Z]/g.test(this.state.password) && /\d/g.test(this.state.password) && 6<= this.state.password.length);
        if(!validStrongPassword){this.setState({validStrongPassword: "* not a strong password, must contain: 6 letters long or more, needs at least one Uppercase and lower case character, must not contain symbols"})}
        if(validPhoneNumber && validStrongPassword) {
            axios.get("http://localhost:8989/create-account", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
                .then((response) => {
                    console.log(response.data)
                    if (response.data) {
                        this.setState({
                            response: "Your account has been created!",
                            validPhoneNumber:"",
                            validStrongPassword:"",
                            showError: true,
                        })
                    } else {
                        this.setState({response: "This username is already taken", showError: true})
                    }
                })
        }
        else{
            this.setState({
                showError: true
            })
        }
    }
    render() {

        const inputStyle = {
            margin: "10px",
            width: "200px"
        }

        const buttonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px"
        }

        const signUpButtonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            marginTop: "20px"
        }

        const hasRequiredDetails = !(this.state.username === "" || this.state.password === "");

        return (
            <div style={{margin: "auto", width: "50%", padding: "10px"}}>
                <fieldset style={{width: "300px"}}>
                    <legend>
                        <div style={{fontSize: "20px"}}>
                            Login to your account
                        </div>
                    </legend>
                    <input style={inputStyle}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter PhoneNumber"}
                    />
                    <input style={inputStyle}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                    <div>
                        <button style={buttonStyle} onClick={this.login} disabled={!hasRequiredDetails} >Login</button>
                    </div>
                    <div>
                        <button style={signUpButtonStyle} onClick={this.signUp} disabled={!hasRequiredDetails} >Sign Up</button>
                    </div>

                </fieldset>
                <div style={{color: "red"}}>{this.state.response}</div>
                <div style={{color: "red"}}>{this.state.validStrongPassword}</div>
                <div style={{color: "red"}}>{this.state.validPhoneNumber}</div>
            </div>
        )
    }
}

export default LoginPage;
