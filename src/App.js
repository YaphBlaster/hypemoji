import React, { Component } from "react";
import "./App.css";

import Home from "./containers/Home";
import Mojis from "./containers/Mojis";

// Toasts
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";

import styled from "styled-components/macro";

import { addBackToTop } from "vanilla-back-to-top";

const RouterContainer = styled.div`
  width: 80%;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  justify-content: space-evenly;
  font-size: 1.2em;
  margin-bottom: 10px;
  margin-top: 10px;
  max-width: 400px;
  width: 100%;
  a {
    color: white;
    margin: 10px;
  }
`;

class App extends Component {
  render() {
    const { primaryMoji } = this.props;
    addBackToTop();

    return (
      <div className="App">
        <div className="App-header">
          <Router>
            <RouterContainer>
              {primaryMoji && (
                <Navbar>
                  <Link to="/solomoji">SoloMoji</Link>
                  <Link to="/">Home</Link>
                  <Link to="/duomoji">DuoMoji</Link>
                </Navbar>
              )}
              <Route
                exact={primaryMoji ? true : false}
                path="/"
                component={Home}
              />
              {primaryMoji && (
                <Route exact path="/solomoji" component={Mojis} />
              )}
              {primaryMoji && (
                <Route
                  path="/duomoji"
                  exact
                  render={() => <Mojis isFriendMoji={true} />}
                />
              )}
            </RouterContainer>
          </Router>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  primaryMoji: state.mojiModal.primaryMoji
});

export default connect(
  mapStateToProps,
  null
)(App);
