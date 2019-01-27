import React, { Component } from "react";

import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

import axios from "axios";

import { createComicAPI } from "../../data/variables";

import styled from "styled-components/macro";

const Strip = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  width: 90%;
  max-width: 400px;
`;

const StripImage = styled.img`
  width: 100%;
`;

class ComicStrip extends Component {
  state = {};

  componentDidMount() {
    const { comicStrip } = this.props;
    const numberOfComics = Object.keys(comicStrip).length;
    if (numberOfComics) {
      this.setState({
        hasComicStrips: true
      });
    }
  }

  createComic = async () => {
    const { comicStrip } = this.props;

    console.log(comicStrip);
  };

  render() {
    const { comicStrip } = this.props;
    const { hasComicStrips } = this.state;
    return (
      <div>
        <div>{Object.keys(comicStrip).length <= 0 && "Nothing here"}</div>
        {hasComicStrips && (
          <Strip>
            {Object.keys(comicStrip).map((comicKey, index) => {
              const { url, key, comicID, text } = comicStrip[comicKey];

              return <StripImage src={url} alt="" key={index} />;
            })}
          </Strip>
        )}
        <Button onClick={this.createComic} content="Create Comic" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comicStrip: state.comicStrip.comicStrip
});

export default connect(
  mapStateToProps,
  null
)(ComicStrip);
