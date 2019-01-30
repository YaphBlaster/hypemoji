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

import { CopyToClipboard } from "react-copy-to-clipboard";

import { toast } from "react-toastify";

import StripItem from "../../components/StripItem";

const SortableItem = SortableElement(({ value, id, text }) => (
  <StripItem url={value} id={id} text={text} />
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => {
        const { url, uniqueIdentifier, text } = value;
        return (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={url}
            id={uniqueIdentifier}
            text={text}
          />
        );
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

const StyledSortableContainer = styled(SortableList)`
  width: 10% !important;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 10px !important;
  }

  @media screen and (max-width: 420px) {
    flex-direction: column;

    button {
      margin: 10px !important;
    }
  }
  transition: 0.3s all;
`;

class ComicStrip extends Component {
  state = {
    creatingComic: false
  };

  createComic = async () => {
    this.setState({
      creatingComic: true
    });
    const { comicStrip } = this.props;
    const response = await axios.post(createComicAPI, comicStrip);
    const processedComicURL = response.data.body;

    this.setState({
      processedComicURL,
      creatingComic: false
    });

    toast.info("Created Comic Strip!");
    this.clear();
  };

  clear = () => {
    const { clearComicStripLocal } = this.props;
    clearComicStripLocal();
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return;

    this.props.moveComicPanelLocal(oldIndex, newIndex);
  };

  copyLink = () => {
    toast.info("Copied To Clipboard!");
  };

  render() {
    const { comicStrip } = this.props;
    const { creatingComic, processedComicURL } = this.state;
    return (
      <div>
        <div>
          {comicStrip.length <= 0 &&
            !processedComicURL &&
            "Nothing here yet, add some comic panels!"}
        </div>
        <ComicStripList>
          {comicStrip.length > 0 && !processedComicURL && (
            <Strip>
              <StyledSortableContainer
                items={comicStrip}
                onSortEnd={this.onSortEnd}
              />
            </Strip>
          )}

          {processedComicURL && (
            <Strip>
              <StripImage src={processedComicURL} alt="" />
            </Strip>
          )}
        </ComicStripList>

        {comicStrip.length > 0 && !processedComicURL && (
          <ButtonsContainer>
            <Button
              onClick={this.clear}
              disabled={creatingComic}
              content="Clear Comic Strip"
              secondary
            />
            <Button
              onClick={this.createComic}
              loading={creatingComic}
              disabled={creatingComic}
              content="Create Comic Strip"
              secondary
            />
          </ButtonsContainer>
        )}
        {processedComicURL && (
          <CopyToClipboard text={processedComicURL} onCopy={this.copyLink}>
            <Button content="Copy To Clipboard" inverted color="teal" />
          </CopyToClipboard>
        )}
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
