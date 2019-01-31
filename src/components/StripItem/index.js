import React, { Component } from "react";

import styled from "styled-components/macro";

import { Icon, Button, Input } from "semantic-ui-react";

import { connect } from "react-redux";

import {
  removeFromComicStrip,
  updateComicText
} from "../ComicStripBadge/ducks";

const StripImage = styled.img`
  width: 100%;
  display: none;
`;

const Deletebutton = styled(Button)`
  position: absolute;
  opacity: 0.7 !important;
  align-self: flex-start;
  margin-top: -10px !important;
  margin-left: 10px !important;
  display: none;
  cursor: default !important;
  :hover {
    background-color: #1b1c1d !important;
  }
`;

const StripContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  img {
    margin: -23px;
  }

  button > * {
    pointer-events: none;
  }
`;

const MoveButton = styled(Icon)`
  position: absolute;
  opacity: 0.7 !important;
  margin-top: -10px !important;
  align-self: flex-end;
  margin-left: -10px !important;
  display: none;
`;

const ComicText = styled(Input)`
  position: relative;
  top: -30px;
  width: 95% !important;

  input {
    background-color: rgba(0, 0, 0, 0) !important;
    text-align: center !important;
    color: white !important;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
    text-transform: uppercase;
    font-size: 1.4em;
  }
`;

class StripItem extends Component {
  state = {
    showInput: true
  };

  imageLoaded = () => {
    this.setState({
      loaded: true
    });
  };

  removePanel = key => {
    this.props.removeFromComicStripLocal(key);
  };

  handleChange = (e, { id, name, value }) => {
    this.setState({
      [name]: value
    });

    console.log(e.target.value);

    this.props.updateComicTextLocal(this.props.id, value);
  };

  getTextValue = () => {
    for (let i = 0; i < this.props.comicStrip.length; i++) {
      if (this.props.comicStrip[i].uniqueIdentifier === this.props.id) {
        return this.props.comicStrip[i].text;
      }
    }
  };

  render() {
    const { url, id, processingComicStrip } = this.props;
    const { loaded } = this.state;
    return (
      <StripContainer>
        <Deletebutton
          circular
          onClick={() => this.removePanel(id)}
          style={!loaded ? { display: "none" } : null}
          color="black"
          icon="trash"
          size="large"
        />
        <StripImage
          src={url}
          alt=""
          onLoad={this.imageLoaded}
          style={loaded && { display: "block" }}
        />
        <ComicText
          id={id}
          maxLength={18}
          onChange={this.handleChange}
          name="inputtedText"
          value={this.getTextValue()}
          disabled={processingComicStrip}
          placeholder="Comic Text"
          ref={input => {
            this.bottomTextInput = input;
          }}
          style={!loaded ? { display: "none" } : null}
          className="custom-font"
        />
        <MoveButton name="move" size="large" circular color="black" inverted />
      </StripContainer>
    );
  }
}

const mapStateToProps = state => ({
  comicStrip: state.comicStrip.comicStrip,
  processingComicStrip: state.comicStrip.processingComicStrip
});

const mapDispatchToProps = dispatch => ({
  removeFromComicStripLocal: uniqueIdentifier =>
    dispatch(removeFromComicStrip(uniqueIdentifier)),
  updateComicTextLocal: (uniqueIdentifier, text) =>
    dispatch(updateComicText(uniqueIdentifier, text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripItem);
