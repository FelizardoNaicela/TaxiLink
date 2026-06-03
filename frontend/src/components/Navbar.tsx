import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div>
            <nav className="navbar">
<Link to="/">Groupos/ </Link>
<Link to="/Chat"> Chat</Link>
<Link to="/posts">Posts API</Link>
            </nav>
        </div>
    )
}

export default Navbar