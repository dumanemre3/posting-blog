// import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router";
// import fire from "firebase";
// import Login from "./Login";
// import Logout from "./Logout";
// import "./Login.css";
// import { useGlobalContext } from "../context";

// const Welcome = () => {
//   const { user, setUser, hasAccount, setHasAccount } = useGlobalContext();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const clearInputs = () => {
//     setEmail("");
//     setPassword("");
//   };
//   const clearErrors = () => {
//     setEmailError("");
//     setPasswordError("");
//   };
//   //   const handleLogin = () => {
//   //     clearErrors();
//   //     fire
//   //       .auth()
//   //       .signInWithEmailAndPassword(email, password)
//   //       .then(() => {
//   //         return <Redirect to="/home" />;
//   //       })
//   //       .catch((err) => {
//   //         switch (err.code) {
//   //           case "auth/invalid-email":
//   //           case "auth/user-disabled":
//   //           case "auth/user-not-found":
//   //             setEmailError(err.message);
//   //             break;
//   //           case "auth/wrong-password":
//   //             setPasswordError(err.message);
//   //             break;
//   //         }
//   //       });
//   //   };
//   //   const handleSignup = () => {
//   //     clearErrors();
//   //     fire
//   //       .auth()
//   //       .createUserWithEmailAndPassword(email, password)
//   //       .catch((err) => {
//   //         switch (err.code) {
//   //           case "auth/email-already-in-use":
//   //           case "auth/invalid-email":
//   //             setEmailError(err.message);
//   //             break;
//   //           case "auth/weak-password":
//   //             setPasswordError(err.message);
//   //             break;
//   //         }
//   //       });
//   //   };
//   //   const handleLogout = () => {
//   //     fire.auth().signOut();
//   //     return <Redirect to="/" />;
//   //   };
//   //   const authListener = () => {
//   //     if (user === "") {
//   //       fire.auth().onAuthStateChanged((userr) => {
//   //         console.log(userr);

//   //         if (userr) {
//   //           clearInputs();
//   //           setUser(userr);
//   //           return <Redirect to="/home" />;
//   //           window.location.href = "/home";
//   //         } else {
//   //           setUser("");
//   //         }
//   //       });
//   //     }
//   //   };
//   useEffect(() => {
//     authListener();
//   });
//   return (
//     <>
//       {user ? (
//         <Redirect to="/home" />
//       ) : (
//         <Login
//           email={email}
//           setEmail={setEmail}
//           password={password}
//           setPassword={setPassword}
//           handleLogin={handleLogin}
//           handleSignup={handleSignup}
//           hasAccount={hasAccount}
//           setHasAccount={setHasAccount}
//           emailError={emailError}
//           passwordError={passwordError}
//         />
//       )}
//     </>
//   );
// };
// export default Welcome;
