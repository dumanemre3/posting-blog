import React, { useState, useEffect } from "react";
import PostBox from "../components/PostBox";
import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";
import db from "../firebase.js";
import FeedList from "../components/FeedList";
import _ from "lodash";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import PostModal from "../components/PostModal";
import Login from "../components/login/login";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [ss, setSs] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const getPosts = async () => {
    const dataCol = collection(db, "feed");
    onSnapshot(dataCol, async (doc) => {
      const q = query(dataCol, orderBy("timestamp", "desc"));

      let feedSnapshot = await getDocs(q);
      let data = feedSnapshot.docs;
      setPosts(data);
    });
  };

    useEffect(() => {
        if (user === null) {
            window.location.replace('/login')
        }
    }, []);


  // const test = (snapshot) => {
  //   snapshot.docChanges().forEach((s) => {
  //     console.log("-->", s.doc.data());
  //     let a = _.clone(posts);
  //     console.log(a);
  //     a.push(s.doc.data());
  //     setPosts(a);
  //   });
  // };

  useEffect(() => {
    getPosts();
    // test();
  }, []);

  return (
    <>
      <header
        className="flex justify-between items-center p-4 "
        style={{
          background: "#00071c",
          borderBottom: "2px solid rgba(255,255,255,0.2)",
          borderRight: "2px solid rgba(255,255,255,0.2)",
        }}
      >
        <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-2 text-white">
          Home
        </span>
        <img
          src={_Post_Blog_Logo}
          alt=""
          className="w-10 h-10 rounded-t-lg object-contain"
        ></img>
      </header>
      <div
        className="flex space-x-4 px-4 py-3 "
        style={{
          background: "#00071c",
          // borderLeft: "2px solid rgba(255,255,255,0.3)",
        }}
      >
        <img
          className="rounded-full w-12 h-12 mt-1"
          src={user?.avatar}
          alt="Profile"
        />
        <PostBox getPosts={getPosts}></PostBox>
      </div>
      <FeedList posts={posts}></FeedList>
    </>
  );
};

export default Content;
