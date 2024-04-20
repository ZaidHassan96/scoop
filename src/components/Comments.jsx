import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { deleteComment, fetchComments } from "../../api";
import { UserContext } from "../contexts/User";
import { postComment } from "../../api";
import "../../stylesheets/Comments.css";
import { Spinner } from "react-bootstrap";

const Comments = ({
  article_id,
  setComments,
  comments,
  showComments,
  setShowComments,
  errArticle,
  setErrArticle,
  commentInput,
  setCommentInput,
  users,
}) => {
  const [isLoading, setisLoading] = useState(true);
  const { loggedInUser } = useContext(UserContext);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [deletedCommentId, setDeletedCommentId] = useState("");
  const commentsContainerRef = useRef(null);
  console.log(loggedInUser);

  useEffect(() => {
    setisLoading(true);
    fetchComments(article_id).then((comments) => {
      setComments(comments);
      setisLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTo(0, 0);
    }
  }, [comments]);

  const removeComment = (author, comment_id) => {
    if (loggedInUser.username === author) {
      setDeletedCommentId(comment_id);

      deleteComment(comment_id)
        .then(() => {
          setErrArticle(null);
          setIsCommentDeleted(true);
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.comment_id !== comment_id)
          );
        })
        .catch(() => {
          setErrArticle("please try again comment not deleted");
        });
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setCommentInput(value);
  };

  console.log(commentInput);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentInput) {
      return;
    } else if (!loggedInUser) {
      alert("You must be logged in to comment");
      return;
    }

    const temporaryComment = {
      author: loggedInUser.username,
      body: commentInput,
      created_at: new Date().toISOString(),
      comment_id: `temp_${Math.floor(Math.random() * 1000000)}`,
    };
    setComments((currComments) => {
      return [temporaryComment, ...currComments];
    });

    setErrArticle(null);
    const userNameList = users.map((user) => user.username);

    postComment(commentInput, loggedInUser, article_id).catch((err) => {
      // if (!userNameList.includes(temporaryComment.author)) {
      //   setErrArticle(
      //     "Sorry the user for the provided username does not exist"
      //   );
      // }
      if (err) {
        setErrArticle("Comment failed to post, please try again.");
        setComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.comment_id !== temporaryComment.comment_id
          )
        );
      }
    });
    setShowComments(true);
  };

  if(isLoading){
    return <div className="loading">
    <Spinner animation="border" variant="dark" />
    <p>Loading...</p>
    </div>
}

  return (
    <>
      <form id="comment-form" className="comment-form" onSubmit={handleSubmit}>
        <p style={{ textAlign: "left", marginBottom: "0px" }}>
          Add a comment below:
        </p>
        {errArticle ? <p style={{ color: "red" }}>{errArticle}</p> : null}
        {/* <label htmlFor="username"></label> */}
        {/* <input
          type="text"
          id="username"
          placeholder="username"
          value={commentInput.username}
          onChange={handleChange}
          style={{
            width: "90%", // Set the width to 100% of its container
            height: "15px", // Set the height to your desired value
            padding: "10px", // Add padding to provide spacing inside the input
            fontSize: "16px",
            marginBottom: "10px",
            // Set the font size to your desired value
            // Add any other styles as needed
          }}
        /> */}
        {/* <br /> */}
        <label htmlFor="comment"></label>
        <input
          type="text"
          id="body"
          value={commentInput}
          onChange={handleChange}
          style={{
            borderRadius: "7px",
            width: "100%", // Set the width to 100% of its container
            height: "20px", // Set the height to your desired value
            padding: "15px", // Add padding to provide spacing inside the input
            fontSize: "16px",
            marginBottom: "10px",
            // Set the font size to your desired value
            // Add any other styles as needed
          }}
        />
        <br />
        <button
          type="submit"
          disabled={!commentInput || isLoading}
          style={{ borderRadius: "7px" }}
        >
          {isLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>
      <div className="comments-container" ref={commentsContainerRef}>
        <ul style={{ paddingLeft: "5px" }}>
          {comments.map((comment) => (
            <li key={comment.comment_id} className="comment-list">
              {isCommentDeleted && deletedCommentId === comment.comment_id && (
                <p>Comment deleted!</p>
              )}
              {errArticle && deletedCommentId === comment.comment_id && (
                <p style={{ color: "red" }}>{errArticle}</p>
              )}

              <div className="comments">
                <div className="comment">
                  <p style={{  display: "flex", justifyContent: "space-between" }}>{comment.author}     {loggedInUser && loggedInUser.username === comment.author && (
                  <p
                    className="delete-button"
                    onClick={() =>
                      removeComment(comment.author, comment.comment_id)
                    }
                  >
                    Delete
                  </p>
                )}</p>
                  <p>{new Date(comment.created_at).toUTCString()}</p>
                </div>

            
              </div>
              <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px"}}>
                {comment.body}
              </p>
              
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Comments;
