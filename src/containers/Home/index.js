import React, { Component } from "react";

import { Form } from "semantic-ui-react";

import Modal from "../../components/Modal";

import { toast } from "react-toastify";

class Home extends Component {
  state = {
    url: `https://render.bitstrips.com/v2/cpanel/1d94da02-6431-445d-83b1-193712b6f689-775991c0-e4ac-4b90-8bd2-6ac44e655e3f-v1.png?transparent=1&palette=1`,
    open: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    this.setState({ loading: true });
    const { url } = this.state;
    const bitmojiID = url
      .split("-")
      .slice(5, 10)
      .join("-");
    const templateURL = `https://render.bitstrips.com/v2/cpanel/0343a55f-9c3d-4cae-b54f-483cd99a2223-${bitmojiID}-v1.png?transparent=1&palette=1`;

    this.checkImageURL(templateURL, bitmojiID);
  };

  checkImageURL = (mojiURL, bitmojiID) => {
    const tester = new Image();
    tester.onload = () =>
      this.setState({
        mojiURL,
        bitmojiID,
        open: true,
        loading: true
      });
    tester.onerror = this.errorLoadingMoji;
    tester.src = mojiURL;
  };

  errorLoadingMoji = () => {
    toast.error(`Bitmoji not found :(`);
    this.setState({ loading: false });
  };
  onCloseModal = () => {
    this.setState({ open: false, loading: false });
  };

  render() {
    const { url, open, mojiURL, bitmojiID, loading } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea
            placeholder="Bitmoji URL"
            name="url"
            value={url}
            onChange={this.handleChange}
            autoHeight
            disabled={loading}
          />
          <Form.Button
            content="Find Moji"
            disabled={url.trim().length > 0 || loading ? false : true}
            loading={loading}
          />
        </Form>
        <Modal
          open={open}
          onCloseModal={this.onCloseModal}
          mojiURL={mojiURL}
          primaryID={bitmojiID}
        />
      </div>
    );
  }
}

export default Home;
