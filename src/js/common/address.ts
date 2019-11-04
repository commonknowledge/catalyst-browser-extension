export const isTwitter = (_url: string) => {
  const url = new URL(_url);
  return url.hostname.includes("twitter.co");
};

export const isFacebook = (_url: string) => {
  const url = new URL(_url);
  return url.hostname.includes("facebook.co");
};

export const isYoutube = (_url: string) => {
  const url = new URL(_url);
  return url.hostname.includes("youtube.co");
};

export const isLinkedin = (_url: string) => {
  const url = new URL(_url);
  return url.hostname.includes("linkedin.co");
};

export const isGoogleSearch = (_url: string) => {
  const url = new URL(_url);
  return (
    url.hostname.includes("google.co") && url.pathname.startsWith("/search")
  );
};

export const isGoogleMaps = (_url: string) => {
  const url = new URL(_url);
  return url.hostname.includes("google.co") && url.pathname.startsWith("/map");
};

export const isUrlMatch = (url1: string, url2: string) => {
  if (url1 === url2) return true;
  const u1 = new URL(url1);
  const u2 = new URL(url2);
  if (u1.hostname + u1.pathname === u2.hostname + u2.pathname) return true;
  return false;
};
