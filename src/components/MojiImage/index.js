import React, { Component } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import styled from "styled-components/macro";

import { toast } from "react-toastify";

import posed from "react-pose";

import { Icon } from "semantic-ui-react";

import { connect } from "react-redux";
import { addToComicStrip } from "../ComicStripBadge/ducks";

const Image = styled.img`
  width: 100%;
  border-radius: 15px;
  border-top: 2px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
  display: none;
`;

const PopBox = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 1.1 }
});

const PopBoxStyled = styled(PopBox)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const AddButton = styled(Icon)`
  position: absolute;
  opacity: 0.7 !important;
  align-self: flex-end;
  margin-top: 10px !important;
  margin-left: -10px !important;
  display: none;
`;

class MojiImage extends Component {
  state = {};

  copyLink = () => {
    toast.info("Copied To Clipboard!");
  };

  addToList = (comicURL, comicID) => {
    const { comicStrip } = this.props;

    if (comicStrip.length >= 10) {
      toast.error("Comic Strip Full");
    } else {
      const key = Math.floor(Math.random() * 100000000) + 1;
      this.props.addToComicStripLocal(comicURL, comicID, key);
      toast.info("Added To Comic Strip!");
    }
  };

  imageLoaded = () => {
    this.setState({
      loaded: true
    });
  };

  render() {
    const { source, comicID } = this.props;
    const { loaded } = this.state;
    const editedURL = source.replace("transparent=1&", "");
    return (
      <PopBoxStyled>
        <CopyToClipboard text={editedURL} onCopy={this.copyLink}>
          <Image
            src={source}
            onLoad={this.imageLoaded}
            style={loaded ? { display: "block" } : null}
          />
        </CopyToClipboard>
        <AddButton
          name="plus"
          inverted
          circular
          onClick={() => this.addToList(editedURL, comicID)}
          size="large"
          style={loaded ? { display: "block " } : null}
        />
      </PopBoxStyled>
    );
  }
}

const mapStateToProps = state => ({
  comicStrip: state.comicStrip.comicStrip
});

const mapDispatchToProps = dispatch => ({
  addToComicStripLocal: (comicURL, comicIC, uniqueIdentifier) =>
    dispatch(addToComicStrip(comicURL, comicIC, uniqueIdentifier))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MojiImage);
