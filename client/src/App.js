import React from "react";
import PostCreate from "./componets/PostCreate";
import PostList from "./componets/PostList";

export default function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
}
