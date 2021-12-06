import './App.css';
import * as React from "react";

class FollowedProfilePage extends React.Component {
    state = {
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;

    }


    render = () => {
        return (
            <div>
                This is some other user profile
            </div>
        )
    }
}

export default FollowedProfilePage;