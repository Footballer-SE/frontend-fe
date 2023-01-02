import { OAUTH2_REDIRECT_URI, source } from "./Constants/EndpointConstants";

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
  GITHUB_AUTH_URL : source + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI,
  GetAllCity: source + "/city/allCity",
  GetAllPositions: source + "/position",
  CreateAdvert: source + "/advert/addAdvert",
  GetAllAdverts: source + "/advert/allAdverts",
  CreateTeam: source + "/addTeam",
  UpdateTeam: source + "/updateTeam",
  UpdateUser: source + "/updateUser",
  GetAllTeam: source + "/allTeams",
  GetUser: source + "/user/",
  GetAvatar: source + "/avatar"
};
