import React, { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoading(false);
        return userCredential;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  const logOut = () =>{
    return signOut(auth)
  }

// const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });

  
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        return result;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoading(false);
        return userCredential;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };



  const authInfo = {
    user,
    loading,
    createUser,
    loginWithGoogle,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;