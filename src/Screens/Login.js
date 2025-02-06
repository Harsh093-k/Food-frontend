import { useState ,} from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utile/Server";
import {useCookies} from 'react-cookie';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cookies, setCookie] = useCookies(["token","email"]);
  const navigate=useNavigate()

  


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErrorMessage("");
    setSuccessMessage("");
  
    const data = { email, password };
    if (!email || !password) {
      setErrorMessage("Please fill in the required information.");
    } else {
      try {
        const response = await makeUnauthenticatedPOSTRequest("/api/login", data);
  
        if (response && !response.error) {
         
          localStorage.setItem("token",response.token)
          localStorage.setItem("email",response.email)
  
         
          setSuccessMessage("Login successful!");
          navigate("/");
        } else {
          setErrorMessage("Invalid email or password. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Failed to connect to the server. Please try again later.");
      }
    }
  };
  
  


  return (
    <>
      <div
        className="container"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1518510227856-30619d542ea9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU1fHxmb29kJTIwa2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "end",
          alignItems: "center", 
        }}
      >
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          
          <div style={{ marginRight:"100px"}}> 
          <h1 className="text-danger fs-1 fst-italic" style={{marginBottom:"50px"}}>GoFood</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                 placeholder="Enter E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
            </div>
  
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                 placeholder="Create strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               <div id="emailHelp" className="form-text text-black">
                We'll never share your password with anyone else.
              </div>
            </div>
  
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/Signup" className="m-3 btn btn-danger">
              Go for sign-up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
  
}
