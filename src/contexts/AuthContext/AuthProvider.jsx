import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const authInfo = { registerUser, signInUser };

const AuthProvider = ({ children }) => {
  return (
    <AuthContext value={authInfo}>
      {children}
      {}
    </AuthContext>
  );
};

export default AuthProvider;
