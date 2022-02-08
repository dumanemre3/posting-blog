import React, { useState } from "react";
import PostingBlogLogo from "../../images/postingblog.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Register from "./register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fastNotify from "../../notify";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const signIn = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      fastNotify(
        "Please fill in the email address and password fields and try again.",
        toast.TYPE.ERROR
      );
    } else {
      let auth = getAuth();
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then((res) => {
          const uid = res.user.uid;
          const dataCol = collection(db, "users");
          console.log(uid);
          getDocs(query(dataCol, where("uid", "==", uid))).then((res) => {
            res.forEach((doc) => {
              sessionStorage.setItem("userDocId", doc.id);
              sessionStorage.setItem("email", form.email);
              sessionStorage.setItem("user", JSON.stringify(doc.data()));
            });
          });
          fastNotify(
            "Login successful, you are redirected.",
            toast.TYPE.SUCCESS
          );
          setTimeout(() => {
            window.location.replace("/home");
          }, 3000);
        })
        .catch((err) =>
          fastNotify(
            "Your email address or password is incorrect. Please try again.",
            toast.TYPE.ERROR
          )
        );
    }
  };

  const signUp = () => {
    window.location.replace("/register");
  };

  return (
    <div
      className="h-screen w-full"
      style={{
        background: "#00071c",
      }}
    >
      {
        <>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
                  Login
                </h2>
              </div>
              <form className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      value={form.email}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      value={form.password}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={fastNotify}
                    onClick={(e) => signIn(e)}
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Login
                  </button>
                  <ToastContainer></ToastContainer>
                </div>

                <div>
                  <button
                    onClick={(e) => signUp(e)}
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Go To Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default Login;
