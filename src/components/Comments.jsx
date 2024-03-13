import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchComments } from "../../api";

const Comments = ({ article_id, setComments, comments }) => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    fetchComments(article_id).then((comments) => {
      setComments(comments);
      setisLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.comment_id} className="comment-list">
          <h3>{comment.body}</h3>
          <div className="comment">
            <p style={{ marginRight: "30px" }}>Author: {comment.author}</p>
            <p>{new Date(comment.created_at).toUTCString()}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
