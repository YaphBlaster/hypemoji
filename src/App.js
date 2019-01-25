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

const RouterContainer = styled.div`
  width: 80%;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: center;

  a {
    margin: 10px;
  }
`;

class App extends Component {
  render() {
    const { primaryMoji } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <Router>
            <RouterContainer>
              <Navbar>
                {primaryMoji && <Link to="/solomoji">SoloMoji</Link>}
                <Link to="/">Home</Link>
                {primaryMoji && <Link to="/duomoji">DuoMoji</Link>}
              </Navbar>
              <div>
                <Route path="/" exact component={Home} />
                {primaryMoji && (
                  <Route path="/solomoji" exact component={Mojis} />
                )}

                {primaryMoji && (
                  <Route
                    path="/duomoji"
                    exact
                    render={() => <Mojis isFriendMoji={true} />}
                  />
                )}
              </div>
            </RouterContainer>
          </Router>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
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
