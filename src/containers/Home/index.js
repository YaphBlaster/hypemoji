import React, { useState } from 'react';

import { Form } from 'semantic-ui-react';

import Modal from '../../components/Modal';

import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';

import { primaryMojiSelector } from '../../components/Modal/ducks';
import { yaphmoji, travmoji } from '../../data/variables';

import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import styled from 'styled-components/macro';

import logo from '../../assets/logo.jpg';

import Loader from 'react-loaders';
import { useSetPrimaryMoji, useSetSecondaryMoji } from './hooks';

const LOGO_WIDTH = '500px';

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #282c34;
  height: 100%;
  > a {
    margin: 15px !important;
  }
`;

const HypeMojiLogo = styled.img`
  max-width: ${LOGO_WIDTH};
  width: 25%;
  border-radius: 15px;
  border-top: 2px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
  align-self: center;
  margin: 40px;
`;

const FormContainer = styled(Form)`
  width: 90% !important;
  max-width: 700px !important;
`;

const LoaderContainer = styled(Loader)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  width: 100%;
  height: 100%;
  max-width: ${LOGO_WIDTH};
  margin-top: 10%;
`;

const StepsList = styled.ul`
  text-align: left;
`;

const Home = () => {
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mojiURL, setMojiURL] = useState('');
  const [bitmojiID, setBitmojiID] = useState('');
  const [logoLoaded, setLogoLoaded] = useState(false);
  const setPrimaryMoji = useSetPrimaryMoji();
  const setSecondaryMoji = useSetSecondaryMoji();
  const primaryMoji = useSelector(primaryMojiSelector);

  const handleChange = (e, { name, value }) => setUrl(value);

  const handleSubmit = () => {
    setLoading(true);
    const bitmojiID = url
      .split('-')
      .slice(5, 10)
      .join('-');
    const templateURL = `https://render.bitstrips.com/v2/cpanel/0343a55f-9c3d-4cae-b54f-483cd99a2223-${bitmojiID}-v1.png?transparent=1&palette=1`;

    checkImageURL(templateURL, bitmojiID);
  };

  const checkImageURL = (mojiURL, bitmojiID) => {
    setLoading(true);
    const tester = new Image();
    tester.onload = () => {
      setMojiURL(mojiURL);
      setBitmojiID(bitmojiID);
      setOpen(true);
      setLoading(true);
    };

    tester.onerror = errorLoadingMoji;
    tester.src = mojiURL;
  };

  const errorLoadingMoji = () => {
    toast.error(`Bitmoji not found :(`);
    setLoading(false);
  };

  const onCloseModal = () => {
    setOpen(false);
    setLoading(false);
  };

  const skipSetup = () => {
    setPrimaryMoji(yaphmoji);
    setSecondaryMoji(travmoji);
  };

  return (
    <HomeContainer>
      {!logoLoaded && <LoaderContainer type='ball-triangle-path' active />}

      <HypeMojiLogo
        src={logo}
        onLoad={() => setLogoLoaded(true)}
        style={logoLoaded ? null : { display: 'none' }}
      />

      {logoLoaded && (
        <div>
          <h2>How To Get Your Bitmoji URL (For Desktop)</h2>
          <StepsList>
            <li>
              Download and install the{' '}
              <a href='https://chrome.google.com/webstore/detail/bitmoji/bfgdeiadkckfbkeigkoncpdieiiefpig?hl=en'>
                Bitmoji Chrome Extension
              </a>
            </li>
            <li>Login with your Snapchat or Bitmoji Account</li>
            <li>Open the Bitmoji Chrome Extension</li>
            <li>
              Right click on any Bitmoji thumbnail and select copy image address
              OR open image in new tab
            </li>
            <li>Copy and paste the URL in the box below</li>
            <li>Click on {primaryMoji ? 'Reset Mojis' : 'Find Moji'}!</li>
          </StepsList>
        </div>
      )}

      {logoLoaded && (
        <FormContainer onSubmit={handleSubmit}>
          <Form.TextArea
            placeholder='Bitmoji URL'
            name='url'
            value={url}
            onChange={handleChange}
            autoHeight
            disabled={loading}
            style={{ minHeight: 150 }}
          />
          <Form.Button
            content={primaryMoji ? 'Reset Mojis' : 'Find Moji'}
            disabled={url.trim().length > 0 || loading ? false : true}
            loading={loading}
          />
        </FormContainer>
      )}

      <Modal
        open={open}
        onCloseModal={onCloseModal}
        mojiURL={mojiURL}
        mojiID={bitmojiID}
      />
      {!primaryMoji && logoLoaded && (
        <Button
          as={Link}
          to='/solomoji'
          onClick={skipSetup}
          content='Skip this step'
        />
      )}
    </HomeContainer>
  );
};

export default Home;
