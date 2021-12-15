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
        this.setState({validPhoneNumber:"",validStrongPassword:"",response:""})

        axios.get("http://localhost:8989/doesUserExist", {
            params: {
                username: this.state.username
            }
        })
            .then((UserExist) => {
                if(UserExist.data){

                    axios.get("http://localhost:8989/isBlocked", {
                        params:{
                            username: this.state.username
                        }
                    })
                        .then((tries) => {
                            if(tries.data !== 0){// if user is NOT blocked, he should be able to log in

                                axios.get("http://localhost:8989/sign-in", {
                                    params: {
                                        username: this.state.username,
                                        password: this.state.password
                                    }
                                })
                                    .then((response) => {
                                        if (response.data) {
                                            const cookies = new Cookies();
                                            cookies.set("logged_in", response.data);

                                            axios.get("http://localhost:8989/updateLoginTries", {
                                                params:{
                                                    username : this.state.username
                                                }
                                            }).then()
                                            window.location.reload();

                                        } else {
                                            this.setState({
                                                showError: true,
                                                response: "Wrong password, tries left: " + (tries.data - 1)
                                            })
                                            axios.get("http://localhost:8989/countDownTries", {
                                                params: {
                                                    username: this.state.username
                                                }
                                            }).then()
                                        }
                                    })
                            }
                            else{ // user has 0 tries
                                this.setState({
                                    response: "this user is blocked and wont be able to log in, create a new user"
                                })
                            }
                        })
                }
                else{
                    this.setState({
                        response: "user doesnt exist"
                    })
                }
            })

    }
    signUp = () =>{
        axios.get("http://localhost:8989/doesUserExist", {
            params: {
                username: this.state.username
            }
        })
            .then((response) => {
                if(!response.data){
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
                                    this.setState({response: "failed to create account", showError: true})
                                }
                            })
                    }
                }
                else{
                    this.setState({
                        response : "this phone number is in use"
                    })
                }
            })

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
