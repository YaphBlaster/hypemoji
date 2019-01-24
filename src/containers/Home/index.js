import React, { Component } from "react";

import { Form, Button } from "semantic-ui-react";

import Modal from "react-responsive-modal";

import styled from "styled-components/macro";

import { toast } from "react-toastify";

const UserPrompt = styled.div`
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

class index extends Component {
  state = {
    url: `https://render.bitstrips.com/v2/cpanel/1d94da02-6431-445d-83b1-193712b6f689-775991c0-e4ac-4b90-8bd2-6ac44e655e3f-v1.png?transparent=1&palette=1`,
    open: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { url } = this.state;

    if (!url) {
      return;
    }

    const bitmojiID = url
      .split("-")
      .slice(5, 10)
      .join("-");
    const templateURL = `https://render.bitstrips.com/v2/cpanel/0343a55f-9c3d-4cae-b54f-483cd99a2223-${bitmojiID}-v1.png?transparent=1&palette=1`;

    this.checkImageURL(templateURL, bitmojiID);
  };

  checkImageURL = (mojiURL, bitmojiID) => {
    var tester = new Image();
    tester.onload = () =>
      this.setState({
        mojiURL,
        bitmojiID,
        open: true
      });
    tester.onerror = () => toast.error(`Bitmoji not found :(`);
    tester.src = mojiURL;
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { url, open, mojiURL, bitmojiID } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.TextArea
              placeholder="Bitmoji URL"
              name="url"
              value={url}
              onChange={this.handleChange}
              autoHeight
            />
          </Form.Group>
          <Form.Button
            content="Find Moji"
            disabled={url.trim().length > 0 ? false : true}
          />
        </Form>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          blockScroll
          styles={{ modal: { borderRadius: "3%" } }}
        >
          <img src={mojiURL} alt="" />
          <UserPrompt>Is this you?</UserPrompt>
          <ButtonGroup>
            <Button onClick={this.onCloseModal}>No</Button>
            <Button>Yes</Button>
          </ButtonGroup>
        </Modal>
      </div>
    );
  }
}

export default index;
