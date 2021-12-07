import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

class MessagePage extends React.Component {
    state = {
        token: "",
        subject:"",
        content: "",
        messages: []
    }

    componentDidMount() { this.getAllMessages() }

  /*  onTextChange = (e) => {
        let content = e.target.value;
        this.setState({
            content: content
        })
    }
*/
   /* addPost = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/add-post", {
            params: {
                token: cookies.get("logged_in"),
                content: this.state.content
            }
        })
            .then((response) => {
                if (response.data) {
                    const currentPosts = this.state.posts;
                    currentPosts.unshift({
                        content: this.state.content,
                        date: "Few moments ago..."
                    })
                    this.setState({
                        posts: currentPosts
                    })
                } else {
                    alert("couldn't add post")
                }
            })*/



    getAllMessages = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-all-messages", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                this.setState({
                    message: response.data
                })
            })
    }

    deleteMessageById = (id) =>{
        console.log("deleteMessageById")
        const cookies = new Cookies();
        axios.get("http://localhost:8989/delete_message", {
            params: {
                token: cookies.get("logged_in"),
                idOfMessage : id
            }

        }).then((response) => {
            if (response.data) {
                this.setState({
                    response: "The Message deleted successfully"
                })
            } else {
                this.setState({
                    response: "ERROR"
                })
            }
        })

    }

    render() {
        return (
            <div>
                {
                        this.state.message.map(msg => {
                            return (
                                <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>
                                    <i style={{fontSize: "12px"}}>
                                        {msg.subject}
                                    </i>
                                    <i style={{fontSize: "10px"}}>
                                        {msg.content}
                                    </i>
                                    <p style={{fontSize: "8px"}}>
                                        {msg.date}
                                    </p>
                                    <button style={{fontSize: "5px"}} onClick={() => this.deleteMessageById(msg.id)}>
                                        X
                                    </button>
                                </div>
                            )
                        })
                }

            </div>
        )
    }
}




export default MessagePage;