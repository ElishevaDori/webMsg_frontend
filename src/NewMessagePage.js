import './App.css';
import * as React from "react";


class NewMessagePage extends React.Component{

    state={
        token :" ",
        senderId :" ",
        subject :" ",
        content :" ",
        receiverId:" "

    }

    updateSubject = (e)=>{
        let sub = e.target.value;
        this.setState({
            subject: sub
        })
    }
    updateContent = (e)=>{
        let con = e.target.value;
        this.setState({
            content: con
        })

    }
    updateReceiverId = (e)=> {
        let rec = e.target.value;
        this.setState({
            receiverId: rec
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
                <b>Receiver:</b>
                <br/>
                <input
                    placeholder={"enter phone number:"}
                    onChange={this.updateReceiverId}
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
                <textarea cols="20" rows="10" id="textbox" type="text" name="textbox" placeholder={"enter your message here:)"}></textarea>
                <br/>
                <button>SEND</button>

            </div>

        )
    }
}
export default NewMessagePage;