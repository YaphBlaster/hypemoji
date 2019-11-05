import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPrimaryMoji, setSecondaryMoji } from '../../components/Modal/ducks';

export const useSetPrimaryMoji = () => {
  const dispatch = useDispatch();
  return useCallback(
    bitmojiId => {
      dispatch(setPrimaryMoji(bitmojiId));
    },
    [dispatch]
  );
};

export const useSetSecondaryMoji = () => {
  const dispatch = useDispatch();

  return useCallback(
    bitmojiId => {
      dispatch(setSecondaryMoji(bitmojiId));
    },
    [dispatch]
  );
};
