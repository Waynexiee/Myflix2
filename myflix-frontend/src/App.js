import React, { Component } from "react";
import "./App.scss";
import jwt_decode from "jwt-decode";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Front from "./components/page/Front";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Videos from "./components/videos/Videos";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/sign_in";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Front} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/sign_in" component={Login} />
            <Route exact path="/videos" component={Videos} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
