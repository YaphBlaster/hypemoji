import React, { Component } from "react";

import ResponsiveModal from "react-responsive-modal";

import styled from "styled-components/macro";

import { Button } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { setPrimaryMoji } from "./ducks";

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

  render() {
    const { open, mojiURL, onCloseModal, primaryID } = this.props;

    return (
      <ResponsiveModal
        open={open}
        onClose={onCloseModal}
        center
        blockScroll
        styles={{
          modal: {
            borderRadius: "3%",
            display: "grid",
            gridGap: "10px"
          }
        }}
      >
        <ModalImage src={mojiURL} alt="" />
        <UserPrompt>Is this you?</UserPrompt>
        <ButtonGroup>
          <Button onClick={onCloseModal}>No</Button>
          <Button
            as={Link}
            to="/solomoji"
            onClick={() => this.props.setPrimaryMojiLocal(primaryID)}
          >
            Yes
          </Button>
        </ButtonGroup>
      </ResponsiveModal>
    );
  }
}

const mapStateToProps = state => ({
  primaryMoji: state.mojiModal.primaryMoji
});

const mapDispatchToProps = dispatch => ({
  setPrimaryMojiLocal: mojiID => dispatch(setPrimaryMoji(mojiID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
