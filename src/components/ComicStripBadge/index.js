import React, { Component } from "react";
import { Icon, Label, Menu } from "semantic-ui-react";

import { connect } from "react-redux";

import styled from "styled-components/macro";

import posed from "react-pose";

import { isMobileDevice } from "../../data/variables";

import { Link } from "react-router-dom";

const PopAndHover = posed.div({
  pressable: true,
  hoverable: isMobileDevice() ? false : true,
  init: { scale: 1 },
  press: { scale: 1.1 },
  hover: {
    scale: 1.4
  }
});

const Badge = styled(PopAndHover)`
  position: absolute !important;
  align-self: flex-end;
  margin-top: -5px !important;
  margin-left: 20px !important;
`;

const BadgeContent = styled.div`
  display: flex;
  @media screen and (min-width: 400px) {
    div,
    i {
      font-size: 1.5em !important;
    }
  }
  transition: 0.3s all;
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
      <Badge>
        <Label color="teal" size="medium" pointing as={Link} to="/comic-strip">
          <BadgeContent>
            <Icon name="film" />
            <Label.Detail>
              {Object.keys(this.props.comicStrip).length}
            </Label.Detail>
          </BadgeContent>
        </Label>
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
