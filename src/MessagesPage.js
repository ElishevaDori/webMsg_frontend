import './App.css';
import axios from "axios";
import Cookies from "universal-cookie/es6";
import React from "react";


class MessagesPage extends React.Component {
    state = {
        messages: [],
        response: " ",
        message: "Unread message"
    }

    componentDidMount() {

            const cookies = new Cookies();
            axios.get("http://localhost:8989/get-all-messages", {
                params: { token: cookies.get("logged_in") }
            })
                .then(response => {
                    if (response.data && response.data.length > 0) {

                    this.setState({
                        messages: response.data
                    })
                }
                    else{
                        this.setState({
                            response: "you dont have any messages"
                        })
                    }
                })

    }


    deleteMessageById = (id) =>{
        console.log("deleteMessageById")
        axios.get("http://localhost:8989/delete_message", {
            params: {
                messageId:id
            }
        })
            .then((response) =>{
        if (response) {

            alert("The remove post was Succeeded")
            window.location.reload();

        } else {
            alert( "ERROR")
        }
    })

}




    MessageWasRead = (id) =>{
        axios.get("http://localhost:8989/Message_was_read", {
            params: {
                messageId : id
            }

        }).then((response) => {
            if (response.data) {
                window.location.reload();
            }
            else {
                alert( "ERROR")
            }

                })
    }



    render() {
        return (
            <div>

                {this.state.response}

                <div>
                    {this.state.messages.length >0 &&
                    this.state.messages.map(msg => {
                        return (
                            <div style={{border: "1px solid black", padding: "10px", width: "300px", margin: "10px"}}>

                                <i style={{textDecoration: "underline", fontSize: "10px"}}>

                                    sender: {msg.senderId}
                                </i>

                                <br/>
                                <i style={{fontSize: "12px"}}>
                                    {msg.title}
                                </i>

                                <br/>
                                <p style={{fontSize: "10px"}}>
                                    {msg.message}
                                </p>
                                <i style={{fontSize: "8px"}}>
                                    {msg.sendDate}
                                </i>
                                <br/>
                                <button style={{fontSize: "5px"}} onClick={() => this.deleteMessageById(msg.messageId)}>
                                    delete massage
                                </button>
                                <button style={{fontSize: "5px"}} onClick={() => this.MessageWasRead(msg.messageId)}
                                        disabled={msg.read === 1}>
                                    New Message
                                </button>

                            </div>

                        )
                    })
                    }
                </div>
            </div>
        )
    }
}




export default MessagesPage;