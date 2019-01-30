const proxy = "https://cors.io/?";
const baseApi = " https://5w5dba1ov8.execute-api.us-west-2.amazonaws.com/prod";
export const bitmojiApi = `${proxy}https://api.bitmoji.com/content/templates`;
export const createComicAPI = `${baseApi}/createcomic`;
export const getMojisApi = `${baseApi}/getmojis`;

export const yaphmoji = "775991c0-e4ac-4b90-8bd2-6ac44e655e3f";
export const travmoji = "55465052-4fcc-40db-91a8-ad75e1162dc5";

export const isMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
};
