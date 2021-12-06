import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import UserComponent from "./UserComponent";

class FollowedPage extends React.Component {
    state = {
        followed: []

    }

    componentDidMount() {
        this.getFollowed();
    }

    getFollowed = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-followed", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                this.setState({
                    followed: response.data
                })
            })
    }

    render = () => {
        return (
            <div>
                {
                    this.state.followed.map((followed) => {
                        return (
                            <div>
                                <UserComponent user={followed}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default FollowedPage;