const source = "https://footballerapi.herokuapp.com";
export const Endpoints = {
  GetAllFootballers: source + "/allFootballers", // get
  AddNewFootballer: source + "/addFootballer", //post
  GetFootballerById: source + "/footbaler/", // get by id
  UpdateFootballerById: source + "/updateFootballer/", // put by id
  OAUTH2_REDIRECT_URI :source + '/',
  GOOGLE_AUTH_URL : source + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI,
  FACEBOOK_AUTH_URL : source + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI,
  GITHUB_AUTH_URL : source + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI
};
