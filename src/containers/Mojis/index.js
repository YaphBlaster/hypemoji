import React, { Component } from "react";

import { getMojisApi } from "../../data/variables";

import axios from "axios";

import Loader from "react-loaders";

import { connect } from "react-redux";
import { setPrimaryMoji, setSecondaryMoji } from "../../components/Modal/ducks";
import { setMojiObjects } from "./ducks";

import styled from "styled-components/macro";

import { Pagination, Icon, Button, Input } from "semantic-ui-react";

// Bitmoji Image
import MojiImage from "../../components/MojiImage";

import OnImagesLoaded from "react-on-images-loaded";

const SPACING = "40px";
const ImageGrid = styled.div`
  display: grid;
  max-width: 865px;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  margin: 0 auto;
  grid-gap: ${SPACING};
  width: 100%;
  margin-top: 20px;
  margin-bottom: ${SPACING};
  padding: 25px;
`;

const LoaderContainer = styled(Loader)`
  display: flex;
  align-items: center;
  justify-content: center;
  zoom: 1.5;
  padding: 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaginationContainer = styled(Pagination)`
  align-self: center;
  a {
    color: white !important;
    text-align: center;
  }
`;

const SwitchButton = styled(Button)`
  width: 80px;
  align-self: center;
  margin: 5px !important;
`;

const SearchBar = styled(Input)`
  width: 80%;
  max-width: 300px;
  align-self: center;
  margin: 10px;
`;

class Mojis extends Component {
  state = {
    loaded: false,
    start: 0,
    activePage: 1,
    searchTerm: ""
  };

  componentDidMount() {
    const { soloMojis, duoMojis, isFriendMoji } = this.props;

    if (soloMojis && duoMojis && isFriendMoji) {
      this.setState({
        mojis: duoMojis,
        originalMojis: duoMojis,
        loadedMojis: true
      });
    } else if (soloMojis && duoMojis) {
      this.setState({
        mojis: soloMojis,
        originalMojis: soloMojis,
        loadedMojis: true
      });
    } else {
      this.getTemplateMojis();
    }
  }

  getTemplateMojis = async () => {
    const response = await axios.get(getMojisApi);
    const { friends, imoji } = response.data.body;

    const { isFriendMoji } = this.props;

    let soloMojiObject = {};
    let duoMojiObject = {};
    let mojiObject = {};

    imoji.forEach(moji => {
      if (!soloMojiObject[moji.comic_id]) {
        soloMojiObject[moji.comic_id] = moji;
      }
    });

    friends.forEach(moji => {
      if (!duoMojiObject[moji.comic_id]) {
        duoMojiObject[moji.comic_id] = moji;
      }
    });

    if (isFriendMoji) {
      mojiObject = duoMojiObject;
    } else {
      mojiObject = soloMojiObject;
    }

    this.setState({
      mojis: mojiObject,
      originalMojis: mojiObject,
      loadedMojis: true
    });

    this.props.setMojiObjectsLocal(soloMojiObject, duoMojiObject);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({
      activePage,
      start: (activePage - 1) * 25
    });
  };

  switchMojis = () => {
    const newPrimary = this.props.secondaryMoji;
    const newSecondary = this.props.primaryMoji;

    this.props.setPrimaryMojiLocal(newPrimary);
    this.props.setSecondaryMojiLocal(newSecondary);
  };

  searchMojis = (event, { name, value }) => {
    this.setState({
      [name]: value.toLowerCase(),
      activePage: 1,
      start: (this.state.activePage - 1) * 25
    });

    this.getSearchText(value);
  };

  getSearchText = searchTerm => {
    const lowerText = searchTerm.toLowerCase();
    const { originalMojis } = this.state;

    let newMojis = [];

    Object.values(originalMojis).forEach(moji => {
      for (let tag of moji.tags) {
        if (tag.includes(lowerText)) {
          newMojis.push(moji);
          break;
        }
      }
    });
    this.setState({ mojis: newMojis });
  };

  clear = event => {
    this.setState({ searchTerm: "" });
    this.searchMojis(event, { name: "searchTerm", value: "" });
  };

  render() {
    const { loadedMojis, start, mojis, searchTerm, imagesLoaded } = this.state;
    const { primaryMoji, secondaryMoji, isFriendMoji } = this.props;

    return loadedMojis && mojis ? (
      <Container>
        {secondaryMoji && imagesLoaded && (
          <SwitchButton
            basic
            color="teal"
            content="switch"
            onClick={this.switchMojis}
          />
        )}

        {imagesLoaded && (
          <SearchBar
            onChange={this.searchMojis}
            name="searchTerm"
            value={searchTerm}
            label={<Button icon="x" color="teal" onClick={this.clear} />}
            labelPosition="right"
          />
        )}

        <OnImagesLoaded
          onLoaded={() => this.setState({ imagesLoaded: true })}
          timeout={7000}
        >
          <ImageGrid style={!imagesLoaded ? { display: "none" } : null}>
            {Object.values(mojis)
              .slice(start, start + 25)
              .map((moji, index) => {
                let { src, comic_id } = moji;
                src = src.replace(/%s/, primaryMoji);
                if (isFriendMoji && secondaryMoji) {
                  src = src.replace(/%s/, secondaryMoji);
                } else if (isFriendMoji && !secondaryMoji) {
                  src = src.replace(/%s/, primaryMoji);
                }
                return (
                  <MojiImage source={src} key={index} comicID={comic_id} />
                );
              })}
          </ImageGrid>
          {!imagesLoaded && <LoaderContainer type="pacman" active />}
        </OnImagesLoaded>
        {imagesLoaded && (
          <PaginationContainer
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={{
              content: <Icon name="angle double left" />,
              icon: true
            }}
            lastItem={{
              content: <Icon name="angle double right" />,
              icon: true
            }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            siblingRange={1}
            totalPages={Math.ceil(Object.values(mojis).length / 25)}
            onPageChange={this.handlePaginationChange}
            secondary
          />
        )}
      </Container>
    ) : (
      <LoaderContainer type="pacman" active />
    );
  }
}

const mapStateToProps = state => ({
  primaryMoji: state.mojiModal.primaryMoji,
  secondaryMoji: state.mojiModal.secondaryMoji,
  soloMojis: state.mojiObjects.soloMojis,
  duoMojis: state.mojiObjects.duoMojis
});

const mapDispatchToProps = dispatch => ({
  setPrimaryMojiLocal: mojiID => dispatch(setPrimaryMoji(mojiID)),
  setSecondaryMojiLocal: mojiID => dispatch(setSecondaryMoji(mojiID)),
  setMojiObjectsLocal: (soloMojisObject, duoMojisObject) =>
    dispatch(setMojiObjects(soloMojisObject, duoMojisObject))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mojis);
