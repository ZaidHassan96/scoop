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
export { fetchArticles, fetchComments, fetchArticle };
