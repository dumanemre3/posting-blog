import React from "react";
import FeedItem from "./FeedItem";

const FeedList = ({posts, isSavedPage}) => {
    return (
        <div
            className="flex-1  mb-2 "
            style={{
                overflow: 'scroll',
                background: "#00071c",
                borderTop: "2px solid rgba(255,255,255,0.2)",
            }}
        >
            {posts.map((post, index) => (
                <FeedItem post={post} key={index} isSavedPage={isSavedPage}/>
            ))}
        </div>
    );
};

export default FeedList;
