import React, { useState } from "react";
import { EmotionalIcon, NotificationIcon } from "../icons/Icons";
import db from "../firebase.js";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import InputEmoji from "react-input-emoji";
import { v4 } from "uuid";

const PostBox = ({ getPosts }) => {
  const [content, setContent] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const sendPost = async () => {
    if (content !== "") {
      const dataCol = collection(db, "feed");
      const user = JSON.parse(sessionStorage.getItem("user"));
      let uuidGenerate = v4();
      addDoc(dataCol, {
        // getDoc ile yapıştır
        displayName: user.displayName,
        username: user.username,
        content,
        timestamp: serverTimestamp(),
        avatar: user.avatar,
        userId: user.uid,
        uuid: uuidGenerate,
      });

      setContent("");
      getPosts();
    }
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setContent(content + emoji);
  };
  return (
    <div className="flex flex-col flex-1 mt-2 px-2  ">
      <textarea
        style={{
          background: "#00071c",
          border: "2px solid rgba(255,255,255,0.2)",
        }}
        className="w-full indent-8 text-xl text-gray-300 bg-gray-300 placeholder-gray-dark outline-none overflow-hidden resize-none rounded p-3"
        placeholder="What do you want share.."
        maxLength="210"
        rows="3"
        cols="50"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <div className="flex items-center justify-end">
        <div className="flex -ml-3 mt-3">
          <div className="flex items-center justify-center w-11 h-11 mt-1 ">
            <button onClick={() => setShowEmojis(!showEmojis)}>
              <EmotionalIcon className="w-6 h-6 "></EmotionalIcon>
            </button>
            {showEmojis && (
              <div className="z-10">
                <Picker onSelect={addEmoji} />
              </div>
            )}
          </div>
          <button
            className="bg-indigo-700 text-white hover:bg-indigo-500 rounded-full px-8 py-2 font-medium "
            onClick={sendPost}
          >
            Send Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
