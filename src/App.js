import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
// Import BrowserRouter instead of HashRouter to create friendly URLs
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput, resetSearchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    resetSearchInput('');
    history.push(url);
  };

  render() {
    return (
      <PhotoContextProvider>
      {/* Use Router instead of HashRouter and remove the basename so the URL starts at root */}
        <Router>
          <div className="container">
            <Route
              render={props => (
                <Header
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/mountain" />}
              />
              <Route path="/mountain" render={() => <Item searchTerm="mountain" />} />
              <Route path="/beach" render={() => <Item searchTerm="beach" />} />
              <Route path="/bird" render={() => <Item searchTerm="bird" />} />
              <Route path="/food" render={() => <Item searchTerm="food" />} />
              <Route
                path="/search/:searchInput"
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </PhotoContextProvider>
    );
  }
}

export default App;
