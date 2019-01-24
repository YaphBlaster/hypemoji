import React, { Component } from "react";
import "./App.css";

import Home from "./containers/Home";

// Toasts
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
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

export default App;
