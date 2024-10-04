import { store } from "@wordpress/interactivity";

const getUrlScope = (_url) => {
  const url = new URL(_url); // https://playground.wordpress.net/scope:0.6413659246282131/
  const baseUrl = url.origin;
  const path = url.pathname;
  const scopeMatch = path.match(/scope:[^/]+/);
  return {
    baseUrl,
    scope: scopeMatch ? scopeMatch[0] : null,
  };
};
const { state } = store("router-2f43f8", {
  state: {
    baseUrl: "",
    urlRegionDisplay: window.location.href,
    get urlRegionDisplaySlug() {
      const { pathname } = new URL(state.urlRegionDisplay);
      return pathname.split("/").filter(Boolean).pop() || "";
    },
  },
  callbacks: {
    setBaseUrl: () => {
      const { baseUrl, scope } = getUrlScope(window.location.href);
      state.baseUrl = baseUrl;
      if (scope) {
        state.baseUrl += `/${scope}/`;
      }
    },
  },
  actions: {
    *navigate(e) {
      e.preventDefault();
      const { actions } = yield import("@wordpress/interactivity-router");
      state.urlRegionDisplay = e.target.href;
      const urlToNavigatePlayground =
        state.baseUrl + state.urlRegionDisplaySlug;

      //yield actions.navigate( state.urlRegionDisplaySlug );
      yield actions.navigate(urlToNavigatePlayground);
    },
  },
});
