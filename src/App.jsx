import * as React from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import UserProfilePage from "./components/Pages/UserProfilePage";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./components/Pages/NotFound";
import OAuthHandler from "./components/Pages/OAuthHandler.component";
import LoginService from "./components/Services/Auth/Login.service";
import Endpoints, {
  ACCESS_TOKEN,
  HEADER,
} from "./components/Utility/Endpoints";
import { Helpers } from "./components/Utility/Helpers";
import { login, setUserData } from "./components/Store/UserSlice";

function App() {
  const user = useSelector((state) => state.user);
  const header = Helpers.useHeader();
  const dispatch = useDispatch();

  async function handleData() {
    if (!header) {
      return;
    } else {
      try {
        async function fetchData() {
          const result = await LoginService.GetCurrentUser(header);
          if (result) {
            return result.data;
          } else {
            return new Error("Fetching error.")
          }
        }
        const data = await fetchData();
        if (data) {
          dispatch(
            login({
              isLoggedIn: true,
              token: localStorage.getItem(ACCESS_TOKEN),
            })
          );

          dispatch(setUserData({ data }));
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  React.useEffect(() => {
    handleData();
  }, [localStorage.getItem(ACCESS_TOKEN)]);
  

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        {user.isLoggedIn && (
          <Route path={"/profile"} element={<UserProfilePage />} />
        )}
        {!user.isLoggedIn && (
          <Route path="/oauth2/redirect" element={<OAuthHandler />}></Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default React.memo(App);
