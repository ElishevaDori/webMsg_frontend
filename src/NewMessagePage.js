import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie";


class NewMessagePage extends React.Component {
    state = {
        senderId: " ",
        subject: "",
        content: "",
        receiverId: " ",
        exists: false,
        response : ""
    }
    updateSubject = (e) => {
        let sub = e.target.value;
        this.setState({
            subject: sub
        })
    }
    updateContent = (e) => {
        let con = e.target.value;
        this.setState({
            content: con
        })
    }
    doesUserExist =(e)=> {
        const reciever = e.target.value;
        this.setState({
            receiverId: reciever
        }, () => {
            axios.get("http://localhost:8989/doesUsernameExists", {
                params: {
                    username: this.state.receiverId
                }

            }).then((response) => {
                this.setState({
                    exists: response.data
                })
            })

        })
    }
    contentAndSubjectAreEmpty =()=>{
        let empty = false;
        if ((this.state.subject.length > 0) && (this.state.content.length > 0)){
            empty = true;
        }
        return empty;
    }

    addMessage = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/add-message", {
            params: {
                token: cookies.get("logged_in"),
                receiverPhone:this.state.receiverId,
                title:this.state.subject,
                content: this.state.content,
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({
                        response : "message sent"
                    })
                    alert("message sent")
                }else{
                    this.setState({response : "couldn't send message"})
                }
            })
    }

    render() {
        const inputStyle = {
            width: "300px",
            height: "120px",
            verticalAlign: "-55px",
        }
        return (
            <div>
                <b>For:</b>
                <br/>
                <input
                    placeholder={"enter phone number:"}
                    onChange={this.doesUserExist}
                />
                <br/>
                <b>subject:</b>
                <br/>
                <input
                    placeholder={"enter your subject here"}
                    onChange={this.updateSubject}
                />
                <br/>
                <b>content:</b>
                <br/>
                <textarea onChange={this.updateContent} cols="20" rows="10" id="textbox" type="text" name="textbox"
                          placeholder={"enter your message here"}/>
                <br/>
                <button onClick={this.addMessage} disabled={!this.state.exists || !this.contentAndSubjectAreEmpty()}>SEND</button>
                <br/>
                <div>{this.state.response }</div>
            </div>
        )
    }
}
export default NewMessagePage;
