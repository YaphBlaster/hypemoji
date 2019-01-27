import React, { Component } from "react";
import { Icon, Label, Menu } from "semantic-ui-react";

import { connect } from "react-redux";

import styled from "styled-components/macro";

const Badge = styled(Label)`
  position: absolute;
  align-self: flex-end;
  margin-top: 10px !important;
  margin-left: 20px !important;
`;

class ComicStripBadge extends Component {
  state = {};

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 500);
  }

  render() {
    return (
      <Badge color="red" circular size="medium">
        <Icon name="film" />
        {Object.keys(this.props.comicStrip).length}
      </Badge>
    );
  }
}

const mapStateToProps = state => ({
  comicStrip: state.comicStrip.comicStrip
});

export default connect(
  mapStateToProps,
  null
)(ComicStripBadge);
