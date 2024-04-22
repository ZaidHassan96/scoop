import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-v9aq.onrender.com/api",
});

const fetchArticles = (topic, sortBy, sortOrder, limit) => {
  let url = `/articles?sort_by=${sortBy}&order=${sortOrder}`;
  if (topic) {
    url += `&topic=${topic}`;
  }

  if (limit) {
    url += `&limit=${limit}`;
  }

  return newsApi.get(url).then((response) => {
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

const postComment = (commentInput, loggedInUser, article_id) => {
  const commentData = {
    username: loggedInUser.username,
    body: commentInput,
  };
  return axios
    .post(
      `https://news-v9aq.onrender.com/api/articles/${article_id}/comments`,
      commentData
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
      return users;
    });
};

const deleteComment = (comment_id) => {
  return axios.delete(
    `https://news-v9aq.onrender.com/api/comments/${comment_id}`
  );
};

const fetchTopics = () => {
  return axios
    .get(`https://news-v9aq.onrender.com/api/topics`)
    .then((response) => {
      return response.data;
    });
};

export {
  fetchArticles,
  fetchComments,
  fetchArticle,
  changeVotesNumber,
  fetchUsers,
  postComment,
  fetchTopics,
  deleteComment,
};
