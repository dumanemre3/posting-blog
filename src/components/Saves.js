import React, {useEffect, useState} from "react";
import FeedList from "./FeedList";
import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";
import {query} from "firebase/database";
import {
    collection,
    getDocs,
    onSnapshot,
    where,
    doc as Doc,
    getDoc,
    orderBy,
} from "firebase/firestore";
import db from "../firebase";

const Saves = () => {
    const [savedPosts, setSavedPosts] = useState([]);
    const [feeds, setFeeds] = useState([]);
    const [dataStores, setDataStores] = useState([]);
    const getUserDocId = sessionStorage.getItem('userDocId')

    useEffect( async () => {
        //getPosts();
        await getSavedItems()
    }, []);

    const getSavedItems = async () => {
        const dataCol = collection(db, "savedFeeds");
        onSnapshot(dataCol, (doc) => {
            const q = query(dataCol, where('userDocId', '==', getUserDocId));

            getDocs(q).then(r => {
                r.docs.map(async (datum, key) => {
                    const {feedDocId} = datum.data();
                    const docRef = Doc(db, 'feed', feedDocId);
                    getDoc(docRef).then(r => {
                        feeds.push(r);
                        setFeeds([...feeds, r]);
                        setDataStores(feeds)
                    });
                })
            });
        });
    }


    /**const getPosts = async () => {
    const userId = sessionStorage.getItem("uid");
    const dataCol = collection(db, "savedFeeds");
    onSnapshot(dataCol, async (doc) => {
      const q = query(dataCol, where("userId", "==", userId));

      let feedSnapshot = await getDocs(q);
      let data = feedSnapshot.docs;

      data.map((saved, index) => {
        console.log(saved);

        const { feedId, userId } = saved.data();

        const dataCol2 = collection(db, "feed");
        onSnapshot(dataCol2, async (doc) => {
          const q2 = query(dataCol2, where("uuid", "==", feedId));
          let savedFeedSnapshot = await getDocs(q2);
          let data2 = savedFeedSnapshot.docs;

          savedFeedSnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setSavedPosts([...savedPosts, doc]);
          });

          //setSavedPosts([...savedPosts, data2]);

          /*const q2 = query(
            dataCol2,
            where("uuid", "===", feedId),
            orderBy("uuid", "desc")
          );

          let savedFeedSnapShot = await getDocs(q2);
          let data2 = savedFeedSnapShot.docs;

          setSavedPosts([...savedPosts, data2]);*
      });
      });

      //setSavedPosts(data);
      });
      /*onSnapshot(dataCol, async (doc) => {
        const q = query(
          dataCol,
          where("isSaved", "==", true),
          orderBy("timestamp", "desc")
        );

        let feedSnapshot = await getDocs(q);
        let data = feedSnapshot.docs;
        setSavedPosts(data);
      });*
      };*/


    return (
        <div>
            <header className="flex justify-between items-center p-4 border-b border-gray-extraLight text-white">
        <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-3">
          Saved
        </span>
                <img
                    src={_Post_Blog_Logo}
                    alt=""
                    className="w-10 h-10 rounded-t-lg"
                />
            </header>
            <FeedList posts={dataStores} isSavedPage={true}/>
        </div>
    );
};

export default Saves;
