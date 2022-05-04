import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Browse from "./browse/Browse";
import BrowseAll from "./browse/BrowseAll";
import BrowseByGenre from "./browse/BrowseByGenre";
import BrowseByTag from "./browse/BrowseByTag";
import Chapter from "./chapters/Chapter";
import Home from "./dashboard/Home";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/browse" exact>
          {isLoggedIn ? <Browse /> : <Redirect to="/login" />}
        </Route>
        <Route path="/browse/all" exact>
          {isLoggedIn ? <BrowseAll /> : <Redirect to="/login" />}
        </Route>
        <Route path="/browse/genre/:genreId(\d+)">
          {isLoggedIn ? <BrowseByGenre /> : <Redirect to="/login" />}
        </Route>
        <Route path="/browse/tag/:tagId(\d+)">
          {isLoggedIn ? <BrowseByTag /> : <Redirect to="/login" />}
        </Route>

        <Route path="/works/:storyId(\d+)/chapters/:placeInOrder(\d+)">
          {isLoggedIn ? <Chapter /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route>404 Not Found</Route>
      </Switch>
    </main>
  );
}
