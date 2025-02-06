import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Cart from '../Screens/Cart';
import { useCart } from "./contextReducer";
import Modal from "../Model";

const Navbar = () => {
  const [Token, setToken] = useState(false);
  const [vemail, setVEmail] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const [cartView, SetCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const checkToken = () => {
    const match = localStorage.getItem("email");
    const match2 = localStorage.getItem("token")
    setToken(!!match2);
    setVEmail(!!match);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(Token || vemail) && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myorder">
                    My Order
                  </Link>
                </li>
              )}
             

            </ul>
            <div className="d-flex">
              {!Token || !vemail ? (
                <>
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-white text-success mx-1" to="/signup">
                    Sign up
                  </Link>
                </>
              ) : (
                <div>
                  <div className="btn bg-white text-success mx-2" onClick={() => [SetCartView(true)]}>
                    My Card {" "}
                    <Badge Pill bg="danger"> {data.length}</Badge>
                  </div>
                  {cartView ? <Modal onClose={() => SetCartView(false)}><Cart /></Modal> : null}
                  <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                    Log out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
