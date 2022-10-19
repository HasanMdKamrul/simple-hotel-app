import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import signInAnimation from "../../../assests/Animations/signin.json";
import { AuthContext } from "../../../contexts/UserContext";

const Register = () => {
  const [error, setError] = useState("");
  const {
    createUser,
    userProfileUpdate,
    userEmailVerification,
    socialMediaUser,
    googleProvider,
  } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    const displayName = form.name.value;
    console.log(email, password, confirm, displayName);

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

    // ** userProfile info

    const userProfileInfo = {
      displayName,
    };

    // ** SignUp functionality

    const signUp = async () => {
      try {
        await createUser(email, password);
        userProfileUpdate(userProfileInfo)
          .then(() => console.log("Profile Updated"))
          .catch((error) => setError(`Profile update Error Happened`));
        //   ** Email verification
        userEmailVerification()
          .then(() => {
            alert(`Verification Email Send To: ${email}`);
          })
          .catch((error) => setError(`Email verification error happened`));
        form.reset();
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    signUp();
  };

  const handleGoogle = () => {};

  return (
    <div>
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
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
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
                    Register
                  </button>
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={() => socialMediaUser(googleProvider)}
                    className="btn btn-primary"
                  >
                    Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
