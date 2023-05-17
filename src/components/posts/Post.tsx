import { useEffect, useState } from "react";
import { IAllPost, IPost } from "./models/IPost.interface";
import PostCard from "./PostCard";
import PostList from "./PostList";

export default function Post() {
    return (
        <div>
            <h1>Latest Posts</h1>
            <PostCard></PostCard>
            {/* <PostList></PostList> */}
        </div>
    )
}