import {Link} from "react-router-dom";

function UserComponent (props) {
    return (
        <div style={{margin: "15px"}}>
           <Link to={"/user/" + props.user.id}>
               {props.user.username}
           </Link>
        </div>
    )
}

export default UserComponent;