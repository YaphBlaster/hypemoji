import React from 'react';

import ResponsiveModal from 'react-responsive-modal';

import styled from 'styled-components/macro';

import { Button } from 'semantic-ui-react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setPrimaryMoji, setSecondaryMoji, primaryMojiSelector } from './ducks';

import { Link } from 'react-router-dom';

const UserPrompt = styled.div`
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ModalImage = styled.img`
  width: 80%;
  margin: 0 auto;
`;
const Modal = ({ open, onCloseModal, mojiID, mojiURL }) => {
  const primaryMoji = useSelector(primaryMojiSelector);
  const dispatch = useDispatch();

  const selectPrimary = () => {
    dispatch(setPrimaryMoji(mojiID));
    onCloseModal();
  };

  const selectSecondary = () => {
    dispatch(setSecondaryMoji(mojiID));
    onCloseModal();
  };

  return (
    <ResponsiveModal
      open={open}
      onClose={onCloseModal}
      blockScroll
      styles={{
        modal: {
          borderRadius: '3%',
          display: 'grid',
          gridGap: '10px',
          marginTop: '10%',
          overflow: 'hidden'
        }
      }}
    >
      <ModalImage src={mojiURL} alt='' />
      <UserPrompt>
        {primaryMoji
          ? 'Is this bro/brah primary or secondary?'
          : 'Is this you?'}
      </UserPrompt>

      {primaryMoji ? (
        <ButtonGroup>
          <Button onClick={selectPrimary}>Primary</Button>
          <Button onClick={selectSecondary}>Secondary</Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button onClick={onCloseModal}>No</Button>
          <Button
            as={Link}
            to='/solomoji'
            onClick={() => dispatch(setPrimaryMoji(mojiID))}
          >
            Yes
          </Button>
        </ButtonGroup>
      )}
    </ResponsiveModal>
  );
};

export default Modal;
