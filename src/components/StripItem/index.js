import React, { Component } from "react";

import styled from "styled-components/macro";

import { Icon, Button } from "semantic-ui-react";

import { connect } from "react-redux";

import { removeFromComicStrip } from "../ComicStripBadge/ducks";

const StripImage = styled.img`
  width: 100%;
  display: none;
`;

const Deletebutton = styled(Button)`
  position: absolute;
  opacity: 0.7 !important;
  align-self: flex-start;
  margin-top: 10px !important;
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
  img {
    margin: 3px;
  }

  button > * {
    pointer-events: none;
  }
`;

const MoveButton = styled(Icon)`
  position: absolute;
  opacity: 0.7 !important;
  align-self: flex-end;
  margin-top: 10px !important;
  margin-left: -10px !important;
  display: none;
`;

class StripItem extends Component {
  state = {};

  imageLoaded = () => {
    this.setState({
      loaded: true
    });
  };

  removePanel = key => {
    this.props.removeFromComicStripLocal(key);
  };

  render() {
    const { url, id } = this.props;
    const { loaded } = this.state;
    return (
      <div>
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
        </StripContainer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeFromComicStripLocal: uniqueIdentifier =>
    dispatch(removeFromComicStrip(uniqueIdentifier))
});

export default connect(
  null,
  mapDispatchToProps
)(StripItem);
