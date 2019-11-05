const baseApi = 'https://u2zu393kca.execute-api.us-west-2.amazonaws.com/dev';
export const createComicAPI = `${baseApi}/createComic`;
export const getMojisApi = `${baseApi}/getComics`;

export const yaphmoji = '775991c0-e4ac-4b90-8bd2-6ac44e655e3f';
export const travmoji = '55465052-4fcc-40db-91a8-ad75e1162dc5';

export const isMobileDevice = () => {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
};
