import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3002/post", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="mb-2">
          Title</label>
          <input
            className="form-control mb-3"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <button className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
