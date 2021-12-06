import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

class PostsPage extends React.Component {
    state = {
        token: "",
        content: "",
        posts: []
    }

    componentDidMount() {
        this.getAllPosts()
    }

    onTextChange = (e) => {
        let content = e.target.value;
        this.setState({
            content: content
        })
    }

    addPost = () => {
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
            })
    }


    getAllPosts = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-posts", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                this.setState({
                    posts: response.data
                })
            })
    }

    removePost = (postId) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/remove-post", {
            params: {
                token: cookies.get("logged_in"),
                postId
            }
        })
            .then((response) => {
                const currentPosts = this.state.posts;
                this.setState({
                    posts: currentPosts.filter((item) => {
                        return item.id != postId
                    })
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.posts.map(post => {
                        return (
                            <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>
                                <i style={{fontSize: "12px"}}>
                                    {post.content}
                                </i>
                                <p style={{fontSize: "8px"}}>
                                    {post.date}
                                </p>
                                <button style={{fontSize: "5px"}} onClick={() => this.removePost(post.id)}>
                                    X
                                </button>
                            </div>
                        )
                    })
                }

                <div style={{marginTop: "30px"}}>
                    <textarea
                        onChange={this.onTextChange}
                        value={this.state.content}
                        placeholder={"Enter post"}
                    /><br/>
                    <button onClick={this.addPost}>Submit</button>
                </div>
            </div>
        )
    }
}

export default PostsPage;