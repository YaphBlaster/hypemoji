import React, { Component } from "react";

import { bitmojiApi } from "../../data/variables";

import axios from "axios";

import Loader from "react-loaders";

import { connect } from "react-redux";

import styled from "styled-components/macro";

import { Pagination, Icon } from "semantic-ui-react";

// Bitmoji Image
import MojiImage from "../../components/MojiImage";

const ImageGrid = styled.div`
  display: grid;
  max-width: 800px;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  margin: 0 auto;
  grid-gap: 50px;
  width: 100%;
`;

const LoaderContainer = styled(Loader)`
  display: flex;
  align-items: center;
  justify-content: center;
  zoom: 1.5;
  margin-top: 100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaginationContainer = styled(Pagination)`
  align-self: center;
`;

class Mojis extends Component {
  state = {
    loaded: false,
    start: 0,
    activePage: 1
  };

  componentDidMount() {
    this.getTemplateMojis();
  }

  getTemplateMojis = async () => {
    const response = await axios.get(bitmojiApi);
    const { friends, imoji } = response.data;

    this.setState({
      loaded: true,
      soloMojis: imoji,
      duoMojis: friends
    });

    console.log(response);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({
      activePage,
      start: (activePage - 1) * 25
    });
  };

  render() {
    const { loaded, soloMojis, duoMojis, start } = this.state;
    const { primaryMoji, isFriendMoji } = this.props;

    let mojis = soloMojis;

    if (isFriendMoji) {
      mojis = duoMojis;
    }

    return loaded ? (
      <Container>
        <ImageGrid>
          {mojis.slice(start, start + 25).map((moji, index) => {
            let { src } = moji;
            src = src.replace(/%s/, primaryMoji);
            src = src.replace(/%s/, primaryMoji);
            return <MojiImage source={src} key={index} />;
          })}
        </ImageGrid>
        <PaginationContainer
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={{ content: <Icon name="angle double left" />, icon: true }}
          lastItem={{ content: <Icon name="angle double right" />, icon: true }}
          prevItem={{ content: <Icon name="angle left" />, icon: true }}
          nextItem={{ content: <Icon name="angle right" />, icon: true }}
          siblingRange={1}
          secondary
          totalPages={Math.ceil(mojis.length / 25)}
          onPageChange={this.handlePaginationChange}
        />
      </Container>
    ) : (
      <LoaderContainer type="pacman" active />
    );
  }
}

const mapStateToProps = state => ({
  primaryMoji: state.mojiModal.primaryMoji
});

export default connect(
  mapStateToProps,
  null
)(Mojis);
