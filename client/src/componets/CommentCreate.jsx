import React, { useState } from "react";
import axios from "axios";

import CommentList from "./CommentList";

export const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:3001/post/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="mb-2">New Comment</label>
          <input
            className="form-control mb-3"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
