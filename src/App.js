import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import NewMessagePage from "./NewMessagePage";
import MessagesPage from "./MessagesPage";


class App extends React.Component {

    state = {
        isLoggedIn: false,
        token : ""
    }


    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("logged_in")) {
            this.setState({
                isLoggedIn: true,
                token : cookies.get("logged_in")
            })
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {
                        this.state.isLoggedIn ?
                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                <NavigationBar/>
                                <Route path={"/"} component={ProfilePage} exact={true}/>
                                <Route path={"/profile"} component={ProfilePage} exact={true}/>
                                <Route path={"/MessagesPage"} component={MessagesPage} exact={true}/>
                                <Route path={"/NewMessagePage"} component={NewMessagePage} exact={true}/>

                            </div>
                            :
                            <div>
                                <Route path={"/"} component={LoginPage}/>
                            </div>
                    }
                </BrowserRouter>
            </div>
        )
    }

}

export default App;
