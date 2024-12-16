import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pyridamLogo from "../assets/pyridam.png";
// import loginAction from '../../config/redux/actions/loginAction';
// import swal from 'sweetalert2'
// import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { userProfile } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   dispatch(loginAction({ email, password })).then(() => {
  //     if (localStorage.getItem("token")) {
  //       navigate('/')
  //     }
  //   })
  // }

  return (
    // image background
    <div className="bg-account">
      {/* container to align div center horizontally and vertically */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white rounded account-form shadow-lg m-4">
          {/* Login form */}
          <form>
            <div className="d-flex flex-column p-3">
              {/* Form title */}
              <div className="d-flex justify-content-center mt-2">
                <img
                  className=""
                  src={pyridamLogo}
                  style={{ height: 70 }}
                  alt=""
                />
                {/* <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme">Pyridam Farma</div> */}
              </div>

              {/* input field */}
              <div className="mt-4 align-self-center">Hi, Welcome back!</div>
              <input
                type="email"
                className="border-0 border-bottom border-secondary border-2 mt-4"
                id="exampleFormControlInput1"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border-0 border-bottom border-secondary border-2 mt-4"
                id="exampleFormControlInput1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="align-self-end mt-4 text-secondary-theme">
                {/* <Link
                  to="/forgot-password"
                  className="text-secondary-theme"
                >
                  Forgot Password?
                </Link> */}
              </div>
              <button
                type="submit"
                className="bg-primary-theme text-center mt-4 py-2 text-white border-0 rounded-pill"
              >
                Login
              </button>
              <div className="mt-4 mb-2 align-self-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-secondary-theme">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
