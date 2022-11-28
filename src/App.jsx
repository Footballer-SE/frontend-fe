import * as React from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import UserProfilePage from "./components/Pages/UserProfilePage";
import LoginModal from "./components/Login/LoginModal.component";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/profile"} element={<UserProfilePage />} />
        
      </Routes>
    </Layout>
  );
}

export default App;
