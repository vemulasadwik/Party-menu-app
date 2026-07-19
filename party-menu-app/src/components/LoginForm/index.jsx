import { IoRestaurantSharp } from "react-icons/io5";
import { Link,useNavigate ,Navigate} from "react-router-dom";
import { useState } from "react";
import Cookies from 'js-cookie'
import './index.css'
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSubmitError,setShowSubmitError]=useState(false);
    const [errorMsg,setErrorMsg]=useState("")
    const navigate = useNavigate();
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onSubmitSuccess = (jwtToken, userName) => {
        Cookies.set("jwt_token",jwtToken,{expires:30})
        Cookies.set("username", userName,{expires:30})
        navigate('/',{replace:true});
    };
    const onSubmitFailure=(errorMsg)=>{
        setShowSubmitError(true)
        setErrorMsg(errorMsg)
        
    }
    const onSubmitForm =async (event) => {
        event.preventDefault();
        const UserDetails = {
            email: email,
            password: password
        };
        const url = "https://serverless-api-teal.vercel.app/api/auth/signin"; 
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(UserDetails)
        };  
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)
        if(response.ok===true){
            onSubmitSuccess(data.token,  data.data.user.name);
        }
        else{
            onSubmitFailure(data.message);
        }
        setEmail('');
        setPassword('');
    }
    const jwtToken=Cookies.get("jwt_token");
    if(jwtToken!==undefined){
        return <Navigate to="/" />
    }

    return(
        <div className="login-form-container">
            <div className="login-form">
                <div className="login-form-header">
                    <IoRestaurantSharp  className="img-logo"/>
                    <h1 className="login-form-title">Party Menu</h1>
                    <p className="login-form-description">Sign in to explore our delicious menu</p>
                </div>
                {showSubmitError&&<p className="error-msg">{errorMsg}</p>}
                <form onSubmit={onSubmitForm}>
                    <div className="Email-container">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" value={email} name="email" placeholder="Enter your email" className="form-input"  onChange={onChangeEmail}/>
                    </div>
                    <div className="password-container">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" value={password} name="password" placeholder="Enter your password" className="form-input"  onChange={onChangePassword} />
                    </div>
                    <button type="submit" className="sigin-btn">Sign In</button>
                    
                </form>
            </div>
        </div>
    )
}
export default LoginForm    