import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from "../ActionTypes";
import {
  redirectToSignIn,
  signUserOut as signUserOutService
} from "blockstack";

export function asAction_SignUserIn() {
  return { type: AUTH_SIGN_IN };
}

export function signUserIn(store) {
  return async (dispatch, getState) => {
    try {
      redirectToSignIn(
        `${window.location}`,
        `${window.location.origin}/manifest.json`,
        ["store_write", "publish_data"]
      );
      asAction_SignUserIn();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

export function signUserOut() {
  try {
    signUserOutService();
    return { type: AUTH_SIGN_OUT };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
