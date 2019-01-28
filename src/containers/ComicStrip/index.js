import React, { Component } from "react";

import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

import axios from "axios";

import { createComicAPI } from "../../data/variables";

import {
  moveComicPanel,
  clearComicStrip
} from "../../components/ComicStripBadge/ducks";

import styled from "styled-components/macro";

import { SortableContainer, SortableElement } from "react-sortable-hoc";

// const SortableItem = SortableElement(({ value }) => <div>{value}</div>);
const SortableItem = SortableElement(({ value }) => <img src={value} />);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => {
        const { comicID, url, uniqueIdentifier } = value;
        return <SortableItem key={`item-${index}`} index={index} value={url} />;
      })}
    </div>
  );
});

const ComicStripList = styled.div`
  margin-bottom: 40px !important;
`;

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
  state = {
    creatingComic: false
  };

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
    this.setState({
      creatingComic: true
    });
    const { comicStrip, clearComicStripLocal } = this.props;
    const response = await axios.post(createComicAPI, comicStrip);
    const processedComicURL = response.data.body;

    this.setState({
      processedComicURL,
      creatingComic: false
    });

    clearComicStripLocal();
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { moveComicPanelLocal } = this.props;

    moveComicPanelLocal(oldIndex, newIndex);
  };

  render() {
    const { comicStrip } = this.props;
    const { hasComicStrips, creatingComic, processedComicURL } = this.state;
    return (
      <div>
        <div>
          {comicStrip.length <= 0 && !processedComicURL && "Nothing here"}
        </div>
        <ComicStripList>
          {hasComicStrips && !processedComicURL && (
            <SortableList items={comicStrip} onSortEnd={this.onSortEnd} />
          )}

          {processedComicURL && (
            <div>
              <img src={processedComicURL} alt="" />
            </div>
          )}
        </ComicStripList>

        <Button
          onClick={this.createComic}
          loading={creatingComic}
          disabled={creatingComic}
          content="Create Comic"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comicStrip: state.comicStrip.comicStrip
});

const mapDispatchToProps = dispatch => ({
  moveComicPanelLocal: (oldIndex, newIndex) =>
    dispatch(moveComicPanel(oldIndex, newIndex)),
  clearComicStripLocal: () => dispatch(clearComicStrip())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicStrip);
