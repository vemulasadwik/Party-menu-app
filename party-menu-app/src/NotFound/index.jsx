import './index.css'
import {Link} from 'react-router'
const NotFound=()=>{
    return(
        <div className="main-container">
            <div className="NotFound-container">
                <h1 className="NotFound-status">404</h1>
                <h2 className="notfound-title">Page Not Found</h2>
                <p className="notfound-details">The page you are looking for does not exist or has been moved</p>
                <Link to="/">
                <button className="back-to-menu">Back to menu</button>
                </Link>
            </div>
        </div>
    )
}
export default NotFound