import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utile/Server";
import { useCookies } from "react-cookie";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    if (!name || !email || !password || !location) {
      setErrorMessage("All fields are required.");
      return;
    }

    const data = { name, email, location, password };
    console.log(data);

    
    const response = await makeUnauthenticatedPOSTRequest("/api/CreateUser", data);
    
    if (response && !response.err) {
      console.log("Success response", response);
      
      
      localStorage.setItem("token", response.token); 
      localStorage.setItem("email", response.email); 
  
      navigate('/');
      setSuccessMessage("Sign-up was successful!");
      setErrorMessage(""); // Clear any previous error message
    } else {
      setErrorMessage("Please fill in valid information.");
    }
  };

  return (
    <>
      <div className="container"  style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1518510227856-30619d542ea9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU1fHxmb29kJTIwa2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "end",
         
          alignItems: "center", 
        }}>
        <form onSubmit={handleSubmit}>
          <div style={{marginRight:"100px"}}>
        <h1 className="text-danger fs-1 fst-italic" style={{marginRight:"50px"}}>GoFood</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <div id="emailHelp" className="form-text text-black">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already signed up
          </Link>
          </div>
        </form>

        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </div>
    </>
  );
}

