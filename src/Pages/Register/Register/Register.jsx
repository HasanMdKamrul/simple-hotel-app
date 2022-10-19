import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import signInAnimation from "../../../assests/Animations/signin.json";
import { AuthContext } from "../../../contexts/UserContext";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);

    // ** password validation

    if (!(password === confirm)) {
      setError(`Password didn't match`);
      return;
    }

    if (!/(?=.*?[A-Z])/.test(password)) {
      setError(`At least one upper case`);
      return;
    }
    if (!/(?=.*?[a-z])/.test(password)) {
      setError(`At least one lower case English letter`);
      return;
    }
    if (!/(?=.*?[0-9])/.test(password)) {
      setError(`At least one digit`);
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError(`At least one special character`);
      return;
    }
    if (password.length < 6) {
      setError(`At least 6 character`);
      return;
    }

    // ** SignUp functionality

    const signUp = async () => {
      try {
        await createUser(email, password);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    signUp();
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <Lottie animationData={signInAnimation} loop={true} />;
      </div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col w-full">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  name="confirm"
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link to="/" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                  <small>{error}</small>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Google</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
