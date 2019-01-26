import React, { Component } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import styled from "styled-components/macro";

import { toast } from "react-toastify";

import posed from "react-pose";

import { isMobileDevice } from "../../data/variables";

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

const HoverBox = posed.div({
  hoverable: isMobileDevice() ? false : true,
  init: { scale: 1 },
  hover: { scale: 0.95 }
});

class MojiImage extends Component {
  state = {};

  copyLink = () => {
    toast.info("Copied To Clipboard!");
  };

  imageLoaded = () => {
    this.setState({
      loaded: true
    });
  };

  render() {
    const { source } = this.props;
    const { loaded } = this.state;
    return (
      <PopBox>
        <CopyToClipboard
          text={source.replace("transparent=1&", "")}
          onCopy={this.copyLink}
        >
          <HoverBox>
            <Image
              src={source}
              onLoad={this.imageLoaded}
              style={loaded && { display: "block" }}
            />
          </HoverBox>
        </CopyToClipboard>
      </PopBox>
    );
  }
}

export default MojiImage;
