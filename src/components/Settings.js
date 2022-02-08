import React, { useState, useEffect } from "react";
import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";
import { toast, ToastContainer } from "react-toastify";
import fastNotify from "../notify";
import db from "../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import {
  getAuth,
  updatePassword,
  updateEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Settings = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    displayName: "",
    avatar: null,
  });
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: null,
    newPassword: null,
    newPasswordConfirm: null,
  });
  const [changeEMailAddressForm, setChangeEmailAddressForm] = useState({
    currentEMailAddress: null,
    newEMailAddress: null,
  });

  const auth = getAuth();

  useEffect(() => {
    setForm({ username: user.username, displayName: user.displayName });
  }, []);

  const updateInfo = (e) => {
    e.preventDefault();

    let updateValues = {
      displayName: form.displayName,
      username: form.username,
    };

    if (form.avatar) {
      updateValues.avatar = form.avatar;
      user.avatar = form.avatar;
    }

    let docId = sessionStorage.getItem("userDocId");

    updateDoc(doc(db, "users", docId), updateValues)
      .then((r) => {
        user.displayName = form.displayName;
        user.username = form.username;

        sessionStorage.setItem("user", JSON.stringify(user));
        fastNotify(
          "The information has been updated. Please wait, page is refreshing.",
          toast.TYPE.SUCCESS
        );
        setTimeout(() => {
          window.location.replace("/settings");
        }, 2000);
      })
      .catch((err) => {
        fastNotify(`Firebase hatası. ${err}`);
      });
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();

    let eMailAddress = sessionStorage.getItem("email");
    let validate = true;

    signInWithEmailAndPassword(
      auth,
      eMailAddress,
      changePasswordForm.currentPassword
    )
      .then((r) => {
        if (
          changePasswordForm.newPassword !==
          changePasswordForm.newPasswordConfirm
        ) {
          validate = false;
          fastNotify(
            "The new password and the password confirmation do not match. Please check and try again.",
            toast.TYPE.ERROR
          );
        }

        if (validate) {
          updatePassword(auth.currentUser, changePasswordForm.newPassword)
            .then(() => {
              fastNotify(
                "The password has been successfully changed.",
                toast.TYPE.SUCCESS
              );
            })
            .catch((err) => {
              fastNotify(`Firebase ERROR. ${err}`);
            });
        }
      })
      .catch(() => {
        fastNotify(
          "Please check your current password and try again.",
          toast.TYPE.ERROR
        );
      });
  };

  const changeEMailAddressHandler = (e) => {
    e.preventDefault();
    let eMailAddress = sessionStorage.getItem("email");
    let validate = true;

    if (eMailAddress !== changeEMailAddressForm.currentEMailAddress) {
      validate = false;
      fastNotify(
        "Your current email address is incorrect. Please check and try again.",
        toast.TYPE.ERROR
      );
    }

    if (validate) {
      updateEmail(auth.currentUser, changeEMailAddressForm.newEMailAddress)
        .then(() => {
          fastNotify(
            "Your email address has been successfully changed!",
            toast.TYPE.SUCCESS
          );
          sessionStorage.setItem(
            "email",
            changeEMailAddressForm.newEMailAddress
          );
        })
        .catch((err) => {
          fastNotify(
            `Operation cannot be performed. Error message:  ${err}`,
            toast.TYPE.ERROR
          );
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

  return (
    <div>
      <ToastContainer />
      <header className="flex justify-between items-center p-4 border-b border-gray-extraLight text-white">
        <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-2">
          Settings
        </span>
        <img src={_Post_Blog_Logo} alt="" className="w-10 h-10 rounded-t-lg" />
      </header>
      <div className="p-5">
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                onChange={(e) => setForm({ ...form, username: e.target.value })}
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
              onClick={(e) => updateInfo(e)}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Update My Details!
            </button>
          </div>
        </form>
        <hr />
        <h4 className={"text-white text-lg mt-6 font-bold mb-3"}>
          Change Password
        </h4>
        <form className={"space-y-6"}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="currentPassword" className="sr-only">
                Current Password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                onChange={(e) =>
                  setChangePasswordForm({
                    ...changePasswordForm,
                    currentPassword: e.target.value,
                  })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                placeholder="Please enter current password."
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="sr-only">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                onChange={(e) =>
                  setChangePasswordForm({
                    ...changePasswordForm,
                    newPassword: e.target.value,
                  })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                placeholder="Please enter new password."
              />
            </div>
            <div>
              <label htmlFor="newPasswordConfirm" className="sr-only">
                New Password Confirm
              </label>
              <input
                id="newPasswordConfirm"
                name="newPasswordConfirm"
                type="password"
                required
                onChange={(e) =>
                  setChangePasswordForm({
                    ...changePasswordForm,
                    newPasswordConfirm: e.target.value,
                  })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                placeholder="Please enter new password confirm."
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
              onClick={(e) => changePasswordHandler(e)}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Change Password
            </button>
          </div>
        </form>
        <hr />
        <h4 className={"text-white text-lg mt-6 font-bold mb-3"}>
          Change E-Mail Address
        </h4>
        <form className={"space-y-6"}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="currentPassword" className="sr-only">
                Current E-Mail Address
              </label>
              <input
                id="currentEMailAddress"
                name="currentEMailAddress"
                type="email"
                required
                onChange={(e) =>
                  setChangeEmailAddressForm({
                    ...changeEMailAddressForm,
                    currentEMailAddress: e.target.value,
                  })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                placeholder="Please enter current e-mail address."
              />
            </div>
            <div>
              <label htmlFor="newEMailAddress" className="sr-only">
                New E-Mail Address
              </label>
              <input
                id="newEMailAddress"
                name="newEMailAddress"
                type="email"
                required
                onChange={(e) =>
                  setChangeEmailAddressForm({
                    ...changeEMailAddressForm,
                    newEMailAddress: e.target.value,
                  })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                placeholder="Please enter new e-mail address."
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
              onClick={(e) => changeEMailAddressHandler(e)}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Change E-Mail Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
