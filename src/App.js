import React, { Component } from "react";
import "./App.css";

import Home from "./containers/Home";
import Mojis from "./containers/Mojis";
import ComicStrip from "./containers/ComicStrip";

// Toasts
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";

import styled from "styled-components/macro";

import { addBackToTop } from "vanilla-back-to-top";

import ComicStripBadge from "./components/ComicStripBadge";

import posed from "react-pose";

import { isMobileDevice } from "./data/variables";

const RouterContainer = styled.div`
  width: 80%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  min-width: 265px;
`;

const Content = styled.div`
  margin-top: 40px;
  margin-bottom: 100px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  justify-content: space-evenly;
  font-size: 1.2em;
  margin-bottom: 10px;
  margin-top: 10px;
  flex-direction: row;

  a {
    color: white;
    margin: 10px;
    text-decoration: none;
    :hover {
      color: white;
    }
  }
`;

const PopAndHover = posed.div({
  pressable: true,
  hoverable: isMobileDevice() ? false : true,
  init: { scale: 1 },
  press: { scale: 1.1 },
  hover: {
    scale: 1.2,
  },
});

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
                <Header>
                  <Navbar>
                    <PopAndHover>
                      <Link to="/solomoji">SoloMoji</Link>
                    </PopAndHover>
                    <PopAndHover>
                      <Link to="/">Home</Link>
                    </PopAndHover>
                    <PopAndHover>
                      <Link to="/duomoji">DuoMoji</Link>
                    </PopAndHover>
                  </Navbar>
                  <ComicStripBadge />
                </Header>
              )}
              {/* <ComicStripBadge /> */}

              <Content>
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
                {primaryMoji && (
                  <Route path="/comic-strip" exact component={ComicStrip} />
                )}
              </Content>
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

const mapStateToProps = (state) => ({
  primaryMoji: state.mojiModal.primaryMoji,
});

export default connect(
  mapStateToProps,
  null
)(App);
