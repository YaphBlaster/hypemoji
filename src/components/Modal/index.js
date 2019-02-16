import React, { Component } from "react";

import ResponsiveModal from "react-responsive-modal";

import styled from "styled-components/macro";

import { Button } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { setPrimaryMoji, setSecondaryMoji } from "./ducks";

import { Link } from "react-router-dom";

const UserPrompt = styled.div`
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ModalImage = styled.img`
  width: 80%;
  margin: 0 auto;
`;
class Modal extends Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  selectPrimary = () => {
    const { mojiID } = this.props;
    this.props.setPrimaryMojiLocal(mojiID);
    this.props.onCloseModal();
  };

  selectSecondary = () => {
    const { mojiID } = this.props;
    this.props.setSecondaryMojiLocal(mojiID);
    this.props.onCloseModal();
  };

  render() {
    const { open, mojiURL, onCloseModal, mojiID, primaryMoji } = this.props;

    return (
      <ResponsiveModal
        open={open}
        onClose={onCloseModal}
        blockScroll
        styles={{
          modal: {
            borderRadius: "3%",
            display: "grid",
            gridGap: "10px",
            marginTop: "10%",
            overflow: "hidden"
          }
        }}
      >
        <ModalImage src={mojiURL} alt="" />
        <UserPrompt>
          {primaryMoji
            ? "Is this bro/brah primary or secondary?"
            : "Is this you?"}
        </UserPrompt>

        {primaryMoji ? (
          <ButtonGroup>
            <Button onClick={this.selectPrimary}>Primary</Button>
            <Button onClick={this.selectSecondary}>Secondary</Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <Button onClick={onCloseModal}>No</Button>
            <Button
              as={Link}
              to="/solomoji"
              onClick={() => this.props.setPrimaryMojiLocal(mojiID)}
            >
              Yes
            </Button>
          </ButtonGroup>
        )}
      </ResponsiveModal>
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
)(Modal);
