import React, { Component } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import styled from "styled-components/macro";

import { toast } from "react-toastify";

import Loader from "react-loaders";

const Image = styled.img`
  width: 100%;
`;

const LoaderContainer = styled(Loader)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

class MojiImage extends Component {
  state = {};

  copyLink = () => {
    toast("Righteous");
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
      <div>
        <CopyToClipboard text={source} onCopy={this.copyLink}>
          <Image src={source} />
        </CopyToClipboard>
      </div>
    );
  }
}

export default MojiImage;
