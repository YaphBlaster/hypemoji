import React, { Component } from "react";

import ResponsiveModal from "react-responsive-modal";

class Modal extends Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;

    return (
      <div>
        <button onClick={this.onOpenModal}>Open modal</button>
        <ResponsiveModal open={open} onClose={this.onCloseModal} center>
          <h2>Simple centered modal</h2>
        </ResponsiveModal>
      </div>
    );
  }
}

export default Modal;
