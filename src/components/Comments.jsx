import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { deleteComment, fetchComments } from "../../api";
import { UserContext } from "../contexts/User";

const Comments = ({
  article_id,
  setComments,
  comments,
  showComments,
  err,
  setErr,
}) => {
  const [isLoading, setisLoading] = useState(true);
  const { loggedInUser } = useContext(UserContext);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [deletedCommentId, setDeletedCommentId] = useState("");

  useEffect(() => {
    setisLoading(true);
    fetchComments(article_id).then((comments) => {
      setComments(comments);
      setisLoading(false);
    });
  }, [article_id]);

  const removeComment = (author, comment_id) => {
    if (loggedInUser.username === author) {
      setDeletedCommentId(comment_id);

      deleteComment(comment_id)
        .then(() => {
          setErr(null);
          setIsCommentDeleted(true);
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.comment_id !== comment_id)
          );
        })
        .catch(() => {
          setErr("please try again comment not deleted");
        });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-list">
            {isCommentDeleted && deletedCommentId === comment.comment_id && (
              <p>Comment deleted!</p>
            )}
            {err && deletedCommentId === comment.comment_id && (
              <p style={{ color: "red" }}>{err}</p>
            )}
            <h3>{comment.body}</h3>
            <div className="comment">
              <div className="author-time">
                <p style={{ marginRight: "30px" }}>Author: {comment.author}</p>
                <p>{new Date(comment.created_at).toUTCString()}</p>
              </div>
              {loggedInUser && loggedInUser.username === comment.author && (
                <p
                  className="delete-button"
                  onClick={() =>
                    removeComment(comment.author, comment.comment_id)
                  }
                >
                  Delete
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
