export const IS_DEV =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const SERVER_URL = "http://veggiebob.com";

export const SERVER_PATH = url => IS_DEV ? SERVER_URL + url : url;
