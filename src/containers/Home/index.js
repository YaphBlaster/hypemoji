import React, { Component } from "react";

import { Form } from "semantic-ui-react";

import Modal from "../../components/Modal";

import { toast } from "react-toastify";

import { connect } from "react-redux";
import { setPrimaryMoji, setSecondaryMoji } from "../../components/Modal/ducks";
import { yaphmoji, travmoji } from "../../data/variables";

import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styled from "styled-components/macro";

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-color: #282c34;
`;

const FormContainer = styled(Form)`
  width: 90% !important;
  max-width: 700px !important;
`;

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
    this.setState({ loading: true });
    const tester = new Image();
    tester.onload = () =>
      this.setState({
        mojiURL,
        bitmojiID,
        open: true,
        loading: false
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

  skipSetup = () => {
    this.props.setPrimaryMojiLocal(yaphmoji);
    this.props.setSecondaryMojiLocal(travmoji);
  };

  render() {
    const { url, open, mojiURL, bitmojiID, loading } = this.state;
    const { primaryMoji } = this.props;

    return (
      <HomeContainer>
        <FormContainer onSubmit={this.handleSubmit}>
          <Form.TextArea
            placeholder="Bitmoji URL"
            name="url"
            value={url}
            onChange={this.handleChange}
            autoHeight
            disabled={loading}
            style={{ minHeight: 150 }}
          />
          <Form.Button
            content={primaryMoji ? "Reset Mojis" : "Find Moji"}
            disabled={url.trim().length > 0 || loading ? false : true}
            loading={loading}
          />
        </FormContainer>
        <Modal
          open={open}
          onCloseModal={this.onCloseModal}
          mojiURL={mojiURL}
          mojiID={bitmojiID}
        />
        {!primaryMoji && (
          <Button
            as={Link}
            to="/solomoji"
            onClick={this.skipSetup}
            content="Skip this step"
          />
        )}
      </HomeContainer>
    );
  }
}

const mapStateToProps = state => ({
  primaryMoji: state.mojiModal.primaryMoji
});

const mapDispatchToProps = dispatch => ({
  setPrimaryMojiLocal: mojiID => dispatch(setPrimaryMoji(mojiID)),
  setSecondaryMojiLocal: mojiID => dispatch(setSecondaryMoji(mojiID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
