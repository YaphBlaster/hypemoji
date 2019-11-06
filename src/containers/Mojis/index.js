import React, { useEffect, useState } from 'react';

import { getMojisApi } from '../../data/variables';

import axios from 'axios';

import Loader from 'react-loaders';

import { useSelector, useDispatch } from 'react-redux';
import {
  setPrimaryMoji,
  setSecondaryMoji,
  primaryMojiSelector,
  secondaryMojiSelector
} from '../../components/Modal/ducks';
import { setMojiObjects, soloMojisSelector, duoMojisSelector } from './ducks';

import styled from 'styled-components/macro';

import { Pagination, Icon, Button, Input } from 'semantic-ui-react';

// Bitmoji Image
import MojiImage from '../../components/MojiImage';

import OnImagesLoaded from 'react-on-images-loaded';

const SPACING = '40px';
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

const Mojis = ({ isFriendMoji }) => {
  const [loadedMojis, setLoadedMojis] = useState(false);
  const [mojis, setMojis] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [start, setStart] = useState(0);
  const [activatePage, setActivatePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalMojis, setOriginalMojis] = useState(null);
  const soloMojis = useSelector(soloMojisSelector);
  const duoMojis = useSelector(duoMojisSelector);
  const primaryMoji = useSelector(primaryMojiSelector);
  const secondaryMoji = useSelector(secondaryMojiSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTemplateMojis = async () => {
      const response = await axios.get(getMojisApi);
      const { friends, imoji } = response.data.body;

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

      setMojis(mojiObject);
      setOriginalMojis(mojiObject);
      setLoadedMojis(true);

      dispatch(setMojiObjects(soloMojiObject, duoMojiObject));
    };

    if (soloMojis && duoMojis && isFriendMoji) {
      setMojis(duoMojis);
      setOriginalMojis(duoMojis);
      setLoadedMojis(true);
    } else if (soloMojis && duoMojis) {
      setMojis(soloMojis);
      setOriginalMojis(soloMojis);
      setLoadedMojis(true);
    } else {
      getTemplateMojis();
    }
  }, [dispatch, duoMojis, isFriendMoji, loadedMojis, soloMojis]);

  const handlePaginationChange = (e, { activePage }) => {
    setActivatePage(activePage);
    setStart((activatePage - 1) * 25);
  };

  const switchMojis = () => {
    const newPrimary = secondaryMoji;
    const newSecondary = primaryMoji;

    dispatch(setPrimaryMoji(newPrimary));
    dispatch(setSecondaryMoji(newSecondary));
  };

  const searchMojis = (event, { name, value }) => {
    setSearchTerm(value.toLowerCase());
    setActivatePage(1);
    setStart((activatePage - 1) * 25);

    getSearchText(value);
  };

  const getSearchText = searchTerm => {
    const lowerText = searchTerm.toLowerCase();

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

  const clear = event => {
    setSearchTerm('');
    searchMojis(event, { name: 'searchTerm', value: '' });
  };

  return loadedMojis && mojis ? (
    <Container>
      {secondaryMoji && imagesLoaded && (
        <SwitchButton
          basic
          color='teal'
          content='switch'
          onClick={switchMojis}
        />
      )}

      {imagesLoaded && (
        <SearchBar
          onChange={searchMojis}
          name='searchTerm'
          value={searchTerm}
          label={<Button icon='x' color='teal' onClick={clear} />}
          labelPosition='right'
        />
      )}

      <OnImagesLoaded onLoaded={() => setImagesLoaded(true)} timeout={7000}>
        <ImageGrid style={!imagesLoaded ? { display: 'none' } : null}>
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
              return <MojiImage source={src} key={index} comicID={comic_id} />;
            })}
        </ImageGrid>
        {!imagesLoaded && <LoaderContainer type='pacman' active />}
      </OnImagesLoaded>
      {imagesLoaded && (
        <PaginationContainer
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={{
            content: <Icon name='angle double left' />,
            icon: true
          }}
          lastItem={{
            content: <Icon name='angle double right' />,
            icon: true
          }}
          prevItem={{ content: <Icon name='angle left' />, icon: true }}
          nextItem={{ content: <Icon name='angle right' />, icon: true }}
          siblingRange={1}
          totalPages={Math.ceil(Object.values(mojis).length / 25)}
          onPageChange={handlePaginationChange}
          secondary
        />
      )}
    </Container>
  ) : (
    <LoaderContainer type='pacman' active />
  );
};

export default Mojis;
