import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EmotionalIcon, NotificationIcon } from "../icons/Icons";
import db from "../firebase.js";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import InputEmoji from "react-input-emoji";

function PostModal({ setModal, getPosts }) {
  const [showEmojis, setShowEmojis] = useState(false);
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setContent(content + emoji);
  };
  const cancelButtonRef = useRef(null);
  const [content, setContent] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const sendPost = async () => {
    if (content !== "") {
      const dataCol = collection(db, "feed");
      addDoc(dataCol, {
        // getDoc ile yapıştır
        displayName: user.displayName,
        username: user.username,
        content,
        timestamp: serverTimestamp(),
        avatar: user.avatar,
      });
      // await collection(db, "data").add({
      //   displayName: "Emre Duman",
      //   username: "@Dumanemre3",
      //   content,
      //   timestamp: serverTimestamp(),
      //   avatar:
      //     "https://media-exp1.licdn.com/dms/image/C4D03AQFSVDgfSYaPmQ/profile-displayphoto-shrink_800_800/0/1605830721730?e=1645056000&v=beta&t=uTN1WkF4STg_wEYr3jJz2AT14JhSQBzrHTb3pLY5j2s",
      // });
      setContent("");
      setModal(false);
    }
  };
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full b ">
              <div
                className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                style={{
                  background: "#00071c",
                  borderBottom: "2px solid rgba(255,255,255,0.2)",
                  borderRight: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <img
                      className="rounded-full"
                      src={user.avatar}
                      alt="Profile"
                    ></img>
                  </div>
                  <div className="flex flex-col flex-1 px-2 ">
                    <textarea
                      className="w-full text-xl bg-gray-light placeholder-gray-dark outline-none overflow-hidden resize-none rounded p-3 "
                      placeholder="What do you want share.."
                      maxLength="210"
                      rows="6"
                      cols="50"
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                    ></textarea>
                    <div className="flex items-center justify-between"></div>
                  </div>
                </div>
              </div>
              <div
                className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                style={{
                  background: "#00071c",
                  borderBottom: "2px solid rgba(255,255,255,0.2)",
                  borderRight: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                {/* <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => console.log("ok")}
                >
                  Send Post
                </button> */}
                <button
                  className="bg-indigo-700 text-white hover:bg-indigo-500 text-sm mr-2
                  font-bold py-2 px-4 rounded "
                  onClick={sendPost}
                  // onClick={() => setModal(false)}
                >
                  Send Post
                </button>
                <button
                  type="button"
                  className="bg-red-800 text-white hover:bg-red-600 text-sm
                  font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setModal(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
                <div className="flex items-center justify-center w-11 h-11 rounded-full ">
                  <button onClick={() => setShowEmojis(!showEmojis)}>
                    <EmotionalIcon className="w-6 h-6 top-0 "></EmotionalIcon>
                  </button>
                  {showEmojis && (
                    <div className="z-10">
                      <Picker onSelect={addEmoji} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default PostModal;
