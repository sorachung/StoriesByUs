import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Browse from "./browse/Browse";
import BrowseAll from "./browse/BrowseAll";
import BrowseByGenre from "./browse/BrowseByGenre";
import BrowseByTag from "./browse/BrowseByTag";
import AddChapterForm from "./chapters/AddChapterForm";
import Chapter from "./chapters/Chapter";
import EditChapterChoice from "./chapters/EditChapterChoice";
import Home from "./dashboard/Home";
import MyProfile from "./myProfile/MyProfile";
import Profile from "./profiles/Profile";
import EditPostForm from "./stories/EditStoryForm";
import NewPostForm from "./stories/NewPostForm";

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

        <Route exact path="/post/works">
          {isLoggedIn ? <NewPostForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/post/works/:storyId(\d+)">
          {isLoggedIn ? <AddChapterForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/edit/works/:storyId(\d+)">
          {isLoggedIn ? <EditPostForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/edit/works/:storyId(\d+)/chapters">
          {isLoggedIn ? <EditChapterChoice /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/users/:userId(\d+)">
          {isLoggedIn ? <Profile defaultValue={0} /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/users/:userId(\d+)/stories">
          {isLoggedIn ? <Profile defaultValue={1} /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/users/:userId(\d+)/bookmarks">
          {isLoggedIn ? <Profile defaultValue={2} /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/users/me">
          {isLoggedIn ? (
            <MyProfile defaultValue={0} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/users/me/stories">
          {isLoggedIn ? (
            <MyProfile defaultValue={1} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/users/me/bookmarks">
          {isLoggedIn ? (
            <MyProfile defaultValue={2} />
          ) : (
            <Redirect to="/login" />
          )}
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
