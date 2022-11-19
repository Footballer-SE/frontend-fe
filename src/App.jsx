import * as React from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import UserProfilePage from "./components/Pages/UserProfilePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={"/asd"} element={<MainPage />} />
        <Route path={"/profile"} element={<UserProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
