import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";
import { UserContext } from "./contexts/User";
import Login from "./components/Login";
import { fetchUsers } from "../api";

function App() {
  const [getArticles, setGetArticles] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((usersList) => {
      setUsers(usersList);
    });
  }, []);
  return (
    <UserContext.Provider
      value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}
    >
      <h1>Scoop</h1>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login users={users} />} />
        <Route
          path="/articles"
          element={
            <ArticlesList
              getArticles={getArticles}
              setGetArticles={setGetArticles}
            />
          }
        />
        <Route
          path="/articles/:topic"
          element={
            <ArticlesList
              getArticles={getArticles}
              setGetArticles={setGetArticles}
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage users={users} />}
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
