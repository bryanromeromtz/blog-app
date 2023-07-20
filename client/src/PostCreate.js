import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/post", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form className="form">
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control mb-3"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <button className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
