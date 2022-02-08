import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fastNotify from "../../notify";
import { getAuth } from "@firebase/auth";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { delay } from "lodash";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import db from "../../firebase";
// import { LockClosedIcon } from "@heroicons/react/solid";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    displayName: "",
    avatar: "",
  });

  const signIn = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      fastNotify("Please fill in the blanks and try again.", toast.TYPE.ERROR);
    } else {
      let auth = getAuth();
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((res) => {
          addDoc(collection(db, "users"), {
            uid: res.user.uid,
            username: form.username,
            displayName: form.displayName,
            avatar: form.avatar,
          });
          signInWithEmailAndPassword(auth, form.email, form.password);
          fastNotify(
            "Your account has been successfully created. You are being redirected to the home page.",
            toast.TYPE.SUCCESS
          );
          setTimeout(() => {
            window.location.replace("/home");
          }, 3000);
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
              fastNotify(
                "This e-mail address is registered in the system!",
                toast.TYPE.ERROR
              );
              break;
            default:
              fastNotify(
                "Your account could not be created, Your password must be a minimum of 6 characters.",
                toast.TYPE.ERROR
              );
          }
        });
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setForm({ ...form, avatar: base64 });
  };

  const signInPage = () => {
    window.location.replace("/login");
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
          <ToastContainer />
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
                  Register
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
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
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
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="sr-only">
                      User Name
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="current-password"
                      required
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                      placeholder="User Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="displayName" className="sr-only">
                      Name Surname
                    </label>
                    <input
                      id="name-surname"
                      name="name-surname"
                      type="text"
                      autoComplete="current-password"
                      required
                      value={form.displayName}
                      onChange={(e) =>
                        setForm({ ...form, displayName: e.target.value })
                      }
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                      placeholder="Name Surname"
                    />
                  </div>
                  <div>
                    <label htmlFor="avatar" className="sr-only">
                      Avatar
                    </label>
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      required
                      onChange={(e) => {
                        handleFileRead(e);
                      }}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                      placeholder="Choise Avatar"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
                    onClick={(e) => signIn(e)}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Register
                  </button>
                </div>
                <div>
                  <button
                    onClick={(e) => signInPage(e)}
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Go To Login
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

export default Register;
