import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import signInAnimation from "../../../assests/Animations/signin.json";
import { AuthContext } from "../../../contexts/UserContext";

const SignIn = () => {
  const {
    logInUser,
    setLoading,
    socialMediaUser,
    googleProvider,
    facebookProvider,
  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // ** login user functionality

    const userLogIn = async () => {
      try {
        const result = await logInUser(email, password);
        console.log(result.user.displayName);
        navigate(from, { replace: true });
      } catch (error) {
        setError(error.message);
      }
    };

    userLogIn();
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <Lottie animationData={signInAnimation} loop={true} />;
      </div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col w-full">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  required
                  name="email"
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  required
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="/" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <small>{error}</small>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="form-control mt-6">
                <button
                  onClick={() => {
                    setLoading(true);
                    socialMediaUser(googleProvider)
                      .then(() => navigate(from, { replace: true }))
                      .catch((error) => setError(error.message));
                  }}
                  className="btn btn-primary"
                >
                  Google
                </button>
              </div>
              <div className="form-control mt-6">
                <button
                  onClick={() => {
                    setLoading(true);
                    socialMediaUser(facebookProvider)
                      .then(() => navigate(from, { replace: true }))
                      .catch((error) => setError(error.message));
                  }}
                  className="btn btn-primary"
                >
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
