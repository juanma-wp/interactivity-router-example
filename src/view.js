import { store } from "@wordpress/interactivity";

const { state } = store("router-2f43f8", {
  state: {
    baseUrl: window.location.href,
    urlRegionDisplay: window.location.href,
    get urlRegionDisplaySlug() {
      const { pathname } = new URL(state.urlRegionDisplay);
      const isHome = pathname === "/";
      return isHome ? "/" : "/" + pathname.split("/").filter(Boolean).pop();
    },
  },
  actions: {
    *navigate(e) {
      e.preventDefault();
      const { actions } = yield import("@wordpress/interactivity-router");
      state.urlRegionDisplay = new URL(e.target.href, state.baseUrl);

      //yield actions.navigate( state.urlRegionDisplaySlug );
      yield actions.navigate(e.target.href);
    },
  },
});
