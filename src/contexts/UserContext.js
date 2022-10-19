import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //   ** Email and password register

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   ** update profile

  const userProfileUpdate = (profileObject) => {
    return updateProfile(auth.currentUser, profileObject);
  };

  //   ** Email Verification

  const userEmailVerification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  //   ** Google login / signup

  const googleProvider = new GoogleAuthProvider();

  //   ** popup signin/register

  const socialMediaUser = (provider) => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCurrent) => {
      setUser(userCurrent);
      console.log(userCurrent);
      setLoading(false);
    });
    // ** clean Up
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    logInUser,
    logOutUser,
    loading,
    user,
    userProfileUpdate,
    userEmailVerification,
    socialMediaUser,
    googleProvider,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
