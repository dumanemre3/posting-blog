import React from "react";
import {useState, useEffect} from "react";
import {
    doc as Doc,
    deleteDoc,
    collection,
    updateDoc,
    addDoc,
    onSnapshot,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import db from "../firebase";
import moment from "moment";

const FeedItem = ({post, isSavedPage}) => {
    const {avatar, displayName, username, content, timestamp} = post.data();
    let user = JSON.parse(sessionStorage.getItem('user'));
    let id = post.id;

    const [isSaved2, setIsSaved] = useState(false);

    useEffect(() => {
        const savedDataChecker = collection(db, "savedFeeds");
        onSnapshot(savedDataChecker, async (doc) => {
            const qq = query(savedDataChecker, where("feedDocId", "==", id));

            let snapshot = await getDocs(qq);
            snapshot.forEach((doc) => {
                setIsSaved(true);
            });
        });
    }, []);

    const saveItem = () => {
        const dataCol = collection(db, "savedFeeds");
        addDoc(dataCol, {
            userUuid: user.uid,
            userDocId: sessionStorage.getItem("userDocId"),
            feedDocId: id,
        });
    };
    const deleteDocument = () => {
        const dataCol = collection(db, 'savedFeeds')
        onSnapshot(dataCol, (doc) => {
            const queryify = query(dataCol, where('feedDocId', '==', id));
            getDocs(queryify).then(r => {
                console.log(r)
                r.docs.map(async (datum, key) => {
                    deleteDoc(Doc(db, 'savedFeeds', datum.id))
                    console.log(datum.id)
                })
            })
        })
        deleteDoc(Doc(db, "feed", id));
    };
    return (
        <article
            className="space-x-4 py-7 pr-2"
            style={{borderBottom: "2px solid rgba(255,255,255,0.2)"}}
        >
            <div className="flex flex-row">
                <div
                    className="flex flex-col justify-center items-center w-1/5"
                    style={{borderRight: "2px solid rgba(255,255,255,0.2)"}}
                >
                    <img
                        src={avatar}
                        alt="Profile"
                        className="w-11 h-11 rounded-full ml-4"
                    />
                    <div className="flex flex-col items-center">
                        <h4 className="font-bold ml-3 text-gray-400 mt-1">{displayName}</h4>
                        <span className="font-normal text-sm ml-3 text-gray-600">
              @{username}
            </span>
                    </div>
                </div>
                <div className="relative w-full py-4 ml-4">
                    <div className=" text-xs break-all absolute top-0 left-0 text-gray-600">
                        {/* Post Time : {timestamp?.toDate().toLocaleTimeString("tr-TR")} */}
                        Post Time: {moment(timestamp?.toDate()).format("DD.MM.YYYY - H:mm")}
                    </div>
                    <span className="text-gray-300 break-all block mt-2 pr-2 pb-6">
            {content}
          </span>
                    <div className="absolute flex flex-row bottom-0 right-4">
                        {!isSaved2 && (
                            <button
                                className="bg-indigo-700 text-white hover:bg-indigo-500 text-sm mr-2
            font-bold py-2 px-4 rounded "
                                onClick={saveItem}
                            >
                                Save
                            </button>
                        )}
                        <button
                            className=" bg-red-800 text-white hover:bg-red-600 text-sm
             font-bold py-2 px-4 rounded "
                            onClick={deleteDocument}
                        >
                            {isSavedPage ? "Remove Post" : "Delete Post"}
                        </button>
                    </div>
                </div>
                {/* <button
          type="button"
          onClick={() => {
            deleteDoc(doc(db, "feed", id));
          }}
        >
          SİL LO
        </button> */}
            </div>
        </article>
    );
};

export default FeedItem;
