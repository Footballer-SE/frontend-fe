const source = "http://localhost:8080";
const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const ACCESS_TOKEN = 'accessToken';
export const Endpoints = {
  GetAllFootballers: source + "/allFootballers", // get
  AddNewFootballer: source + "/addFootballer", //post
  GetFootballerById: source + "/footbaler/", // get by id
  UpdateFootballerById: source + "/updateFootballer/", // put by id
  SIGN_UP: source + "/auth/signup",
  LOG_IN: source + "/auth/login",
  CURRENT_USER: source + "/user/me",
  GOOGLE_AUTH_URL : source + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI,
  FACEBOOK_AUTH_URL : source + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI,
  GITHUB_AUTH_URL : source + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI
};
