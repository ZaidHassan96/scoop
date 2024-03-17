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
import NotFound from "./components/NotFound";

function App() {
  const [err, setErr] = useState(null);
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

  if (err) {
    return <h1>{err}</h1>;
  }
  return (
    <UserContext.Provider
      value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}
    >
      <h1>Scoop</h1>
      <Navigation />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login users={users} />} />
        <Route
          path="/articles"
          element={
            <ArticlesList
              getArticles={getArticles}
              setGetArticles={setGetArticles}
              err={err}
              setErr={setErr}
            />
          }
        />
        <Route
          path="/articles/topic/:topic"
          element={
            <ArticlesList
              getArticles={getArticles}
              setGetArticles={setGetArticles}
              err={err}
              setErr={setErr}
            />
          }
        />
        {/* <Route
          path="/articles/:topic/:article_id"
          element={<ArticlePage users={users} />}
        /> */}
        <Route
          path="/articles/:article_id"
          element={<ArticlePage users={users} err={err} setErr={setErr} />}
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
