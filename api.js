import axios from "axios";

const fetchArticles = () => {
  return axios
    .get("https://news-v9aq.onrender.com/api/articles")
    .then((response) => {
      return response.data.articles;
    });
};

const fetchComments = (article_id) => {
  return axios
    .get(`https://news-v9aq.onrender.com/api/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    });
};

const fetchArticle = (article_id) => {
  return axios
    .get(`https://news-v9aq.onrender.com/api/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    });
};

const changeVotesNumber = (article_id, change) => {
  let newVote = { inc_votes: 0 };
  if (change === "increment") {
    newVote = { inc_votes: +1 };
  } else if (change === "decrement") {
    newVote = { inc_votes: -1 };
  }
  return axios.patch(
    `https://news-v9aq.onrender.com/api/articles/${article_id}`,
    newVote
  );
};

const postComment = (commentInput, article_id) => {
  return axios
    .post(
      `https://news-v9aq.onrender.com/api/articles/${article_id}/comments`,
      commentInput
    )
    .then((response) => {
      
      return response.data;
    });
};

const fetchUsers = () => {
  return axios
    .get(`https://news-v9aq.onrender.com/api/users`)
    .then((response) => {
      const users = response.data.users;
      return users.map((user) => user.username);
    });
};
export {
  fetchArticles,
  fetchComments,
  fetchArticle,
  changeVotesNumber,
  fetchUsers,
  postComment,
};
