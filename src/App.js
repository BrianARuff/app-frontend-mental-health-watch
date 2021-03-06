import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Register from "./Pages/Register.js";
import LoggedOut from "./Pages/LoggedOut";
import CreateContent from "./Pages/CreateContent";
import ViewAllArticles from "./Pages/ViewAllArticles";
import PageNotFound from "./Pages/PageNotFound";
import ArticlePage from "./Pages/ArticlePage";
import Settings from "./Pages/Settings";

// components
import NavBar from "./Components/NavBar.js";
import ErrorBoundary from "./Components/ErrorBoundary";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route
              exact
              path="/register"
              render={props => <Register {...props} />}
            />
            <Route
              exact
              path="/logout"
              render={props => <LoggedOut {...props} />}
            />
            <Route
              exact
              path="/createContent"
              render={props => <CreateContent {...props} />}
            />
            <Route
              exact
              path="/articles"
              render={props => <ViewAllArticles {...props} />}
            />
            <Route
              exact
              path="/article/:id"
              render={props => <ArticlePage {...props} />}
            />
            <Route
              exact
              path="/settings"
              render={props => <Settings {...props} />}
            />
            <Route path="*" render={props => <PageNotFound {...props} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default function AppWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <App {...props} />
    </ErrorBoundary>
  );
}
